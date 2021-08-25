export declare type IArea = [
    number,
    number,
    number,
    number
];
export declare type IDragArea = [
    number,
    number,
    number,
    number
];
export declare type IDomArea = [number, number];
export interface IDragSelectOption {
    container: HTMLElement;
    wrapper?: HTMLElement;
    dragAreaClass?: string;
    onSelected?: (selectedDom: HTMLElement[]) => void;
}
