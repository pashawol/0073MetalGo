"use strict";
import { attrData } from './dtos';
export class SlideDown {
    constructor() { }
    sliding(el, originalProps, timingFn) {
        requestAnimationFrame(timestamp => this.rafFn(timestamp, el, originalProps, timingFn));
    }
    clone() {
        return new SlideDown;
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
export const slideDown = new SlideDown;
//# sourceMappingURL=slideDown.js.map