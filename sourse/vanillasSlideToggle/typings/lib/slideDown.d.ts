import { Slide, Prototype, SlideProps } from './dtos';
export declare class SlideDown implements Slide, Prototype {
    private startTime;
    constructor();
    sliding(el: HTMLElement, originalProps: SlideProps, timingFn: number): void;
    clone(): Prototype & Slide;
    private rafFn(timestamp, el, originalProps, timingFn);
    private animationDone(el);
    private initFn(timestamp, originalProps, el);
}
export declare const slideDown: SlideDown;
