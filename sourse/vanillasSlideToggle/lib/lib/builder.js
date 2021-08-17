"use strict";
import { slideUp } from './slideUp';
import { slideDown } from './slideDown';
var Builder = (function () {
    function Builder() {
        this.prototypeMap = {};
        this.prototypeMap.up = slideUp;
        this.prototypeMap.down = slideDown;
    }
    Builder.prototype.createPrototype = function (key) {
        return this.prototypeMap[key].clone();
    };
    return Builder;
}());
export { Builder };
export var builder = new Builder;
//# sourceMappingURL=builder.js.map