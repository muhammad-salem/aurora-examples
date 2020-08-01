import { OnInit, OnChanges, AfterViewInit } from 'aurora-ts';
import { LogService } from './person';
export declare class PrimaryButton implements OnInit, OnChanges, AfterViewInit {
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
    outline: boolean;
    size: 'lg' | 'sm' | 'md';
    view: HTMLButtonElement;
    logger: LogService;
    constructor();
    afterViewInit(): void;
    onInit(): void;
    onChanges(): void;
    onClick(event: MouseEvent): void;
}
