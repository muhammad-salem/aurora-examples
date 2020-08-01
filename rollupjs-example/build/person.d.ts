import { OnInit, EventEmitter } from 'aurora-ts';
export declare class LogService {
    constructor();
    info(message: string): void;
}
export interface Person {
    name: string;
    age: number;
}
export declare class PersonModel implements OnInit {
    private service;
    name: string;
    years: number;
    open: EventEmitter<any>;
    _select: EventEmitter<any>;
    person: Person;
    className: string;
    view: HTMLElement;
    childName: HTMLParagraphElement;
    childAge: HTMLParagraphElement;
    children: HTMLParagraphElement[];
    constructor(service: LogService);
    onInit(): void;
    yearOfBirth(): number;
    get valid(): boolean;
    get invalid(): boolean;
    onLoad(e: Event): void;
    onResize(e: Event): void;
    onClick(btn: Event): void;
    onClose(data: any): void;
    set resize(msg: string);
    collectData(data: Object, ddd: Person): string[];
}
