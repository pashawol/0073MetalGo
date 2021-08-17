import { SlideProps } from './dtos';
export declare class ElProps {
    getElProps(el: HTMLElement): SlideProps;
    getOriginalProps(el: HTMLElement): SlideProps;
    private changeElStyles(el, styles);
}
export declare const elProps: ElProps;
