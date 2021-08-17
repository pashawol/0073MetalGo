"use strict";
import { slideUp } from './slideUp';
import { slideDown } from './slideDown';
export class Builder {
    constructor() {
        this.prototypeMap = {};
        this.prototypeMap.up = slideUp;
        this.prototypeMap.down = slideDown;
    }
    createPrototype(key) {
        return this.prototypeMap[key].clone();
    }
}
export const builder = new Builder;
//# sourceMappingURL=builder.js.map