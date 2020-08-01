import { Component, Input, HostListener, htmlFullPath } from '../node_modules/aurora-ts/src/aurora.js';
import { Person } from './person.js';
import personHTML from './app-root.html.js';

@Component({
	selector: 'app-root',
	template: personHTML
})
export class AppRoot {
	@Input()
	appVersion: string = '20.7.29';

	@Input()
	appName = 'Alex';

	@Input()
	name = 'Jone Alex';

	person1: Person = { name: 'jone', age: 39 };
	person2: Person = { name: 'alex', age: 46 };
	person3: Person = { name: 'delilya', age: 25 };
	person4: Person = { name: 'kelwa', age: 14 };

	@HostListener('person1:select')
	onClose(data: any) {
		console.log('AppRoot => person1:select', data);
	}
}
