export type SceneOptions = {
    /**
     * The amount of time it takes to transition in/out, in seconds
     */
    transitionTime: number;
    /**
     * True if this scene shows the scene below it in the stack
     */
    transparent: boolean;
};
export declare enum SceneTransitionState {
    In = 0,
    Out = 1,
    None = 2
}
export default class SceneManager {
    private static instance;
    private scenes;
    private constructor();
    /**
     * Initialise the scene manager for managing game scenes
     */
    static initialise(): void;
    private static getInstance;
    /**
     * Push a scene onto the scene stack and start transitioning in
     */
    static push(scene: Scene, ...args: any[]): Scene;
    /**
     * Remove a scene from the scene stack after transitioning out
     */
    static pop(): Scene | undefined;
    /**
     * Remove all scene from the scene stack
     */
    static clear(): void;
    /**
     * Update the scene manager and the current scene
     */
    static update(dt: number, ...args: any[]): void;
    /**
     * Render scenes on the screen
     */
    static draw(context: CanvasRenderingContext2D, ...args: any[]): void;
    /**
     * Let all scenes know that a resize event has occurred
     */
    static resize(width: number, height: number): void;
}
export declare abstract class Scene {
    private readonly defaultOptions;
    transitionState: SceneTransitionState;
    transitionAmount: number;
    transitionTime: number;
    transparent: boolean;
    disposed: boolean;
    constructor(options?: Partial<SceneOptions>);
    dispose(): void;
    transitionIn(): void;
    transitionOut(): void;
    updateTransition(dt: number): void;
    abstract initialise(...args: any[]): void;
    abstract update(dt: number, ...args: any[]): void;
    abstract draw(context: CanvasRenderingContext2D, ...args: any[]): void;
    resize?(width: number, height: number): void;
}
