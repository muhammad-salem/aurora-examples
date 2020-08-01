var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Service, Component, Input, Output, View, ViewChild, ViewChildren, Optional, HostListener, SelfSkip, HostBinding, EventEmitter } from '../node_modules/aurora-ts/src/aurora.js';
import html from './person-view.html.js';
let LogService = class LogService {
    constructor() { }
    info(message) {
        let date = new Date();
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -- ${message}`);
    }
};
LogService = __decorate([
    Service({ provideIn: 'root' }),
    __metadata("design:paramtypes", [])
], LogService);
export { LogService };
let PersonModel = class PersonModel {
    constructor(service) {
        this.service = service;
        this.years = 87;
        this.open = new EventEmitter();
        this._select = new EventEmitter();
        this.person = {
            name: 'Delila',
            age: 24
        };
        this.className = 'p1 m1';
        this.name = 'ahmed';
    }
    onInit() {
        console.log('onInit', this);
        this.open.emit('init data');
    }
    yearOfBirth() {
        return 2020 - this.years;
    }
    get valid() {
        return true;
    }
    get invalid() {
        return false;
    }
    onLoad(e) {
        console.log(this, e);
    }
    onResize(e) {
        console.log(this, e);
    }
    onClick(btn) {
        console.log('button', btn, 'number of clicks:');
        this._select.emit({ name: 'alex', age: 24 });
    }
    onClose(data) {
        console.log('select', data);
    }
    set resize(msg) {
        console.log(this, msg);
        console.log(Reflect.metadata('component', 'dd'));
    }
    collectData(data, ddd) {
        return [];
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], PersonModel.prototype, "name", void 0);
__decorate([
    Input('age'),
    __metadata("design:type", Number)
], PersonModel.prototype, "years", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PersonModel.prototype, "open", void 0);
__decorate([
    Output('select'),
    __metadata("design:type", EventEmitter)
], PersonModel.prototype, "_select", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PersonModel.prototype, "person", void 0);
__decorate([
    View(),
    __metadata("design:type", HTMLElement)
], PersonModel.prototype, "view", void 0);
__decorate([
    ViewChild(HTMLParagraphElement, { id: 'p-name' }),
    __metadata("design:type", HTMLParagraphElement)
], PersonModel.prototype, "childName", void 0);
__decorate([
    ViewChild(HTMLParagraphElement, { id: 'p-age' }),
    __metadata("design:type", HTMLParagraphElement)
], PersonModel.prototype, "childAge", void 0);
__decorate([
    ViewChildren(HTMLParagraphElement),
    __metadata("design:type", Array)
], PersonModel.prototype, "children", void 0);
__decorate([
    HostBinding('class.valid'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], PersonModel.prototype, "valid", null);
__decorate([
    HostBinding('class.invalid'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], PersonModel.prototype, "invalid", null);
__decorate([
    HostListener('window:load', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onLoad", null);
__decorate([
    HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onResize", null);
__decorate([
    HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onClick", null);
__decorate([
    HostListener('select'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onClose", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PersonModel.prototype, "resize", null);
__decorate([
    __param(0, Optional()), __param(1, SelfSkip('GG')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Array)
], PersonModel.prototype, "collectData", null);
PersonModel = __decorate([
    Component({
        selector: 'person-view',
        template: html
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [LogService])
], PersonModel);
export { PersonModel };
//# sourceMappingURL=person.js.map