import { Slide, Prototype, SlideProps } from './dtos';
export declare class SlideUp implements Slide, Prototype {
    private startTime;
    constructor();
    sliding(el: HTMLElement, originalProps: SlideProps, timingFn: number): void;
    clone(): Prototype & Slide;
    private rafFn(timestamp, el, originalProps, timingFn);
    private initFn(timestamp);
    private animationDone(el, originalProps);
}
export declare const slideUp: SlideUp;
