(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scene = exports.SceneTransitionState = void 0;
var SceneTransitionState;
(function (SceneTransitionState) {
    SceneTransitionState[SceneTransitionState["In"] = 0] = "In";
    SceneTransitionState[SceneTransitionState["Out"] = 1] = "Out";
    SceneTransitionState[SceneTransitionState["None"] = 2] = "None";
})(SceneTransitionState = exports.SceneTransitionState || (exports.SceneTransitionState = {}));
function clamp(a, min = 0, max = 1) {
    return a < min ? min : (a > max ? max : a);
}
class SceneManager {
    constructor() {
        this.scenes = [];
    }
    /**
     * Initialise the scene manager for managing game scenes
     */
    static initialise() {
        if (SceneManager.instance) {
            throw new Error('SceneManager already initialised');
        }
        SceneManager.instance = new SceneManager();
    }
    static getInstance() {
        if (!SceneManager.instance) {
            throw new Error('SceneManager not properly initialised');
        }
        return SceneManager.instance;
    }
    /**
     * Push a scene onto the scene stack and start transitioning in
     */
    static push(scene) {
        const instance = SceneManager.getInstance();
        instance.scenes.push(scene);
        // Initialise the scene and start the transition
        scene.initialise();
        scene.transitionIn();
        return scene;
    }
    /**
     * Remove a scene from the scene stack after transitioning out
     */
    static pop() {
        const instance = SceneManager.getInstance();
        if (instance.scenes.length > 0) {
            let last = instance.scenes.length - 1;
            // Remove the top-most scene that isn't currently transitioning out
            while (last > 0 &&
                instance.scenes[last].transitionState === SceneTransitionState.Out) {
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
    static clear() {
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
    static update(dt, ...args) {
        const instance = SceneManager.getInstance();
        if (instance.scenes.length > 0) {
            // Only update the top-most scene that isn't currently transitioning out
            for (let i = instance.scenes.length; i--;) {
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
    static draw(context, ...args) {
        const instance = SceneManager.getInstance();
        // Figure out which scenes we need to draw
        const drawList = [];
        for (let i = instance.scenes.length; i--;) {
            const scene = instance.scenes[i];
            drawList.push(scene);
            // If transitioning, this scene is assumed to be transparent
            // (we might want to show the scene underneath if we're doing e.g. a fade)
            if (!scene.transparent &&
                scene.transitionState === SceneTransitionState.None) {
                break;
            }
        }
        // Draw the scenes in bottom -> top order
        drawList.reverse().forEach(scene => {
            scene.draw(context, ...args);
        });
    }
}
exports["default"] = SceneManager;
class Scene {
    constructor(options) {
        this.defaultOptions = {
            transitionTime: 2,
            transparent: true,
        };
        this.transitionState = SceneTransitionState.None;
        this.transitionAmount = 0;
        this.transitionTime = 0;
        this.transparent = false;
        this.disposed = false;
        const actualOptions = Object.assign({}, this.defaultOptions, options);
        this.transitionTime = actualOptions.transitionTime;
        this.transparent = actualOptions.transparent;
    }
    dispose() {
        this.disposed = true;
    }
    transitionIn() {
        this.transitionState = SceneTransitionState.In;
    }
    transitionOut() {
        this.transitionState = SceneTransitionState.Out;
    }
    updateTransition(dt) {
        const amount = dt / this.transitionTime;
        // Transitioning in
        if (this.transitionState === SceneTransitionState.In) {
            if (this.transitionAmount < 1) {
                this.transitionAmount = clamp(this.transitionAmount + amount);
            }
            else {
                this.transitionState = SceneTransitionState.None;
            }
        }
        // Transitioning out
        if (this.transitionState === SceneTransitionState.Out) {
            if (this.transitionAmount > 0) {
                this.transitionAmount = clamp(this.transitionAmount - amount);
            }
            else {
                this.dispose();
            }
        }
    }
}
exports.Scene = Scene;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFZQSxJQUFZLG9CQUlYO0FBSkQsV0FBWSxvQkFBb0I7SUFDOUIsMkRBQUUsQ0FBQTtJQUNGLDZEQUFHLENBQUE7SUFDSCwrREFBSSxDQUFBO0FBQ04sQ0FBQyxFQUpXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBSS9CO0FBRUQsU0FBUyxLQUFLLENBQUMsQ0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsTUFBcUIsWUFBWTtJQUsvQjtRQUZRLFdBQU0sR0FBWSxFQUFFLENBQUM7SUFFTixDQUFDO0lBRXhCOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFVBQVU7UUFDdEIsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNyRDtRQUNELFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU8sTUFBTSxDQUFDLFdBQVc7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBWTtRQUM3QixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.ts"](0, __webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNWYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLEdBQUcsNEJBQTRCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBEQUEwRCw0QkFBNEIsS0FBSztBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxJQUFJO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxJQUFJO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDJDQUEyQzs7Ozs7OztVRXRLM0M7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BiYXNlbWVudHVuaXZlcnNlL3NjZW5lLW1hbmFnZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0BiYXNlbWVudHVuaXZlcnNlL3NjZW5lLW1hbmFnZXIvLi9pbmRleC50cyIsIndlYnBhY2s6Ly9AYmFzZW1lbnR1bml2ZXJzZS9zY2VuZS1tYW5hZ2VyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vQGJhc2VtZW50dW5pdmVyc2Uvc2NlbmUtbWFuYWdlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQGJhc2VtZW50dW5pdmVyc2Uvc2NlbmUtbWFuYWdlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2NlbmUgPSBleHBvcnRzLlNjZW5lVHJhbnNpdGlvblN0YXRlID0gdm9pZCAwO1xudmFyIFNjZW5lVHJhbnNpdGlvblN0YXRlO1xuKGZ1bmN0aW9uIChTY2VuZVRyYW5zaXRpb25TdGF0ZSkge1xuICAgIFNjZW5lVHJhbnNpdGlvblN0YXRlW1NjZW5lVHJhbnNpdGlvblN0YXRlW1wiSW5cIl0gPSAwXSA9IFwiSW5cIjtcbiAgICBTY2VuZVRyYW5zaXRpb25TdGF0ZVtTY2VuZVRyYW5zaXRpb25TdGF0ZVtcIk91dFwiXSA9IDFdID0gXCJPdXRcIjtcbiAgICBTY2VuZVRyYW5zaXRpb25TdGF0ZVtTY2VuZVRyYW5zaXRpb25TdGF0ZVtcIk5vbmVcIl0gPSAyXSA9IFwiTm9uZVwiO1xufSkoU2NlbmVUcmFuc2l0aW9uU3RhdGUgPSBleHBvcnRzLlNjZW5lVHJhbnNpdGlvblN0YXRlIHx8IChleHBvcnRzLlNjZW5lVHJhbnNpdGlvblN0YXRlID0ge30pKTtcbmZ1bmN0aW9uIGNsYW1wKGEsIG1pbiA9IDAsIG1heCA9IDEpIHtcbiAgICByZXR1cm4gYSA8IG1pbiA/IG1pbiA6IChhID4gbWF4ID8gbWF4IDogYSk7XG59XG5jbGFzcyBTY2VuZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNjZW5lcyA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXNlIHRoZSBzY2VuZSBtYW5hZ2VyIGZvciBtYW5hZ2luZyBnYW1lIHNjZW5lc1xuICAgICAqL1xuICAgIHN0YXRpYyBpbml0aWFsaXNlKCkge1xuICAgICAgICBpZiAoU2NlbmVNYW5hZ2VyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjZW5lTWFuYWdlciBhbHJlYWR5IGluaXRpYWxpc2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgU2NlbmVNYW5hZ2VyLmluc3RhbmNlID0gbmV3IFNjZW5lTWFuYWdlcigpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICghU2NlbmVNYW5hZ2VyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjZW5lTWFuYWdlciBub3QgcHJvcGVybHkgaW5pdGlhbGlzZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU2NlbmVNYW5hZ2VyLmluc3RhbmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoIGEgc2NlbmUgb250byB0aGUgc2NlbmUgc3RhY2sgYW5kIHN0YXJ0IHRyYW5zaXRpb25pbmcgaW5cbiAgICAgKi9cbiAgICBzdGF0aWMgcHVzaChzY2VuZSkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IFNjZW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBpbnN0YW5jZS5zY2VuZXMucHVzaChzY2VuZSk7XG4gICAgICAgIC8vIEluaXRpYWxpc2UgdGhlIHNjZW5lIGFuZCBzdGFydCB0aGUgdHJhbnNpdGlvblxuICAgICAgICBzY2VuZS5pbml0aWFsaXNlKCk7XG4gICAgICAgIHNjZW5lLnRyYW5zaXRpb25JbigpO1xuICAgICAgICByZXR1cm4gc2NlbmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHNjZW5lIGZyb20gdGhlIHNjZW5lIHN0YWNrIGFmdGVyIHRyYW5zaXRpb25pbmcgb3V0XG4gICAgICovXG4gICAgc3RhdGljIHBvcCgpIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBTY2VuZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgaWYgKGluc3RhbmNlLnNjZW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbGFzdCA9IGluc3RhbmNlLnNjZW5lcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0b3AtbW9zdCBzY2VuZSB0aGF0IGlzbid0IGN1cnJlbnRseSB0cmFuc2l0aW9uaW5nIG91dFxuICAgICAgICAgICAgd2hpbGUgKGxhc3QgPiAwICYmXG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2NlbmVzW2xhc3RdLnRyYW5zaXRpb25TdGF0ZSA9PT0gU2NlbmVUcmFuc2l0aW9uU3RhdGUuT3V0KSB7XG4gICAgICAgICAgICAgICAgbGFzdC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxhc3QgPj0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjZW5lID0gaW5zdGFuY2Uuc2NlbmVzW2xhc3RdO1xuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHRyYW5zaXRpb25pbmcgb3V0XG4gICAgICAgICAgICAgICAgc2NlbmUudHJhbnNpdGlvbk91dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzY2VuZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIHNjZW5lIGZyb20gdGhlIHNjZW5lIHN0YWNrXG4gICAgICovXG4gICAgc3RhdGljIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IFNjZW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBpbnN0YW5jZS5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG4gICAgICAgICAgICBpZiAoc2NlbmUudHJhbnNpdGlvblN0YXRlICE9PSBTY2VuZVRyYW5zaXRpb25TdGF0ZS5PdXQpIHtcbiAgICAgICAgICAgICAgICBzY2VuZS50cmFuc2l0aW9uT3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHNjZW5lIG1hbmFnZXIgYW5kIHRoZSBjdXJyZW50IHNjZW5lXG4gICAgICovXG4gICAgc3RhdGljIHVwZGF0ZShkdCwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IFNjZW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBpZiAoaW5zdGFuY2Uuc2NlbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIE9ubHkgdXBkYXRlIHRoZSB0b3AtbW9zdCBzY2VuZSB0aGF0IGlzbid0IGN1cnJlbnRseSB0cmFuc2l0aW9uaW5nIG91dFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluc3RhbmNlLnNjZW5lcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2Uuc2NlbmVzW2ldLnRyYW5zaXRpb25TdGF0ZSAhPT0gU2NlbmVUcmFuc2l0aW9uU3RhdGUuT3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNjZW5lc1tpXS51cGRhdGUoZHQsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVcGRhdGUgYWxsIHNjZW5lIHRyYW5zaXRpb25zXG4gICAgICAgICAgICBpbnN0YW5jZS5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG4gICAgICAgICAgICAgICAgc2NlbmUudXBkYXRlVHJhbnNpdGlvbihkdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgZGlzcG9zZWQgc2NlbmVzXG4gICAgICAgICAgICBpbnN0YW5jZS5zY2VuZXMgPSBpbnN0YW5jZS5zY2VuZXMuZmlsdGVyKHNjZW5lID0+ICFzY2VuZS5kaXNwb3NlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHNjZW5lcyBvbiB0aGUgc2NyZWVuXG4gICAgICovXG4gICAgc3RhdGljIGRyYXcoY29udGV4dCwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IFNjZW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAvLyBGaWd1cmUgb3V0IHdoaWNoIHNjZW5lcyB3ZSBuZWVkIHRvIGRyYXdcbiAgICAgICAgY29uc3QgZHJhd0xpc3QgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGluc3RhbmNlLnNjZW5lcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHNjZW5lID0gaW5zdGFuY2Uuc2NlbmVzW2ldO1xuICAgICAgICAgICAgZHJhd0xpc3QucHVzaChzY2VuZSk7XG4gICAgICAgICAgICAvLyBJZiB0cmFuc2l0aW9uaW5nLCB0aGlzIHNjZW5lIGlzIGFzc3VtZWQgdG8gYmUgdHJhbnNwYXJlbnRcbiAgICAgICAgICAgIC8vICh3ZSBtaWdodCB3YW50IHRvIHNob3cgdGhlIHNjZW5lIHVuZGVybmVhdGggaWYgd2UncmUgZG9pbmcgZS5nLiBhIGZhZGUpXG4gICAgICAgICAgICBpZiAoIXNjZW5lLnRyYW5zcGFyZW50ICYmXG4gICAgICAgICAgICAgICAgc2NlbmUudHJhbnNpdGlvblN0YXRlID09PSBTY2VuZVRyYW5zaXRpb25TdGF0ZS5Ob25lKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRHJhdyB0aGUgc2NlbmVzIGluIGJvdHRvbSAtPiB0b3Agb3JkZXJcbiAgICAgICAgZHJhd0xpc3QucmV2ZXJzZSgpLmZvckVhY2goc2NlbmUgPT4ge1xuICAgICAgICAgICAgc2NlbmUuZHJhdyhjb250ZXh0LCAuLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2NlbmVNYW5hZ2VyO1xuY2xhc3MgU2NlbmUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRyYW5zaXRpb25UaW1lOiAyLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNpdGlvblN0YXRlID0gU2NlbmVUcmFuc2l0aW9uU3RhdGUuTm9uZTtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uQW1vdW50ID0gMDtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uVGltZSA9IDA7XG4gICAgICAgIHRoaXMudHJhbnNwYXJlbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhY3R1YWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvblRpbWUgPSBhY3R1YWxPcHRpb25zLnRyYW5zaXRpb25UaW1lO1xuICAgICAgICB0aGlzLnRyYW5zcGFyZW50ID0gYWN0dWFsT3B0aW9ucy50cmFuc3BhcmVudDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IHRydWU7XG4gICAgfVxuICAgIHRyYW5zaXRpb25JbigpIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uU3RhdGUgPSBTY2VuZVRyYW5zaXRpb25TdGF0ZS5JbjtcbiAgICB9XG4gICAgdHJhbnNpdGlvbk91dCgpIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uU3RhdGUgPSBTY2VuZVRyYW5zaXRpb25TdGF0ZS5PdXQ7XG4gICAgfVxuICAgIHVwZGF0ZVRyYW5zaXRpb24oZHQpIHtcbiAgICAgICAgY29uc3QgYW1vdW50ID0gZHQgLyB0aGlzLnRyYW5zaXRpb25UaW1lO1xuICAgICAgICAvLyBUcmFuc2l0aW9uaW5nIGluXG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25TdGF0ZSA9PT0gU2NlbmVUcmFuc2l0aW9uU3RhdGUuSW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25BbW91bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQW1vdW50ID0gY2xhbXAodGhpcy50cmFuc2l0aW9uQW1vdW50ICsgYW1vdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvblN0YXRlID0gU2NlbmVUcmFuc2l0aW9uU3RhdGUuTm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUcmFuc2l0aW9uaW5nIG91dFxuICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uU3RhdGUgPT09IFNjZW5lVHJhbnNpdGlvblN0YXRlLk91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbkFtb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25BbW91bnQgPSBjbGFtcCh0aGlzLnRyYW5zaXRpb25BbW91bnQgLSBhbW91bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlNjZW5lID0gU2NlbmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5cGJtUmxlQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN1FVRlpRU3hKUVVGWkxHOUNRVWxZTzBGQlNrUXNWMEZCV1N4dlFrRkJiMEk3U1VGRE9VSXNNa1JCUVVVc1EwRkJRVHRKUVVOR0xEWkVRVUZITEVOQlFVRTdTVUZEU0N3clJFRkJTU3hEUVVGQk8wRkJRMDRzUTBGQlF5eEZRVXBYTEc5Q1FVRnZRaXhIUVVGd1FpdzBRa0ZCYjBJc1MwRkJjRUlzTkVKQlFXOUNMRkZCU1M5Q08wRkJSVVFzVTBGQlV5eExRVUZMTEVOQlFVTXNRMEZCVXl4RlFVRkZMRWRCUVVjc1IwRkJSeXhEUVVGRExFVkJRVVVzUjBGQlJ5eEhRVUZITEVOQlFVTTdTVUZEZUVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTTNReXhEUVVGRE8wRkJSVVFzVFVGQmNVSXNXVUZCV1R0SlFVc3ZRanRSUVVaUkxGZEJRVTBzUjBGQldTeEZRVUZGTEVOQlFVTTdTVUZGVGl4RFFVRkRPMGxCUlhoQ096dFBRVVZITzBsQlEwa3NUVUZCVFN4RFFVRkRMRlZCUVZVN1VVRkRkRUlzU1VGQlNTeFpRVUZaTEVOQlFVTXNVVUZCVVN4RlFVRkZPMWxCUTNwQ0xFMUJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNhME5CUVd0RExFTkJRVU1zUTBGQlF6dFRRVU55UkR0UlFVTkVMRmxCUVZrc1EwRkJReXhSUVVGUkxFZEJRVWNzU1VGQlNTeFpRVUZaTEVWQlFVVXNRMEZCUXp0SlFVTTNReXhEUVVGRE8wbEJSVThzVFVGQlRTeERRVUZETEZkQlFWYzdVVUZEZUVJc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFJRVUZSTEVWQlFVVTdXVUZETVVJc1RVRkJUU3hKUVVGSkxFdEJRVXNzUTBGQlF5eDFRMEZCZFVNc1EwRkJReXhEUVVGRE8xTkJRekZFTzFGQlJVUXNUMEZCVHl4WlFVRlpMRU5CUVVNc1VVRkJVU3hEUVVGRE8wbEJReTlDTEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVOSkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCV1R0UlFVTTNRaXhOUVVGTkxGRkJRVkVzUjBGQlJ5eFpRVUZaTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1VVRkZOVU1zVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRk5VSXNaMFJCUVdkRU8xRkJRMmhFTEV0QlFVc3NRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRSUVVOdVFpeExRVUZMTEVOQlFVTXNXVUZCV1N4RlFVRkZMRU5CUVVNN1VVRkRja0lzVDBGQlR5eExRVUZMTEVOQlFVTTdTVUZEWml4RFFVRkRPMGxCUlVRN08wOUJSVWM3U1VGRFNTeE5RVUZOTEVOQlFVTXNSMEZCUnp0UlFVTm1MRTFCUVUwc1VVRkJVU3hIUVVGSExGbEJRVmtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0UlFVVTFReXhKUVVGSkxGRkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1JVRkJSVHRaUVVNNVFpeEpRVUZKTEVsQlFVa3NSMEZCVnl4UlFVRlJMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZGT1VNc2JVVkJRVzFGTzFsQlEyNUZMRTlCUTBVc1NVRkJTU3hIUVVGSExFTkJRVU03WjBKQlExSXNVVUZCVVN4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eGxRVUZsTEV0QlFVc3NiMEpCUVc5Q0xFTkJRVU1zUjBGQlJ5eEZRVU5zUlR0blFrRkRRU3hKUVVGSkxFVkJRVVVzUTBGQlF6dGhRVU5TTzFsQlEwUXNTVUZCU1N4SlFVRkpMRWxCUVVrc1EwRkJReXhGUVVGRk8yZENRVU5pTEUxQlFVMHNTMEZCU3l4SFFVRkhMRkZCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUlhCRExEQkNRVUV3UWp0blFrRkRNVUlzUzBGQlN5eERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRPMmRDUVVOMFFpeFBRVUZQTEV0QlFVc3NRMEZCUXp0aFFVTmtPMU5CUTBZN1VVRkZSQ3hQUVVGUExGTkJRVk1zUTBGQlF6dEpRVU51UWl4RFFVRkRPMGxCUlVRN08wOUJSVWM3U1VGRFNTeE5RVUZOTEVOQlFVTXNTMEZCU3p0UlFVTnFRaXhOUVVGTkxGRkJRVkVzUjBGQlJ5eFpRVUZaTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1VVRkZOVU1zVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3V1VGRE9VSXNTVUZCU1N4TFFVRkxMRU5CUVVNc1pVRkJaU3hMUVVGTExHOUNRVUZ2UWl4RFFVRkRMRWRCUVVjc1JVRkJSVHRuUWtGRGRFUXNTMEZCU3l4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRE8yRkJRM1pDTzFGQlEwZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJSVVE3TzA5QlJVYzdTVUZEU1N4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVlVzUlVGQlJTeEhRVUZITEVsQlFWYzdVVUZETjBNc1RVRkJUU3hSUVVGUkxFZEJRVWNzV1VGQldTeERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRPMUZCUlRWRExFbEJRVWtzVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhGUVVGRk8xbEJRemxDTEhkRlFVRjNSVHRaUVVONFJTeExRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRkZCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNSVUZCUlN4SFFVRkhPMmRDUVVONlF5eEpRVUZKTEZGQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zWlVGQlpTeExRVUZMTEc5Q1FVRnZRaXhEUVVGRExFZEJRVWNzUlVGQlJUdHZRa0ZEYmtVc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdiMEpCUTNaRExFMUJRVTA3YVVKQlExQTdZVUZEUmp0WlFVVkVMQ3RDUVVFclFqdFpRVU12UWl4UlFVRlJMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCUlR0blFrRkRPVUlzUzBGQlN5eERRVUZETEdkQ1FVRm5RaXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6ZENMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJSVWdzTmtKQlFUWkNPMWxCUXpkQ0xGRkJRVkVzUTBGQlF5eE5RVUZOTEVkQlFVY3NVVUZCVVN4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFRRVU53UlR0SlFVTklMRU5CUVVNN1NVRkZSRHM3VDBGRlJ6dEpRVU5KTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJhVU1zUlVGQlJTeEhRVUZITEVsQlFWYzdVVUZEYkVVc1RVRkJUU3hSUVVGUkxFZEJRVWNzV1VGQldTeERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRPMUZCUlRWRExEQkRRVUV3UXp0UlFVTXhReXhOUVVGTkxGRkJRVkVzUjBGQldTeEZRVUZGTEVOQlFVTTdVVUZETjBJc1MwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eFJRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFVkJRVVVzUjBGQlJ6dFpRVU42UXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhSUVVGUkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1dVRkZja0lzTkVSQlFUUkVPMWxCUXpWRUxEQkZRVUV3UlR0WlFVTXhSU3hKUVVORkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWYzdaMEpCUTJ4Q0xFdEJRVXNzUTBGQlF5eGxRVUZsTEV0QlFVc3NiMEpCUVc5Q0xFTkJRVU1zU1VGQlNTeEZRVU51UkR0blFrRkRRU3hOUVVGTk8yRkJRMUE3VTBGRFJqdFJRVVZFTEhsRFFVRjVRenRSUVVONlF5eFJRVUZSTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTzFsQlEycERMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRMMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVEN4RFFVRkRPME5CUTBZN1FVRndTVVFzSzBKQmIwbERPMEZCUlVRc1RVRkJjMElzUzBGQlN6dEpRV2RDZWtJc1dVRkJiVUlzVDBGQkswSTdVVUZtYWtNc2JVSkJRV01zUjBGQmFVSTdXVUZET1VNc1kwRkJZeXhGUVVGRkxFTkJRVU03V1VGRGFrSXNWMEZCVnl4RlFVRkZMRWxCUVVrN1UwRkRiRUlzUTBGQlF6dFJRVVZMTEc5Q1FVRmxMRWRCUVhsQ0xHOUNRVUZ2UWl4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVWc1JTeHhRa0ZCWjBJc1IwRkJWeXhEUVVGRExFTkJRVU03VVVGRk4wSXNiVUpCUVdNc1IwRkJWeXhEUVVGRExFTkJRVU03VVVGRk0wSXNaMEpCUVZjc1IwRkJXU3hMUVVGTExFTkJRVU03VVVGRk4wSXNZVUZCVVN4SFFVRlpMRXRCUVVzc1EwRkJRenRSUVVjdlFpeE5RVUZOTEdGQlFXRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeEpRVUZKTEVOQlFVTXNZMEZCWXl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRM1JGTEVsQlFVa3NRMEZCUXl4alFVRmpMRWRCUVVjc1lVRkJZU3hEUVVGRExHTkJRV01zUTBGQlF6dFJRVU51UkN4SlFVRkpMRU5CUVVNc1YwRkJWeXhIUVVGSExHRkJRV0VzUTBGQlF5eFhRVUZYTEVOQlFVTTdTVUZETDBNc1EwRkJRenRKUVVWTkxFOUJRVTg3VVVGRFdpeEpRVUZKTEVOQlFVTXNVVUZCVVN4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVOMlFpeERRVUZETzBsQlJVMHNXVUZCV1R0UlFVTnFRaXhKUVVGSkxFTkJRVU1zWlVGQlpTeEhRVUZITEc5Q1FVRnZRaXhEUVVGRExFVkJRVVVzUTBGQlF6dEpRVU5xUkN4RFFVRkRPMGxCUlUwc1lVRkJZVHRSUVVOc1FpeEpRVUZKTEVOQlFVTXNaVUZCWlN4SFFVRkhMRzlDUVVGdlFpeERRVUZETEVkQlFVY3NRMEZCUXp0SlFVTnNSQ3hEUVVGRE8wbEJSVTBzWjBKQlFXZENMRU5CUVVNc1JVRkJWVHRSUVVOb1F5eE5RVUZOTEUxQlFVMHNSMEZCVnl4RlFVRkZMRWRCUVVjc1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF6dFJRVVZvUkN4dFFrRkJiVUk3VVVGRGJrSXNTVUZCU1N4SlFVRkpMRU5CUVVNc1pVRkJaU3hMUVVGTExHOUNRVUZ2UWl4RFFVRkRMRVZCUVVVc1JVRkJSVHRaUVVOd1JDeEpRVUZKTEVsQlFVa3NRMEZCUXl4blFrRkJaMElzUjBGQlJ5eERRVUZETEVWQlFVVTdaMEpCUXpkQ0xFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1IwRkJSeXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhIUVVGSExFMUJRVTBzUTBGQlF5eERRVUZETzJGQlF5OUVPMmxDUVVGTk8yZENRVU5NTEVsQlFVa3NRMEZCUXl4bFFVRmxMRWRCUVVjc2IwSkJRVzlDTEVOQlFVTXNTVUZCU1N4RFFVRkRPMkZCUTJ4RU8xTkJRMFk3VVVGRlJDeHZRa0ZCYjBJN1VVRkRjRUlzU1VGQlNTeEpRVUZKTEVOQlFVTXNaVUZCWlN4TFFVRkxMRzlDUVVGdlFpeERRVUZETEVkQlFVY3NSVUZCUlR0WlFVTnlSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1IwRkJSeXhEUVVGRExFVkJRVVU3WjBKQlF6ZENMRWxCUVVrc1EwRkJReXhuUWtGQlowSXNSMEZCUnl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExHZENRVUZuUWl4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRE8yRkJReTlFTzJsQ1FVRk5PMmRDUVVOTUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXp0aFFVTm9RanRUUVVOR08wbEJRMGdzUTBGQlF6dERRVTlHTzBGQk4wUkVMSE5DUVRaRVF5SjkiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vaW5kZXgudHNcIl0oMCwgX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=