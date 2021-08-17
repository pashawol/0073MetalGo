/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/lib/dtos.ts

const attrData = "data-slidetoggle";

// CONCATENATED MODULE: ./src/lib/elProps.ts

class ElProps {
    getElProps(el) {
        const computedValue = window.getComputedStyle(el);
        return {
            height: parseInt(computedValue.height || '0'),
            paddingTop: parseInt(computedValue.paddingTop || '0'),
            paddingBottom: parseInt(computedValue.paddingBottom || '0'),
            borderTop: parseInt(computedValue.borderTopWidth || '0'),
            borderBottom: parseInt(computedValue.borderBottomWidth || '0')
        };
    }
    getOriginalProps(el) {
        this.changeElStyles(el, { border: '', padding: '', height: 'auto', visibility: 'hidden' });
        const originalProps = this.getElProps(el);
        this.changeElStyles(el, { border: '0px', padding: '0px', height: '0', visibility: 'visible' });
        return originalProps;
    }
    changeElStyles(el, styles) {
        el.style.borderBottomWidth = el.style.borderTopWidth = styles.border;
        el.style.paddingBottom = el.style.paddingTop = styles.padding;
        el.style.visibility = styles.visibility;
        el.style.height = styles.height;
        el.style.display = 'block';
    }
}
const elProps = new ElProps;

// CONCATENATED MODULE: ./src/lib/slideUp.ts


class slideUp_SlideUp {
    constructor() { }
    sliding(el, originalProps, timingFn) {
        requestAnimationFrame(timestamp => this.rafFn(timestamp, el, originalProps, timingFn));
    }
    clone() {
        return new slideUp_SlideUp;
    }
    rafFn(timestamp, el, originalProps, timingFn) {
        if (!this.startTime)
            this.initFn(timestamp);
        const runTime = timestamp - this.startTime;
        const progress = Math.max(1 - (runTime / timingFn), 0);
        el.style.height = (originalProps.height * progress).toFixed(2) + 'px';
        if (originalProps.paddingTop)
            el.style.paddingTop = (originalProps.paddingTop * progress).toFixed(2) + 'px';
        if (originalProps.paddingBottom)
            el.style.paddingBottom = (originalProps.paddingBottom * progress).toFixed(2) + 'px';
        if (runTime < timingFn)
            requestAnimationFrame(timestamp => this.rafFn(timestamp, el, originalProps, timingFn));
        else
            this.animationDone(el, originalProps);
    }
    initFn(timestamp) {
        this.startTime = timestamp;
    }
    animationDone(el, originalProps) {
        el.style.display = 'none';
        el.style.borderTopWidth = originalProps.borderTop + 'px';
        el.style.borderBottomWidth = originalProps.borderBottom + 'px';
        this.startTime = 0;
        el.setAttribute(attrData, 'false');
    }
}
const slideUp = new slideUp_SlideUp;

// CONCATENATED MODULE: ./src/lib/slideDown.ts


class slideDown_SlideDown {
    constructor() { }
    sliding(el, originalProps, timingFn) {
        requestAnimationFrame(timestamp => this.rafFn(timestamp, el, originalProps, timingFn));
    }
    clone() {
        return new slideDown_SlideDown;
    }
    rafFn(timestamp, el, originalProps, timingFn) {
        if (!this.startTime)
            this.initFn(timestamp, originalProps, el);
        const runTime = timestamp - this.startTime;
        const progress = Math.min(runTime / timingFn, 1);
        el.style.height = (originalProps.height * progress).toFixed(2) + 'px';
        if (originalProps.paddingTop)
            el.style.paddingTop = (originalProps.paddingTop * progress).toFixed(2) + 'px';
        if (originalProps.paddingBottom)
            el.style.paddingBottom = (originalProps.paddingBottom * progress).toFixed(2) + 'px';
        if (runTime < timingFn)
            requestAnimationFrame(timestamp => this.rafFn(timestamp, el, originalProps, timingFn));
        else
            this.animationDone(el);
    }
    animationDone(el) {
        this.startTime = 0;
        el.setAttribute(attrData, 'false');
    }
    initFn(timestamp, originalProps, el) {
        this.startTime = timestamp;
        el.style.borderTopWidth = originalProps.borderTop + 'px';
        el.style.borderBottomWidth = originalProps.borderBottom + 'px';
    }
}
const slideDown = new slideDown_SlideDown;

// CONCATENATED MODULE: ./src/lib/builder.ts



class builder_Builder {
    constructor() {
        this.prototypeMap = {};
        this.prototypeMap.up = slideUp;
        this.prototypeMap.down = slideDown;
    }
    createPrototype(key) {
        return this.prototypeMap[key].clone();
    }
}
const builder = new builder_Builder;

// CONCATENATED MODULE: ./src/lib/slideToggle.ts




class slideToggle_SlideToggle {
    slideToggle(el, timingFn = 500) {
        const currentEl = this.getElement(el);
        if (this.isElementSliding(currentEl))
            return;
        this.setElRequiredDataAndChangeAttr(currentEl);
        const props = elProps.getElProps(currentEl);
        this.getPrototypOfStrategy(props.height).sliding(currentEl, props.height ? props : elProps.getOriginalProps(currentEl), timingFn);
    }
    getElement(elData) {
        return typeof elData === 'string' ? document.querySelector(elData) : elData;
    }
    getPrototypOfStrategy(height) {
        return builder.createPrototype(height ? 'up' : 'down');
    }
    isElementSliding(el) {
        return el.hasAttribute(attrData) && el.getAttribute(attrData) === 'true';
    }
    setElRequiredDataAndChangeAttr(el) {
        el.style.overflowY = 'hidden';
        const currentAttrState = el.getAttribute(attrData) || '';
        if (currentAttrState === 'true')
            el.setAttribute(attrData, 'false');
        else
            el.setAttribute(attrData, 'true');
    }
}
const slideToggle = new slideToggle_SlideToggle;

// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "slideToggle", function() { return slideToggle; });




/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map