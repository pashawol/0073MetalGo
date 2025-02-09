"use strict";
export class ElProps {
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
export const elProps = new ElProps;
//# sourceMappingURL=elProps.js.map