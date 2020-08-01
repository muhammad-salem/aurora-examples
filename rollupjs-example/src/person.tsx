import {
	Service, Component, Input, Output, View, ViewChild,
	ViewChildren, Optional, HostListener, SelfSkip, HostBinding, OnInit, EventEmitter
} from 'aurora-ts';


import html from './person-view.html';

@Service({ provideIn: 'root' })
export class LogService {
	constructor() { }
	info(message: string) {
		let date = new Date();
		console.log(
			`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -- ${message}`
		);
	}
}

export interface Person {
	name: string;
	age: number;
}

@Component({
	selector: 'person-view',
	template: html
})
export class PersonModel implements OnInit {
	@Input() name: string;
	@Input('age') years: number = 87;
	@Output() open: EventEmitter<any> = new EventEmitter();
	@Output('select') _select: EventEmitter<any> = new EventEmitter();

	@Input()
	person: Person = {
		name: 'Delila',
		age: 24
	};

	className: string = 'p1 m1';

	@View() view: HTMLElement;

	@ViewChild(HTMLParagraphElement, { id: 'p-name' })
	childName!: HTMLParagraphElement;
	@ViewChild(HTMLParagraphElement, { id: 'p-age' })
	childAge!: HTMLParagraphElement;

	@ViewChildren(HTMLParagraphElement) children: HTMLParagraphElement[];

	constructor(@Optional() private service: LogService) {
		this.name = 'ahmed';
	}
	onInit(): void {
		console.log('onInit', this);
		this.open.emit('init data');
	}

	yearOfBirth() {
		return 2020 - this.years;
	}

	@HostBinding('class.valid') get valid() {
		return true;
	}
	@HostBinding('class.invalid') get invalid() {
		return false;
	}

	@HostListener('window:load', ['$event'])
	onLoad(e: Event) {
		console.log(this, e);
	}

	@HostListener('window:resize', ['$event'])
	onResize(e: Event) {
		console.log(this, e);
	}

	@HostListener('click', ['$event.target'])
	onClick(btn: Event) {
		console.log('button', btn, 'number of clicks:');
		this._select.emit({ name: 'alex', age: 24 });
	}

	@HostListener('select')
	onClose(data: any) {
		console.log('select', data);
	}

	@Input()
	set resize(msg: string) {
		console.log(this, msg);
		console.log(Reflect.metadata('component', 'dd'));
	}

	collectData(@Optional() data: Object, @SelfSkip('GG') ddd: Person): string[] {
		return [];
	}
}
