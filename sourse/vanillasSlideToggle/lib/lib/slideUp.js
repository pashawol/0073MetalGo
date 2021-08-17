"use strict";
import { attrData } from './dtos';
var SlideUp = (function () {
    function SlideUp() {
    }
    SlideUp.prototype.sliding = function (el, originalProps, timingFn) {
        var _this = this;
        requestAnimationFrame(function (timestamp) { return _this.rafFn(timestamp, el, originalProps, timingFn); });
    };
    SlideUp.prototype.clone = function () {
        return new SlideUp;
    };
    SlideUp.prototype.rafFn = function (timestamp, el, originalProps, timingFn) {
        var _this = this;
        if (!this.startTime)
            this.initFn(timestamp);
        var runTime = timestamp - this.startTime;
        var progress = Math.max(1 - (runTime / timingFn), 0);
        el.style.height = (originalProps.height * progress).toFixed(2) + 'px';
        if (originalProps.paddingTop)
            el.style.paddingTop = (originalProps.paddingTop * progress).toFixed(2) + 'px';
        if (originalProps.paddingBottom)
            el.style.paddingBottom = (originalProps.paddingBottom * progress).toFixed(2) + 'px';
        if (runTime < timingFn)
            requestAnimationFrame(function (timestamp) { return _this.rafFn(timestamp, el, originalProps, timingFn); });
        else
            this.animationDone(el, originalProps);
    };
    SlideUp.prototype.initFn = function (timestamp) {
        this.startTime = timestamp;
    };
    SlideUp.prototype.animationDone = function (el, originalProps) {
        el.style.display = 'none';
        el.style.borderTopWidth = originalProps.borderTop + 'px';
        el.style.borderBottomWidth = originalProps.borderBottom + 'px';
        this.startTime = 0;
        el.setAttribute(attrData, 'false');
    };
    return SlideUp;
}());
export { SlideUp };
export var slideUp = new SlideUp;
//# sourceMappingURL=slideUp.js.map