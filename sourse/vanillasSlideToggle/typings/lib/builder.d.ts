import { Prototype, Slide } from './dtos';
export declare class Builder {
    private prototypeMap;
    constructor();
    createPrototype(key: 'up' | 'down'): Prototype & Slide;
}
export declare const builder: Builder;
