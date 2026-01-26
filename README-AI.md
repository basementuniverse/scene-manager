# Scene Manager API Reference

TypeScript game scene management library with stack-based scene handling and transitions.

## Core API

### SceneManager (Static Class)

**SceneManager.initialise(): void**
- Must be called once before using any other methods
- Throws if called multiple times

**SceneManager.push(scene: Scene, ...args: any[]): Scene**
- Pushes scene onto stack, calls scene.initialise(...args), starts transition in
- Returns the pushed scene

**SceneManager.pop(): Scene | undefined**
- Transitions out top-most non-transitioning scene
- Returns scene being transitioned out, or undefined if stack empty

**SceneManager.clear(): void**
- Transitions out all scenes not already transitioning out

**SceneManager.update(dt: number, ...args: any[]): void**
- Updates top-most non-transitioning-out scene
- Updates all scene transitions
- Removes disposed scenes
- dt: delta time in seconds

**SceneManager.draw(context: CanvasRenderingContext2D, ...args: any[]): void**
- Draws scenes bottom-to-top
- Culls non-transparent scenes below opaque scenes (unless transitioning)
- Transitioning scenes are treated as transparent

**SceneManager.resize(width: number, height: number): void**
- Calls resize() on all scenes (if implemented)

## Scene Class

Abstract base class. Extend and implement abstract methods.

**Constructor: new Scene(options?: Partial<SceneOptions>)**

### Properties

- **transitionState: SceneTransitionState** - Current transition state (In, Out, None)
- **transitionAmount: number** - Transition progress 0 (out) to 1 (in)
- **transitionTime: number** - Transition duration in seconds (from options)
- **transparent: boolean** - Whether scenes below are visible (from options)
- **disposed: boolean** - True after scene removed from stack

### Methods

**dispose(): void**
- Marks scene as disposed (sets disposed = true)

**transitionIn(): void**
- Starts transition in (sets transitionState to In)

**transitionOut(): void**
- Starts transition out (sets transitionState to Out)

**updateTransition(dt: number): void**
- Internal: updates transitionAmount based on transitionState
- Calls onTransitionedIn/Out callbacks when complete

**abstract initialise(...args: any[]): void**
- Called by SceneManager.push() with provided args

**abstract update(dt: number, ...args: any[]): void**
- Called by SceneManager.update() when scene is top-most and not transitioning out
- dt: delta time in seconds

**abstract draw(context: CanvasRenderingContext2D, ...args: any[]): void**
- Called by SceneManager.draw() for visible scenes

**resize?(width: number, height: number): void**
- Optional: called by SceneManager.resize()

## Types

### SceneOptions
```typescript
{
  transitionTime: number;      // Default: 2 seconds
  transparent: boolean;         // Default: true
  onTransitionedIn?: () => void;
  onTransitionedOut?: () => void;
}
```

### SceneTransitionState (Enum)
- `SceneTransitionState.In` - Transitioning in (transitionAmount increasing 0→1)
- `SceneTransitionState.Out` - Transitioning out (transitionAmount decreasing 1→0)
- `SceneTransitionState.None` - Not transitioning

## Usage Pattern

```typescript
import SceneManager, { Scene, SceneOptions } from '@basementuniverse/scene-manager';

SceneManager.initialise();

class MyScene extends Scene {
  constructor() {
    super({ transitionTime: 2.5, transparent: false });
  }
  initialise() { /* setup */ }
  update(dt: number) {
    // this.transitionAmount available (0-1)
    // SceneManager.push(new OtherScene()) to add scene
    // SceneManager.pop() to remove current scene
  }
  draw(context: CanvasRenderingContext2D) { /* render */ }
}

// Game loop
SceneManager.push(new MyScene());
SceneManager.update(deltaTime);
SceneManager.draw(canvasContext);
```

## Behavior Notes

- Only top-most non-transitioning-out scene receives update() calls
- All visible scenes receive draw() calls (bottom-to-top order)
- Scenes below opaque non-transitioning scenes are not drawn
- Transitioning scenes are treated as transparent for drawing
- Scenes auto-dispose when transition out completes
- Disposed scenes auto-removed from stack on next update()
