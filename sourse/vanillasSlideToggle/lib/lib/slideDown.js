"use strict";
import { attrData } from './dtos';
var SlideDown = (function () {
    function SlideDown() {
    }
    SlideDown.prototype.sliding = function (el, originalProps, timingFn) {
        var _this = this;
        requestAnimationFrame(function (timestamp) { return _this.rafFn(timestamp, el, originalProps, timingFn); });
    };
    SlideDown.prototype.clone = function () {
        return new SlideDown;
    };
    SlideDown.prototype.rafFn = function (timestamp, el, originalProps, timingFn) {
        var _this = this;
        if (!this.startTime)
            this.initFn(timestamp, originalProps, el);
        var runTime = timestamp - this.startTime;
        var progress = Math.min(runTime / timingFn, 1);
        el.style.height = (originalProps.height * progress).toFixed(2) + 'px';
        if (originalProps.paddingTop)
            el.style.paddingTop = (originalProps.paddingTop * progress).toFixed(2) + 'px';
        if (originalProps.paddingBottom)
            el.style.paddingBottom = (originalProps.paddingBottom * progress).toFixed(2) + 'px';
        if (runTime < timingFn)
            requestAnimationFrame(function (timestamp) { return _this.rafFn(timestamp, el, originalProps, timingFn); });
        else
            this.animationDone(el);
    };
    SlideDown.prototype.animationDone = function (el) {
        this.startTime = 0;
        el.setAttribute(attrData, 'false');
    };
    SlideDown.prototype.initFn = function (timestamp, originalProps, el) {
        this.startTime = timestamp;
        el.style.borderTopWidth = originalProps.borderTop + 'px';
        el.style.borderBottomWidth = originalProps.borderBottom + 'px';
    };
    return SlideDown;
}());
export { SlideDown };
export var slideDown = new SlideDown;
//# sourceMappingURL=slideDown.js.map