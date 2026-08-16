# Game Component: Scene Manager

A component for managing a stack of scenes in a game.

## Installation

```bash
npm install @basementuniverse/scene-manager
```

For direct browser usage, include the UMD build with a script tag:

```html
<script src="build/index.js"></script>
```

The build exposes the package's main class as the `BasementUniverseSceneManager` browser
global. It does not add each export directly to `window`.

## How to use

Initialise the scene manager before use:

```ts
import SceneManager from '@basementuniverse/scene-manager';

SceneManager.initialise();
```

When using the library directly from a browser script, use the
`BasementUniverseSceneManager` global:

```html
<script src="build/index.js"></script>
<script>
  BasementUniverseSceneManager.initialise();

  // The Scene base class lives on the same namespace
  class MyScene extends BasementUniverseSceneManager.Scene {
    // ...
  }

  BasementUniverseSceneManager.push(new MyScene());
</script>
```

Update and draw the scene manager:
```ts
class Game {
  // ...

  public update(dt: number) {
    SceneManager.update(dt);
  }

  public draw(context: CanvasRenderingContext2D) {
    SceneManager.draw(context);
  }
}
```

Create and start a scene:

```ts
SceneManager.push(new MyScene());
```

End/remove a scene:

```ts
const scene = SceneManager.pop();
```

Clear scenes:

```ts
SceneManager.clear();
```

Only the top-most scene will be updated.

Scenes will be drawn bottom-to-top, but with some scenes culled depending on transparency.

## Implementing a scene

Define a class that inherits from `Scene`:

```ts
import SceneManager, { Scene } from '@basementuniverse/scene-manager';

export class MyScene extends Scene {
  public constructor() {
    super({ transitionTime: 2.5 });
  }

  public initialise() {
    // Called when the scene is pushed onto the SceneManager
  }

  public update(dt: number) {
    // Called on every SceneManager.update() while this is the top-most scene

    console.log(this.transitionAmount); // between 0...1

    // Start another scene when a key is pressed
    if (InputManager.keyPressed('Enter')) {
      SceneManager.push(new MyOtherScene());
    }

    // Finish this scene when a key is pressed
    if (InputManager.keyPressed('Escape')) {
      SceneManager.pop();
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    // Called on every SceneManager.draw() while this scene is visible
    // (depends on scenes above this one in the stack)
  }
}
```

## Scene options

```ts
const options = { ... };
const myScene = new Scene(options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `transitionTime` | `number` | `2` | The number of seconds it takes to transition in/out |
| `transparent` | `boolean` | `true` | If true, this scene will show other scenes below it in the stack |
| `onTransitionedIn` | `() => void` | `undefined` | Called when the scene has fully transitioned in |
| `onTransitionedOut` | `() => void` | `undefined` | Called when the scene has fully transitioned out |
