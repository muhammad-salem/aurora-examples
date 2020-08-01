var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostListener } from '../node_modules/aurora-ts/src/aurora.js';
import personHTML from './app-root.html.js';
let AppRoot = class AppRoot {
    constructor() {
        this.appVersion = '20.7.29';
        this.appName = 'Alex';
        this.name = 'Jone Alex';
        this.person1 = { name: 'jone', age: 39 };
        this.person2 = { name: 'alex', age: 46 };
        this.person3 = { name: 'delilya', age: 25 };
        this.person4 = { name: 'kelwa', age: 14 };
    }
    onClose(data) {
        console.log('AppRoot => person1:select', data);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], AppRoot.prototype, "appVersion", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppRoot.prototype, "appName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppRoot.prototype, "name", void 0);
__decorate([
    HostListener('person1:select'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppRoot.prototype, "onClose", null);
AppRoot = __decorate([
    Component({
        selector: 'app-root',
        template: personHTML
    })
], AppRoot);
export { AppRoot };
//# sourceMappingURL=app-root.js.map