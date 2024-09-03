/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Scene = exports.SceneTransitionState = void 0;\nvar SceneTransitionState;\n(function (SceneTransitionState) {\n    SceneTransitionState[\"In\"] = \"in\";\n    SceneTransitionState[\"Out\"] = \"out\";\n    SceneTransitionState[\"None\"] = \"none\";\n})(SceneTransitionState = exports.SceneTransitionState || (exports.SceneTransitionState = {}));\nfunction clamp(a, min = 0, max = 1) {\n    return a < min ? min : (a > max ? max : a);\n}\nclass SceneManager {\n    constructor() {\n        this.scenes = [];\n    }\n    /**\n     * Initialise the scene manager for managing game scenes\n     */\n    static initialise() {\n        if (SceneManager.instance) {\n            throw new Error('SceneManager already initialised');\n        }\n        SceneManager.instance = new SceneManager();\n    }\n    static getInstance() {\n        if (!SceneManager.instance) {\n            throw new Error('SceneManager not properly initialised');\n        }\n        return SceneManager.instance;\n    }\n    /**\n     * Push a scene onto the scene stack and start transitioning in\n     */\n    static push(scene, ...args) {\n        const instance = SceneManager.getInstance();\n        instance.scenes.push(scene);\n        // Initialise the scene and start the transition\n        scene.initialise(...args);\n        scene.transitionIn();\n        return scene;\n    }\n    /**\n     * Remove a scene from the scene stack after transitioning out\n     */\n    static pop() {\n        const instance = SceneManager.getInstance();\n        if (instance.scenes.length > 0) {\n            let last = instance.scenes.length - 1;\n            // Remove the top-most scene that isn't currently transitioning out\n            while (last > 0 &&\n                instance.scenes[last].transitionState === SceneTransitionState.Out) {\n                last--;\n            }\n            if (last >= 0) {\n                const scene = instance.scenes[last];\n                // Start transitioning out\n                scene.transitionOut();\n                return scene;\n            }\n        }\n        return undefined;\n    }\n    /**\n     * Remove all scene from the scene stack\n     */\n    static clear() {\n        const instance = SceneManager.getInstance();\n        instance.scenes.forEach(scene => {\n            if (scene.transitionState !== SceneTransitionState.Out) {\n                scene.transitionOut();\n            }\n        });\n    }\n    /**\n     * Update the scene manager and the current scene\n     */\n    static update(dt, ...args) {\n        const instance = SceneManager.getInstance();\n        if (instance.scenes.length > 0) {\n            // Only update the top-most scene that isn't currently transitioning out\n            for (let i = instance.scenes.length; i--;) {\n                if (instance.scenes[i].transitionState !== SceneTransitionState.Out) {\n                    instance.scenes[i].update(dt, ...args);\n                    break;\n                }\n            }\n            // Update all scene transitions\n            instance.scenes.forEach(scene => {\n                scene.updateTransition(dt);\n            });\n            // Remove any disposed scenes\n            instance.scenes = instance.scenes.filter(scene => !scene.disposed);\n        }\n    }\n    /**\n     * Render scenes on the screen\n     */\n    static draw(context, ...args) {\n        const instance = SceneManager.getInstance();\n        // Figure out which scenes we need to draw\n        const drawList = [];\n        for (let i = instance.scenes.length; i--;) {\n            const scene = instance.scenes[i];\n            drawList.push(scene);\n            // If transitioning, this scene is assumed to be transparent\n            // (we might want to show the scene underneath if we're doing e.g. a fade)\n            if (!scene.transparent &&\n                scene.transitionState === SceneTransitionState.None) {\n                break;\n            }\n        }\n        // Draw the scenes in bottom -> top order\n        drawList.reverse().forEach(scene => {\n            scene.draw(context, ...args);\n        });\n    }\n    /**\n     * Let all scenes know that a resize event has occurred\n     */\n    static resize(width, height) {\n        var _a;\n        const instance = SceneManager.getInstance();\n        for (const scene of instance.scenes) {\n            (_a = scene.resize) === null || _a === void 0 ? void 0 : _a.call(scene, width, height);\n        }\n    }\n}\nexports[\"default\"] = SceneManager;\nclass Scene {\n    constructor(options) {\n        this.defaultOptions = {\n            transitionTime: 2,\n            transparent: true,\n        };\n        this.transitionState = SceneTransitionState.None;\n        this.transitionAmount = 0;\n        this.transitionTime = 0;\n        this.transparent = false;\n        this.disposed = false;\n        const actualOptions = Object.assign({}, this.defaultOptions, options);\n        this.transitionTime = actualOptions.transitionTime;\n        this.transparent = actualOptions.transparent;\n        this.onTransitionedIn = actualOptions.onTransitionedIn;\n        this.onTransitionedOut = actualOptions.onTransitionedOut;\n    }\n    dispose() {\n        this.disposed = true;\n    }\n    transitionIn() {\n        this.transitionState = SceneTransitionState.In;\n    }\n    transitionOut() {\n        this.transitionState = SceneTransitionState.Out;\n    }\n    updateTransition(dt) {\n        var _a, _b;\n        const amount = dt / this.transitionTime;\n        // Transitioning in\n        if (this.transitionState === SceneTransitionState.In) {\n            if (this.transitionAmount < 1) {\n                this.transitionAmount = clamp(this.transitionAmount + amount);\n            }\n            else {\n                this.transitionState = SceneTransitionState.None;\n                (_a = this.onTransitionedIn) === null || _a === void 0 ? void 0 : _a.call(this);\n            }\n        }\n        // Transitioning out\n        if (this.transitionState === SceneTransitionState.Out) {\n            if (this.transitionAmount > 0) {\n                this.transitionAmount = clamp(this.transitionAmount - amount);\n            }\n            else {\n                this.transitionState = SceneTransitionState.None;\n                this.dispose();\n                (_b = this.onTransitionedOut) === null || _b === void 0 ? void 0 : _b.call(this);\n            }\n        }\n    }\n}\nexports.Scene = Scene;\n\n\n//# sourceURL=webpack://@basementuniverse/scene-manager/./index.ts?");

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