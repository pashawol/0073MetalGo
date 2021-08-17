"use strict";
import { attrData } from './dtos';
import { elProps } from './elProps';
import { builder } from './builder';
export class SlideToggle {
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
export const slideToggle = new SlideToggle;
//# sourceMappingURL=slideToggle.js.map