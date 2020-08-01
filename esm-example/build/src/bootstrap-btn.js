var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, View, HostListener } from '../node_modules/aurora-ts/src/aurora.js';
import { LogService } from './person.js';
let PrimaryButton = class PrimaryButton {
    constructor() {
        this.color = 'primary';
        this.outline = false;
        this.size = 'md';
        this.logger = new LogService();
    }
    afterViewInit() {
        this.view.classList.add('btn');
        let className = 'btn';
        className += this.outline ? '-outline' : '';
        className += '-' + this.color;
        this.view.classList.add(className);
        this.view.classList.add('btn-' + this.size);
        this.view.className;
    }
    onInit() { }
    onChanges() {
        this.logger.info('info: logger');
        if (this.view) {
            this.view.className = "";
            this.afterViewInit();
        }
    }
    onClick(event) {
        console.log('button clicked!', event, this);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], PrimaryButton.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PrimaryButton.prototype, "outline", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PrimaryButton.prototype, "size", void 0);
__decorate([
    View(),
    __metadata("design:type", HTMLButtonElement)
], PrimaryButton.prototype, "view", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], PrimaryButton.prototype, "onClick", null);
PrimaryButton = __decorate([
    Component({
        selector: 'bootstrap-btn',
        extend: 'button'
    }),
    __metadata("design:paramtypes", [])
], PrimaryButton);
export { PrimaryButton };
//# sourceMappingURL=bootstrap-btn.js.map