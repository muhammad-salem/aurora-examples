/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

class Metadata {
    constructor(prototypeRef) {
        this.prototypeRef = prototypeRef;
        Metadata.setMetadata(prototypeRef, this);
    }
    static setMetadata(prototypeRef, metadata) {
        Object.defineProperty(prototypeRef, 'metadata', { value: metadata });
    }
    static createMetadata(prototypeRef) {
        const metadata = new Metadata(prototypeRef);
        Object.defineProperty(prototypeRef, 'metadata', { value: metadata });
        return metadata;
    }
    static getMetadata(prototypeRef) {
        return Reflect.get(prototypeRef, 'metadata');
    }
    setMetadata(propertyKey, metadataKey, value) {
        this[propertyKey] = this[propertyKey] || {};
        this[propertyKey][metadataKey] = value;
    }
    getMetadata(propertyKey, metadataKey) {
        if (propertyKey && metadataKey) {
            if (propertyKey in this) {
                if (metadataKey in this[propertyKey]) {
                    return this[propertyKey][metadataKey];
                }
            }
        }
        else if (propertyKey in this) {
            return this[propertyKey];
        }
        else if (metadataKey) {
            return this.getOwnMetadata(metadataKey);
        }
        else {
            return false;
        }
    }
    getOwnMetadata(metadataKey) {
        if (metadataKey) {
            return this.propertyKeys()
                .map((key) => this[key])
                .filter((meta) => meta[metadataKey]);
        }
        return this.propertyKeys().map((key) => this[key]);
    }
    getPropertyKeyFor(metadataKey) {
        if (metadataKey) {
            return this.propertyKeys()
                .map((key) => {
                return { key: key, value: this[key] };
            })
                .filter((pair) => metadataKey in pair.value)
                .map((pair) => pair.key);
        }
        return this.propertyKeys();
    }
    hasProperty(propertyKey) {
        return this[propertyKey] ? true : false;
    }
    hasMetadata(metadataKey, propertyKey) {
        if (metadataKey && propertyKey) {
            if (propertyKey in this) {
                return metadataKey in this[propertyKey];
            }
        }
        else if (metadataKey && !propertyKey) {
            for (const key of Object.keys(this)) {
                if (key === 'prototypeRef') {
                    continue;
                }
                if (metadataKey in this[key]) {
                    return true;
                }
            }
        }
        else if (!metadataKey && propertyKey) {
            return propertyKey in this;
        }
        return false;
    }
    propertyKeys() {
        return Object.keys(this).filter((key) => key !== 'prototypeRef');
    }
    metadataKeys() {
        let parent = [];
        let target = this.prototypeRef;
        while (target) {
            parent.push(target);
            target = Object.getPrototypeOf(target);
            if (target === null || target === void 0 ? void 0 : target.constructor) {
                target = target.constructor.prototype;
            }
        }
        return parent
            .map((proto) => Metadata.getMetadata(proto))
            .filter((metadata) => metadata)
            .flatMap((metadata) => metadata.getOwnMetadataKeys())
            .filter((elem, index, arr) => arr.indexOf(elem) === index);
    }
    getOwnMetadataKeys(propertyKey) {
        if (propertyKey) {
            return Object.keys(this[propertyKey]);
        }
        return this.propertyKeys()
            .map((key) => this[key])
            .flatMap((metaRef) => Object.keys(metaRef));
    }
    deleteMetadata(propertyKey, metadataKey) {
        if (metadataKey) {
            delete this[propertyKey][metadataKey];
        }
        else {
            delete this[propertyKey];
        }
    }
}
function getMetadataOrDefineMap(target) {
    let prototype = typeof target === 'function' ? target.prototype : target;
    let metadata = Metadata.getMetadata(prototype);
    if (!metadata) {
        metadata = Metadata.createMetadata(prototype);
    }
    return metadata;
}
function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
    getMetadataOrDefineMap(target).setMetadata(propertyKey, metadataKey, metadataValue);
}
function metadata(metadataKey, metadataValue) {
    function decorator(target, propertyKey) {
        getMetadataOrDefineMap(target).setMetadata(propertyKey || 'classMetadataRef', metadataKey, metadataValue);
    }
    return decorator;
}
function hasMetadata(metadataKey, target, propertyKey) {
    return getMetadataOrDefineMap(target).hasMetadata(metadataKey, propertyKey);
}
function getMetadata(metadataKey, target, propertyKey) {
    return getMetadataOrDefineMap(target).getMetadata(propertyKey || 'classMetadataRef', metadataKey);
}
function getOwnMetadata(target, propertyKey) {
    return getMetadataOrDefineMap(target).getOwnMetadataKeys(propertyKey);
}
function getPropertyKey(target) {
    return getMetadataOrDefineMap(target).propertyKeys();
}
function getMetadataKeys(target, propertyKey) {
    return getMetadataOrDefineMap(target).metadataKeys();
}
Object.defineProperty(Reflect, 'defineMetadata', { value: defineMetadata });
Object.defineProperty(Reflect, 'metadata', { value: metadata });
Object.defineProperty(Reflect, 'hasMetadata', { value: hasMetadata });
Object.defineProperty(Reflect, 'getMetadata', { value: getMetadata });
Object.defineProperty(Reflect, 'getOwnMetadata', { value: getOwnMetadata });
Object.defineProperty(Reflect, 'getPropertyKey', { value: getPropertyKey });
Object.defineProperty(Reflect, 'getMetadataKeys', { value: getMetadataKeys });

class Injector {
    constructor() {
        this.diMap = new Map();
    }
    getInstance(contr) {
        const instance = this.constructObject(contr);
        return instance;
    }
    constructObject(constructor) {
        let currentInstance = this.diMap.get(constructor);
        if (currentInstance)
            return currentInstance;
        const params = Reflect.getMetadata('design:paramtypes', constructor);
        if (params) {
            const argumentsInstances = params.map((paramter) => this.constructObject(paramter));
            currentInstance = new constructor(...argumentsInstances);
        }
        else {
            currentInstance = new constructor();
        }
        this.diMap.set(constructor, currentInstance);
        return currentInstance;
    }
}
const dependencyInjector = new Injector();

const DefaultTag = { name: null, classRef: HTMLElement };
const NativeTags = [
    { name: 'a', classRef: HTMLAnchorElement },
    { name: 'abbr', classRef: HTMLElement },
    { name: 'address', classRef: HTMLElement },
    { name: 'area', classRef: HTMLAreaElement },
    { name: 'article', classRef: HTMLElement },
    { name: 'aside', classRef: HTMLElement },
    { name: 'audio', classRef: HTMLAudioElement },
    { name: 'b', classRef: HTMLElement },
    { name: 'base', classRef: HTMLBaseElement },
    { name: 'bdi', classRef: HTMLElement },
    { name: 'bdo', classRef: HTMLElement },
    { name: 'blockquote', classRef: HTMLQuoteElement },
    { name: 'body', classRef: HTMLBodyElement },
    { name: 'br', classRef: HTMLBRElement },
    { name: 'button', classRef: HTMLButtonElement },
    { name: 'canvas', classRef: HTMLCanvasElement },
    { name: 'caption', classRef: HTMLTableCaptionElement },
    { name: 'cite', classRef: HTMLElement },
    { name: 'code', classRef: HTMLElement },
    { name: 'col', classRef: HTMLTableColElement },
    { name: 'colgroup', classRef: HTMLTableColElement },
    { name: 'data', classRef: HTMLDataElement },
    { name: 'datalist', classRef: HTMLDataListElement },
    { name: 'dd', classRef: HTMLElement },
    { name: 'del', classRef: HTMLModElement },
    { name: 'details', classRef: HTMLDetailsElement },
    { name: 'dfn', classRef: HTMLElement },
    { name: 'dialog', classRef: window.HTMLDialogElement || HTMLElement },
    { name: 'div', classRef: HTMLDivElement },
    { name: 'dl', classRef: HTMLDListElement },
    { name: 'dt', classRef: HTMLElement },
    { name: 'em', classRef: HTMLElement },
    { name: 'embed', classRef: HTMLEmbedElement },
    { name: 'fieldset', classRef: HTMLFieldSetElement },
    { name: 'figcaption', classRef: HTMLElement },
    { name: 'figure', classRef: HTMLElement },
    { name: 'footer', classRef: HTMLElement },
    { name: 'form', classRef: HTMLFormElement },
    { name: 'h1', classRef: HTMLHeadingElement },
    { name: 'h2', classRef: HTMLHeadingElement },
    { name: 'h3', classRef: HTMLHeadingElement },
    { name: 'h4', classRef: HTMLHeadingElement },
    { name: 'h5', classRef: HTMLHeadingElement },
    { name: 'h6', classRef: HTMLHeadingElement },
    { name: 'head', classRef: HTMLHeadElement },
    { name: 'header', classRef: HTMLElement },
    { name: 'hgroup', classRef: HTMLElement },
    { name: 'hr', classRef: HTMLHRElement },
    { name: 'html', classRef: HTMLHtmlElement },
    { name: 'i', classRef: HTMLElement },
    { name: 'iframe', classRef: HTMLIFrameElement },
    { name: 'img', classRef: HTMLImageElement },
    { name: 'input', classRef: HTMLInputElement },
    { name: 'ins', classRef: HTMLModElement },
    { name: 'kbd', classRef: HTMLElement },
    { name: 'label', classRef: HTMLLabelElement },
    { name: 'legend', classRef: HTMLLegendElement },
    { name: 'li', classRef: HTMLLIElement },
    { name: 'link', classRef: HTMLLinkElement },
    { name: 'main', classRef: HTMLElement },
    { name: 'map', classRef: HTMLMapElement },
    { name: 'mark', classRef: HTMLElement },
    { name: 'menu', classRef: HTMLMenuElement },
    { name: 'meta', classRef: HTMLMetaElement },
    { name: 'meter', classRef: HTMLMeterElement },
    { name: 'nav', classRef: HTMLElement },
    { name: 'noscript', classRef: HTMLElement },
    { name: 'object', classRef: HTMLObjectElement },
    { name: 'ol', classRef: HTMLOListElement },
    { name: 'optgroup', classRef: HTMLOptGroupElement },
    { name: 'option', classRef: HTMLOptionElement },
    { name: 'output', classRef: HTMLOutputElement },
    { name: 'p', classRef: HTMLParagraphElement },
    { name: 'param', classRef: HTMLParamElement },
    { name: 'picture', classRef: HTMLPictureElement },
    { name: 'pre', classRef: HTMLPreElement },
    { name: 'progress', classRef: HTMLProgressElement },
    { name: 'q', classRef: HTMLQuoteElement },
    { name: 'rp', classRef: HTMLElement },
    { name: 'rt', classRef: HTMLElement },
    { name: 'ruby', classRef: HTMLElement },
    { name: 's', classRef: HTMLElement },
    { name: 'samp', classRef: HTMLElement },
    { name: 'script', classRef: HTMLScriptElement },
    { name: 'section', classRef: HTMLElement },
    { name: 'select', classRef: HTMLSelectElement },
    { name: 'slot', classRef: HTMLSlotElement },
    { name: 'small', classRef: HTMLElement },
    { name: 'source', classRef: HTMLSourceElement },
    { name: 'span', classRef: HTMLSpanElement },
    { name: 'strong', classRef: HTMLElement },
    { name: 'style', classRef: HTMLStyleElement },
    { name: 'sub', classRef: HTMLElement },
    { name: 'summary', classRef: HTMLElement },
    { name: 'sup', classRef: HTMLElement },
    { name: 'table', classRef: HTMLTableElement },
    { name: 'tbody', classRef: HTMLTableSectionElement },
    { name: 'td', classRef: HTMLTableCellElement },
    { name: 'template', classRef: HTMLTemplateElement },
    { name: 'textarea', classRef: HTMLTextAreaElement },
    { name: 'tfoot', classRef: HTMLTableSectionElement },
    { name: 'th', classRef: HTMLTableCellElement },
    { name: 'thead', classRef: HTMLTableSectionElement },
    { name: 'time', classRef: HTMLTimeElement },
    { name: 'title', classRef: HTMLTitleElement },
    { name: 'tr', classRef: HTMLTableRowElement },
    { name: 'track', classRef: HTMLTrackElement },
    { name: 'u', classRef: HTMLElement },
    { name: 'ul', classRef: HTMLUListElement },
    { name: 'var', classRef: HTMLElement },
    { name: 'video', classRef: HTMLVideoElement },
    { name: 'wbr', classRef: HTMLElement },
    { name: 'virtual-scroller', classRef: HTMLElement },
];
function findByTagName(tagName) {
    if (!tagName || tagName === '' || tagName === 'none' || tagName === 'child') {
        return DefaultTag;
    }
    for (const tag of NativeTags) {
        if (tag.name === tagName) {
            return tag;
        }
    }
    return DefaultTag;
}

function isOnChanges(object) {
    return 'onChanges' in object;
}
function isOnInit(object) {
    return 'onInit' in object;
}
function isDoCheck(object) {
    return 'doCheck' in object;
}
function isAfterContentInit(object) {
    return 'afterContentInit' in object;
}
function isAfterContentChecked(object) {
    return 'afterContentChecked' in object;
}
function isAfterViewInit(object) {
    return 'afterViewInit' in object;
}
function isAfterViewChecked(object) {
    return 'afterViewChecked' in object;
}
function isOnDestroy(object) {
    return 'onDestroy' in object;
}

const Fragment = 'fragment';

function keyFor(keys, paramPath) {
    for (let i = 0; i < keys.length; i++) {
        if (paramPath.startsWith(keys[i])) {
            return keys[i];
        }
    }
    return false;
}
function splitByRegix(str, regx) {
    return str.split(regx).filter(key => key).map(a => a.trim());
}
function mapFunArgs(path) {
    const splits = splitByRegix(path, /\(|\)/g);
    let temp = {
        prop: splitByRegix(splits[0], /\.|\[|\]/g)
    };
    const callpaths = [temp];
    for (let i = 1; i < splits.length; i++) {
        const args = splitByRegix(splits[i], /,/g);
        if (args.length > 1) {
            temp.params = args;
        }
        else {
            temp = {
                prop: splitByRegix(splits[i], /\.|\[|\]/g),
            };
            callpaths.push(temp);
        }
    }
    return callpaths;
}
function getByPath(parent, objectPath, skipFirst, resolver) {
    const args = mapFunArgs(objectPath);
    let ref = parent;
    if (skipFirst) {
        args[0].prop.splice(0, 1);
    }
    for (let i = 0; i < args.length; i++) {
        const prop = args[i].prop;
        for (let j = 0; j < prop.length; j++) {
            ref = ref[prop[j]];
            if (!ref) {
                return undefined;
            }
        }
        if (args[i].params) {
            const resolverKeys = Object.keys(resolver || {});
            const keyParamters = [];
            const params = args[i].params;
            for (let j = 0; j < params.length; j++) {
                const param = params[j];
                let rkey;
                if (resolver && (rkey = keyFor(resolverKeys, param))) {
                    keyParamters.push(getByPath(resolver[rkey], param, true));
                }
                else if (!Number.isNaN(+param)) {
                    keyParamters.push(+param);
                }
                else {
                    keyParamters.push(param);
                }
            }
            ref = ref(...keyParamters);
        }
    }
    return ref;
}
function setValueByPath(parent, objectPath, value) {
    const args = mapFunArgs(objectPath);
    let ref = parent;
    let j;
    for (j = 0; j < args[0].prop.length - 1; j++) {
        ref = ref[args[0].prop[j]];
        if (!ref) {
            return;
        }
    }
    ref[args[0].prop[j]] = value;
}

class HTMLParser {
    constructor(template) {
        this.template = template;
    }
    parse() {
        return {
            tagName: Fragment,
            attributes: {},
            children: [],
        };
    }
}
class ComponentRender {
    constructor(baiseView, componentRef) {
        this.baiseView = baiseView;
        this.componentRef = componentRef;
        if (typeof componentRef.template === 'string') {
            this.template = new HTMLParser(componentRef.template).parse();
        }
        else if (componentRef.template) {
            this.template = componentRef.template;
        }
        else if (componentRef.extend) ;
        else {
            throw new Error('Method not implemented.');
        }
    }
    templateHadel(element, elemProp, regex) {
        const templateText = Reflect.get(element, elemProp);
        const result = [...templateText.matchAll(regex || (/\{\{(.+\w*)*\}\}/g))];
        if (result.length === 0) {
            return;
        }
        const handler = () => {
            let renderText = templateText;
            result.forEach(match => {
                let tempValue = getByPath(this.baiseView._model, match[1]);
                renderText = renderText.replace(match[0], tempValue);
            });
            Reflect.set(element, elemProp, renderText);
        };
        result.forEach(match => this.baiseView._observable.subscribe(match[1], handler));
        this.baiseView._observable.emit(result[0][1]);
    }
    printNode(node) {
        if (node instanceof Text && node.textContent) {
            this.templateHadel(node, 'textContent');
        }
        else if (node instanceof Element) {
            console.group(node.nodeName);
            for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                if (attr.name.match(/\[\((\w*)\)\]/g)) {
                    const result = [...attr.value.matchAll(/\[\((\w*)\)\]/g)];
                    result.forEach(match => {
                        console.log('two way', match);
                    });
                }
                else if (attr.name.match(/\[(\w*)\]/g)) {
                    const result = [...attr.value.matchAll(/\[(\w*)\]/g)];
                    result.forEach(match => {
                        console.log('one way ', match);
                    });
                }
                else if (attr.value.match(/\{\{(.+\w*)*\}\}/g)) {
                    const result = [...attr.value.matchAll(/\{\{(.+\w*)*\}\}/g)];
                    let renderText = attr.value;
                    result.forEach(match => {
                        let tempValue = getByPath(this.baiseView._model, match[1]);
                        setValueByPath(node, attr.name, tempValue);
                        renderText = renderText.replace(match[0], tempValue);
                    });
                    attr.value = renderText;
                }
            }
            node.childNodes.forEach(child => this.printNode(child));
            console.groupEnd();
        }
    }
    initViewFromString() {
        var template = document.createElement('template');
        template.innerHTML = this.componentRef.template;
        template.content.childNodes.forEach(child => this.printNode(child));
        console.log(template);
        this.baiseView.appendChild(template.content);
    }
    initView() {
        var _a;
        this.baiseView.appendChild(this.createElement(this.template));
        (_a = this.componentRef.hostListeners) === null || _a === void 0 ? void 0 : _a.forEach((listener) => this.handelHostListener(listener));
    }
    createElement(viewTemplate) {
        const element = this.setupElement(viewTemplate.tagName);
        if (viewTemplate.attributes) {
            for (const key in viewTemplate.attributes) {
                this.handleAttributes(element, key, viewTemplate.attributes[key]);
            }
        }
        if (viewTemplate.children) {
            for (const child of viewTemplate.children) {
                this.appendChild(element, child);
            }
        }
        return element;
    }
    setupElement(tagName) {
        if (Fragment === tagName.toLowerCase()) {
            return document.createDocumentFragment();
        }
        else if (tagName.includes('-')) {
            const registry = dependencyInjector.getInstance(ClassRegistry);
            const componentRef = registry.getComponentRef(tagName);
            return componentRef ?
                new componentRef.viewClass() : document.createElement(tagName);
        }
        else {
            return document.createElement(tagName);
        }
    }
    appendChild(parent, child) {
        if (typeof child === 'undefined' || child === null) {
            return;
        }
        if (child.tagName) {
            parent.appendChild(this.createElement(child));
        }
        else if (Array.isArray(child)) {
            for (const value of child) {
                this.appendChild(parent, value);
            }
        }
        else if (child instanceof Node) {
            parent.appendChild(child);
        }
        else if (typeof child === 'boolean') ;
        else {
            var node = document.createTextNode(String(child));
            parent.appendChild(node);
            this.templateHadel(node, 'textContent', /\$(\w*)(\(\))?/g);
        }
    }
    handleAttributes(element, key, value) {
        if (key.startsWith('#')) {
            Reflect.set(this.baiseView, key.substring(1), element);
        }
        else if (key.startsWith('$')) {
            return;
        }
        else if (typeof value === 'string' && value.includes('{{') && value.includes('}}')) {
            let property = value;
            property = property.substring(2, property.length - 2);
            element.setAttribute(key, this.baiseView._model[property]);
        }
        else {
            if (typeof value === 'boolean' && value) {
                element.setAttribute(key, '');
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
    handelHostListener(listener) {
        let eventName = listener.eventName, source, eventCallback = this.baiseView._model[listener.modelCallbackName];
        if (listener.eventName.includes(':')) {
            const eventSource = eventName.substring(0, eventName.indexOf(':'));
            eventName = eventName.substring(eventName.indexOf(':') + 1);
            if ('window' === eventSource.toLowerCase()) {
                source = window;
                this.addNativeEventListener(source, eventName, eventCallback);
                return;
            }
            else if (eventSource in this.baiseView) {
                source = Reflect.get(this.baiseView, eventSource);
                if (!Reflect.has(source, '_model')) {
                    this.addNativeEventListener(source, eventName, eventCallback);
                    return;
                }
            }
            else {
                source = this.baiseView;
            }
        }
        else {
            source = this.baiseView;
        }
        const sourceModel = Reflect.get(source, '_model');
        const output = dependencyInjector
            .getInstance(ClassRegistry)
            .hasOutput(sourceModel, eventName);
        if (output) {
            sourceModel[output.modelProperty].subscribe((value) => {
                eventCallback.call(sourceModel, value);
            });
        }
        else if (Reflect.has(source, 'on' + eventName)) {
            this.addNativeEventListener(source, eventName, eventCallback);
        }
    }
    addNativeEventListener(source, eventName, funcallback) {
        source.addEventListener(eventName, (event) => {
            funcallback.call(this.baiseView._model, event);
        });
    }
    hasEventEmitter(source, eventName) {
        if (this.componentRef.outputs) {
            for (const output of this.componentRef.outputs) {
                if (output.viewAttribute === eventName) {
                    return true;
                }
            }
        }
        return false;
    }
}

class Observable {
    constructor() {
        this.subscripers = new Map();
    }
    emit(propertyPath) {
        [...this.subscripers.keys()]
            .filter(key => key === null || key === void 0 ? void 0 : key.startsWith(propertyPath))
            .map(key => this.subscripers.get(key))
            .forEach(callbacks => {
            callbacks === null || callbacks === void 0 ? void 0 : callbacks.forEach(callback => {
                try {
                    callback();
                }
                catch (error) {
                    console.error("error at call ", callback.name);
                }
            });
        });
    }
    subscribe(attrName, callback) {
        const callbacks = this.subscripers.get(attrName);
        if (callbacks) {
            callbacks.push(callback);
        }
        else {
            this.subscripers.set(attrName, [callback]);
        }
    }
    destroy() {
        this.subscripers.clear();
    }
}

class PropertyRef {
    constructor(modelProperty, _viewNanme, descriptor) {
        this.modelProperty = modelProperty;
        this._viewNanme = _viewNanme;
    }
    get viewAttribute() {
        return this._viewNanme || this.modelProperty;
    }
}
class ChildRef {
    constructor(modelName, selector, childOptions) {
        this.modelName = modelName;
        this.selector = selector;
        this.childOptions = childOptions;
    }
}
class ListenerRef {
    constructor(eventName, args, modelCallbackName) {
        this.eventName = eventName;
        this.args = args;
        this.modelCallbackName = modelCallbackName;
    }
}
class HostBindingRef {
    constructor(viewProperty, hostPropertyName) {
        this.viewProperty = viewProperty;
        this.hostPropertyName = hostPropertyName;
    }
}
function findByModelClassOrCreat(modelProperty) {
    var bootstrapMetadata = Reflect.get(modelProperty, 'bootstrap');
    if (!bootstrapMetadata) {
        bootstrapMetadata = {};
        Object.defineProperty(modelProperty, 'bootstrap', {
            value: bootstrapMetadata,
        });
    }
    return bootstrapMetadata;
}
function getBootstrapMatadata(modelProperty) {
    return Reflect.get(modelProperty, 'bootstrap');
}
class ComponentElement {
    static addOptional(modelProperty, propertyName, index) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
    }
    static addInput(modelProperty, modelName, viewNanme, descriptor) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
        bootstrap.inputs = bootstrap.inputs || [];
        bootstrap.inputs.push(new PropertyRef(modelName, viewNanme, descriptor));
    }
    static addOutput(modelProperty, modelName, viewNanme) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
        bootstrap.outputs = bootstrap.outputs || [];
        bootstrap.outputs.push(new PropertyRef(modelName, viewNanme));
    }
    static setComponentView(modelProperty, modelName) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
        bootstrap.view = modelName;
    }
    static addViewChild(modelProperty, modelName, selector, childOptions) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
        bootstrap.viewChild = bootstrap.viewChild || [];
        bootstrap.viewChild.push(new ChildRef(modelName, selector, childOptions));
    }
    static addViewChildren(modelProperty, modelName, selector) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
        bootstrap.ViewChildren = bootstrap.ViewChildren || [];
        bootstrap.ViewChildren.push(new ChildRef(modelName, selector));
    }
    static addHostListener(modelProperty, propertyKey, eventName, args) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
        bootstrap.hostListeners = bootstrap.hostListeners || [];
        bootstrap.hostListeners.push(new ListenerRef(eventName, args, propertyKey));
    }
    static addHostBinding(modelProperty, propertyKey, hostPropertyName) {
        var bootstrap = findByModelClassOrCreat(modelProperty);
        bootstrap.hostBinding = bootstrap.hostBinding || [];
        bootstrap.hostBinding.push(new HostBindingRef(propertyKey, hostPropertyName));
    }
    static defineDirective(modelClass, opts) {
        var bootstrap = findByModelClassOrCreat(modelClass.prototype);
        for (const key in opts) {
            bootstrap[key] = Reflect.get(opts, key);
        }
        dependencyInjector.getInstance(ClassRegistry).registerDirective(modelClass);
    }
    static definePipe(modelClass, opts) {
        var bootstrap = findByModelClassOrCreat(modelClass.prototype);
        for (const key in opts) {
            bootstrap[key] = Reflect.get(opts, key);
        }
        dependencyInjector.getInstance(ClassRegistry).registerPipe(modelClass);
    }
    static defineService(modelClass, opts) {
        var bootstrap = findByModelClassOrCreat(modelClass.prototype);
        for (const key in opts) {
            bootstrap[key] = Reflect.get(opts, key);
        }
        dependencyInjector.getInstance(ClassRegistry).registerService(modelClass);
    }
    static defineComponent(modelClass, opts) {
        var _a;
        var bootstrap = findByModelClassOrCreat(modelClass.prototype);
        for (const key in opts) {
            bootstrap[key] = Reflect.get(opts, key);
        }
        bootstrap.extend = findByTagName(opts.extend);
        var componentRef = bootstrap;
        componentRef.viewClass = initViewClass(modelClass, componentRef);
        dependencyInjector.getInstance(ClassRegistry).registerComponent(modelClass);
        dependencyInjector
            .getInstance(ClassRegistry)
            .registerView(bootstrap.viewClass);
        const options = {};
        const parentTagName = (_a = componentRef.extend) === null || _a === void 0 ? void 0 : _a.name;
        if (parentTagName) {
            if (parentTagName !== '!' && parentTagName.indexOf('-') === -1) {
                options.extends = parentTagName;
            }
        }
        customElements.define(componentRef === null || componentRef === void 0 ? void 0 : componentRef.selector, componentRef.viewClass, options);
    }
}
function initViewClass(modelClass, componentRef) {
    const viewClassName = `${modelClass.name}View`;
    const attributes = componentRef.inputs.map(input => input.viewAttribute);
    const htmlParent = componentRef.extend.classRef;
    let className = {};
    className[viewClassName] = class extends htmlParent {
        constructor() {
            super();
            this.doBlockCallback = () => {
                if (isDoCheck(this._model)) {
                    this._model.doCheck();
                }
            };
            this._model = new modelClass();
            this._observable = new Observable();
            this._render = new ComponentRender(this, componentRef);
            this._nativeSetAttribute = this.setAttribute;
            this._nativeGetAttribute = this.getAttribute;
            this.setAttribute = this.setAttributeModel;
            this.getAttribute = this.getAttributeModel;
            attributes.forEach(attr => this.setAttribute(attr, this._model[attr]));
        }
        setAttributeModel(qualifiedName, value) {
            Reflect.set(this._model, qualifiedName, value);
            this._nativeSetAttribute(qualifiedName, value);
            this._observable.emit(qualifiedName);
        }
        getAttributeModel(qualifiedName) {
            return Reflect.get(this._model, qualifiedName);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (newValue === oldValue) {
                return;
            }
            this._observable.emit(name);
            if (isOnChanges(this._model)) {
                this._model.onChanges();
            }
            this.doBlockCallback();
        }
        connectedCallback() {
            if (isOnChanges(this._model)) {
                this._model.onChanges();
            }
            if (isOnInit(this._model)) {
                this._model.onInit();
            }
            if (isDoCheck(this._model)) {
                this._model.doCheck();
            }
            if (isAfterContentInit(this._model)) {
                this._model.afterContentInit();
            }
            if (isAfterContentChecked(this._model)) {
                this._model.afterContentChecked();
            }
            if (componentRef.template) {
                if (typeof componentRef.template === 'string') {
                    this._render.initViewFromString();
                }
                else {
                    this._render.initView();
                }
            }
            if (componentRef.view) {
                this._model[componentRef.view] = this;
            }
            if (isAfterViewInit(this._model)) {
                this._model.afterViewInit();
            }
            if (isAfterViewChecked(this._model)) {
                this._model.afterViewChecked();
            }
            this.doBlockCallback = () => {
                if (isDoCheck(this._model)) {
                    this._model.doCheck();
                }
                if (isAfterContentChecked(this._model)) {
                    this._model.afterContentChecked();
                }
                if (isAfterViewChecked(this._model)) {
                    this._model.afterViewChecked();
                }
            };
        }
        adoptedCallback() {
            this.connectedCallback();
        }
        disconnectedCallback() {
            if (isOnDestroy(this._model)) {
                this._model.onDestroy();
            }
        }
    };
    attributes.forEach(prop => {
        if (className[viewClassName].prototype.hasOwnProperty(prop)) {
            prop = prop + 'Attr';
            console.log(prop);
        }
        Object.defineProperty(className[viewClassName].prototype, prop, {
            get() {
                return this._model[prop];
            },
            set(value) {
                this.setAttribute(prop, value);
            },
        });
    });
    Object.defineProperty(className[viewClassName], 'observedAttributes', {
        get() {
            return attributes;
        },
    });
    Object.defineProperty(modelClass, viewClassName, {
        value: className[viewClassName],
    });
    console.log(className[viewClassName].name);
    return className[viewClassName];
}

class ClassRegistry {
    constructor() {
        this.viewSet = new Set();
        this.componentSet = new Set();
        this.serviceSet = new Set();
        this.directiveSet = new Set();
        this.pipeSet = new Set();
    }
    registerView(classRef) {
        this.viewSet.add(classRef);
    }
    registerComponent(classRef) {
        this.componentSet.add(classRef);
    }
    registerService(classRef) {
        this.serviceSet.add(classRef);
    }
    registerDirective(classRef) {
        this.directiveSet.add(classRef);
    }
    registerPipe(classRef) {
        this.pipeSet.add(classRef);
    }
    hasComponet(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = getBootstrapMatadata(modelClass.prototype);
            if (componentRef.selector === selector) {
                return true;
            }
        }
        return false;
    }
    getComponentRef(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = getBootstrapMatadata(modelClass.prototype);
            if (componentRef.selector === selector) {
                return componentRef;
            }
        }
    }
    getComponet(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = getBootstrapMatadata(modelClass.prototype);
            if (componentRef.selector === selector) {
                return modelClass;
            }
        }
    }
    getComponetView(selector) {
        var _a;
        return (_a = this.getComponentRef(selector)) === null || _a === void 0 ? void 0 : _a.viewClass;
    }
    hasOutput(model, eventName) {
        if (Reflect.has(model, 'bootstrap')) {
            const componentRef = Reflect.get(model, 'bootstrap');
            if (componentRef.outputs) {
                for (const out of componentRef.outputs) {
                    if (out.viewAttribute === eventName) {
                        return out;
                    }
                }
            }
        }
        return false;
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate$1(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata$1(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function Input(name) {
    return (target, propertyKey, desc) => {
        ComponentElement.addInput(target, propertyKey, name || propertyKey, desc);
    };
}
function Output(name) {
    return (target, propertyKey) => {
        ComponentElement.addOutput(target, propertyKey, name || propertyKey);
    };
}
function View() {
    return (target, propertyKey) => {
        ComponentElement.setComponentView(target, propertyKey);
    };
}
function ViewChild(selector, childOptions) {
    return (target, propertyKey) => {
        ComponentElement.addViewChild(target, propertyKey, name, childOptions);
    };
}
function ViewChildren(selector) {
    return (target, propertyKey) => {
        ComponentElement.addViewChildren(target, propertyKey, name);
    };
}
function HostListener(eventName, args) {
    return (target, propertyKey) => {
        ComponentElement.addHostListener(target, propertyKey, eventName, args || []);
    };
}
function HostBinding(hostPropertyName) {
    return (target, propertyKey) => {
        ComponentElement.addHostBinding(target, propertyKey, hostPropertyName);
    };
}
function Service(opt) {
    return (target) => {
        ComponentElement.defineService(target, opt);
        return target;
    };
}
function Directive(opt) {
    return (target) => {
        ComponentElement.defineDirective(target, opt);
        return target;
    };
}
function Component(opt) {
    return (target) => {
        ComponentElement.defineComponent(target, opt);
        return target;
    };
}
function SelfSkip(name) {
    return (target, propertyKey, index) => {
        Reflect.defineMetadata('selfskip', { name, index }, target, propertyKey);
    };
}
function Optional() {
    return (target, propertyKey, index) => {
        Reflect.defineMetadata('optional', { index }, target, propertyKey);
    };
}

class Subscription {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    add(subscription) {
        if (!this.othersSubscription) {
            this.othersSubscription = [];
        }
        this.othersSubscription.push(subscription);
    }
    unsubscribe() {
        this.eventEmitter.remove(this);
        if (this.othersSubscription) {
            this.othersSubscription.forEach((subscription) => {
                subscription.unsubscribe();
            });
        }
    }
}
class EventEmitter {
    constructor() {
        this.subscripers = new Map();
    }
    emit(value) {
        this.subscripers.forEach((subscrip) => {
            try {
                subscrip.next(value);
            }
            catch (error) {
                try {
                    if (subscrip.error) {
                        subscrip.error(error);
                    }
                }
                catch (error) {
                    console.error('error: handeling event');
                }
            }
            finally {
                try {
                    if (subscrip.complete) {
                        subscrip.complete();
                    }
                }
                catch (error) {
                    console.error('error: handeling event');
                }
            }
        });
    }
    subscribe(next, error, complete) {
        const subscription = new Subscription(this);
        this.subscripers.set(subscription, { next, error, complete });
        return subscription;
    }
    remove(subscription) {
        this.subscripers.delete(subscription);
    }
}

let IfDirective = class IfDirective {
    constructor() { }
    set ifThen(view) { }
    set ifElse(view) { }
    onInit() {
        console.log('IfDirective#onInit()');
    }
    afterViewInit() {
        console.log('IfDirective#onInit()');
    }
};
__decorate$1([
    View(),
    __metadata$1("design:type", Comment)
], IfDirective.prototype, "comment", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Boolean)
], IfDirective.prototype, "if", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [Object])
], IfDirective.prototype, "ifThen", null);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [Object])
], IfDirective.prototype, "ifElse", null);
IfDirective = __decorate$1([
    Directive({
        selector: '[if]',
    }),
    __metadata$1("design:paramtypes", [])
], IfDirective);

var html = "<div>\n    {{person.name}}\n    {{person.age}}\n</div>\n<p id=\"p-name\" #namearea class=\"{{className}}\" onclick=\"resize()\">\n    Your name is {{name}}\n</p>\n<p id=\"p-age\" #agearea>youur age is: {{years}}, born in Year of {{yearOfBirth()}}</p>\n<div if=\"id===1\">\n    Dummy Test\n    <p>Data</p>\n</div>";

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
    ViewChildren(),
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

var personHTML = "<div [name]=\"name\" [(id)]=\"id\" (click)=\"onClick()\">\n    {{appVersion}}\n    {{appName}}\n</div>\n\n<h1 @textcontent=\"ddd\" @name=\"@text\"></h1>\n<h2>data1{'data2'}data3</h2>\n<h3>data1 'data2' data3</h3>\n<h4>data1 {JSON.stringify(data)} data3</h4>\n\n\n<progress-bar value=\"40\" min=\"0\" max=\"100\"></progress-bar>\n<div class=\"row\">\n    <div class=\"col-3\">\n        <person-view #person1 person=\"{{person1}}\" name=\"dddddddd\" age=\"34\" allowed></person-view>\n    </div>\n    <div class=\"col-3\">\n        <person-view #person2 person=\"{{person2}}\" name=\"{{name}}\" bind-age=\"years\"></person-view>\n    </div>\n    <div class=\"col-3\">\n        <person-view name=\"jone\" age=\"25\" person=\"{{person3}}\"></person-view>\n    </div>\n    <div class=\"col-3\">\n        <person-view name=\"alex\" age=\"29\" person=\"{{person4}}\"></person-view>\n    </div>\n</div>\n\n<div class=\"row p-1 m-1\">\n    <div class=\"col-12 p-1 m-1\">\n        <div class=\"btn-group btn-group-vertical\" role=\"group\">\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"primary\">Primary</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"primary\">Primary</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"secondary\">Secondary</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"success\">Success</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"danger\">Danger</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"warning\">Warning</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"info\">Info</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"light\">Light</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"dark\">Dark</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" color=\"link\">Link</button>\n        </div>\n    </div>\n    <div class=\"col-12 p-1 m-1\">\n        <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"primary\">Primary</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"secondary\">Secondary</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"success\">Success</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"danger\">Danger</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"warning\">Warning</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"info\">Info</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"light\">Light</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"dark\">Dark</button>\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"link\">Link</button>\n        </div>\n    </div>\n    <div class=\"col-12 p-1 m-1\">\n        <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\n            <button is=\"bootstrap-btn\" size=\"sm\" outline color=\"secondary\">Left</button>\n            <button is=\"bootstrap-btn\" size=\"md\" outline color=\"secondary\">Middle</button>\n            <button is=\"bootstrap-btn\" size=\"lg\" outline color=\"secondary\">Right</button>\n        </div>\n    </div>\n</div>";

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

export { AppRoot, LogService, PersonModel, PrimaryButton };
//# sourceMappingURL=index.js.map
