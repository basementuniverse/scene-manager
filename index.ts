export type SceneOptions = {
  /**
   * The amount of time it takes to transition in/out, in seconds
   */
  transitionTime: number;

  /**
   * True if this scene shows the scene below it in the stack
   */
  transparent: boolean;

  /**
   * Optional callback, called when the scene has finished transitioning in
   */
  onTransitionedIn?: () => void;

  /**
   * Optional callback, called when the scene has finished transitioning out
   */
  onTransitionedOut?: () => void;
};

export enum SceneTransitionState {
  In = 'in',
  Out = 'out',
  None = 'none',
}

function clamp(a: number, min = 0, max = 1) {
  return a < min ? min : a > max ? max : a;
}

export default class SceneManager {
  private static instance: SceneManager;

  private scenes: Scene[] = [];

  private constructor() {}

  /**
   * Initialise the scene manager for managing game scenes
   */
  public static initialise() {
    if (SceneManager.instance) {
      throw new Error('SceneManager already initialised');
    }
    SceneManager.instance = new SceneManager();
  }

  private static getInstance(): SceneManager {
    if (!SceneManager.instance) {
      throw new Error('SceneManager not properly initialised');
    }

    return SceneManager.instance;
  }

  /**
   * Push a scene onto the scene stack and start transitioning in
   */
  public static push(scene: Scene, ...args: any[]) {
    const instance = SceneManager.getInstance();

    instance.scenes.push(scene);

    // Initialise the scene and start the transition
    scene.initialise(...args);
    scene.transitionIn();
    return scene;
  }

  /**
   * Remove a scene from the scene stack after transitioning out
   */
  public static pop(): Scene | undefined {
    const instance = SceneManager.getInstance();

    if (instance.scenes.length > 0) {
      let last: number = instance.scenes.length - 1;

      // Remove the top-most scene that isn't currently transitioning out
      while (
        last > 0 &&
        instance.scenes[last].transitionState === SceneTransitionState.Out
      ) {
        last--;
      }
      if (last >= 0) {
        const scene = instance.scenes[last];

        // Start transitioning out
        scene.transitionOut();
        return scene;
      }
    }

    return undefined;
  }

  /**
   * Remove all scene from the scene stack
   */
  public static clear() {
    const instance = SceneManager.getInstance();

    instance.scenes.forEach(scene => {
      if (scene.transitionState !== SceneTransitionState.Out) {
        scene.transitionOut();
      }
    });
  }

  /**
   * Update the scene manager and the current scene
   */
  public static update(dt: number, ...args: any[]) {
    const instance = SceneManager.getInstance();

    if (instance.scenes.length > 0) {
      // Only update the top-most scene that isn't currently transitioning out
      for (let i = instance.scenes.length; i--; ) {
        if (instance.scenes[i].transitionState !== SceneTransitionState.Out) {
          instance.scenes[i].update(dt, ...args);
          break;
        }
      }

      // Update all scene transitions
      instance.scenes.forEach(scene => {
        scene.updateTransition(dt);
      });

      // Remove any disposed scenes
      instance.scenes = instance.scenes.filter(scene => !scene.disposed);
    }
  }

  /**
   * Render scenes on the screen
   */
  public static draw(context: CanvasRenderingContext2D, ...args: any[]) {
    const instance = SceneManager.getInstance();

    // Figure out which scenes we need to draw
    const drawList: Scene[] = [];
    for (let i = instance.scenes.length; i--; ) {
      const scene = instance.scenes[i];
      drawList.push(scene);

      // If transitioning, this scene is assumed to be transparent
      // (we might want to show the scene underneath if we're doing e.g. a fade)
      if (
        !scene.transparent &&
        scene.transitionState === SceneTransitionState.None
      ) {
        break;
      }
    }

    // Draw the scenes in bottom -> top order
    drawList.reverse().forEach(scene => {
      scene.draw(context, ...args);
    });
  }

  /**
   * Let all scenes know that a resize event has occurred
   */
  public static resize(width: number, height: number) {
    const instance = SceneManager.getInstance();

    for (const scene of instance.scenes) {
      scene.resize?.(width, height);
    }
  }
}

export abstract class Scene {
  private readonly defaultOptions: SceneOptions = {
    transitionTime: 2,
    transparent: true,
  };

  public transitionState: SceneTransitionState = SceneTransitionState.None;

  public transitionAmount: number = 0;

  public transitionTime: number = 0;

  public transparent: boolean = false;

  public disposed: boolean = false;

  private onTransitionedIn?: () => void;

  private onTransitionedOut?: () => void;

  public constructor(options?: Partial<SceneOptions>) {
    const actualOptions = Object.assign({}, this.defaultOptions, options);
    this.transitionTime = actualOptions.transitionTime;
    this.transparent = actualOptions.transparent;
    this.onTransitionedIn = actualOptions.onTransitionedIn;
    this.onTransitionedOut = actualOptions.onTransitionedOut;
  }

  public dispose() {
    this.disposed = true;
  }

  public transitionIn() {
    this.transitionState = SceneTransitionState.In;
  }

  public transitionOut() {
    this.transitionState = SceneTransitionState.Out;
  }

  public updateTransition(dt: number) {
    const amount: number = dt / this.transitionTime;

    // Transitioning in
    if (this.transitionState === SceneTransitionState.In) {
      if (this.transitionAmount < 1) {
        this.transitionAmount = clamp(this.transitionAmount + amount);
      } else {
        this.transitionState = SceneTransitionState.None;
        this.onTransitionedIn?.();
      }
    }

    // Transitioning out
    if (this.transitionState === SceneTransitionState.Out) {
      if (this.transitionAmount > 0) {
        this.transitionAmount = clamp(this.transitionAmount - amount);
      } else {
        this.transitionState = SceneTransitionState.None;
        this.dispose();
        this.onTransitionedOut?.();
      }
    }
  }

  public abstract initialise(...args: any[]): void;

  public abstract update(dt: number, ...args: any[]): void;

  public abstract draw(context: CanvasRenderingContext2D, ...args: any[]): void;

  public resize?(width: number, height: number): void;
}
