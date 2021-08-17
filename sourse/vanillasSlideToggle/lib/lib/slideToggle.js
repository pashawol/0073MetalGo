"use strict";
import { attrData } from './dtos';
import { elProps } from './elProps';
import { builder } from './builder';
var SlideToggle = (function () {
    function SlideToggle() {
    }
    SlideToggle.prototype.slideToggle = function (el, timingFn) {
        if (timingFn === void 0) { timingFn = 500; }
        var currentEl = this.getElement(el);
        if (this.isElementSliding(currentEl))
            return;
        this.setElRequiredDataAndChangeAttr(currentEl);
        var props = elProps.getElProps(currentEl);
        this.getPrototypOfStrategy(props.height).sliding(currentEl, props.height ? props : elProps.getOriginalProps(currentEl), timingFn);
    };
    SlideToggle.prototype.getElement = function (elData) {
        return typeof elData === 'string' ? document.querySelector(elData) : elData;
    };
    SlideToggle.prototype.getPrototypOfStrategy = function (height) {
        return builder.createPrototype(height ? 'up' : 'down');
    };
    SlideToggle.prototype.isElementSliding = function (el) {
        return el.hasAttribute(attrData) && el.getAttribute(attrData) === 'true';
    };
    SlideToggle.prototype.setElRequiredDataAndChangeAttr = function (el) {
        el.style.overflowY = 'hidden';
        var currentAttrState = el.getAttribute(attrData) || '';
        if (currentAttrState === 'true')
            el.setAttribute(attrData, 'false');
        else
            el.setAttribute(attrData, 'true');
    };
    return SlideToggle;
}());
export { SlideToggle };
export var slideToggle = new SlideToggle;
//# sourceMappingURL=slideToggle.js.map