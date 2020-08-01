export default `
<div [name]="name" [(id)]="id" (click)="onClick()">
    {{appVersion}}
    {{appName}}
</div>

<h1 @textContent="ddd" @name=@text></h1>
<h2>data1{'data2'}data3</h2>
<h3>data1 'data2' data3</h3>
<h4>data1 {JSON.stringify(data)} data3</h4>


<progress-bar value="40" min="0" max="100"></progress-bar>
<div class="row">
    <div class="col-3">
        <person-view #person1 person="{{person1}}" name="dddddddd" age="34" allowed></person-view>
    </div>
    <div class="col-3">
        <person-view #person2 person="{{person2}}" name="{{name}}" bind-age="years"></person-view>
    </div>
    <div class="col-3">
        <person-view name="jone" age="25" person="{{person3}}"></person-view>
    </div>
    <div class="col-3">
        <person-view name="alex" age="29" person="{{person4}}"></person-view>
    </div>
</div>

<div class="row p-1 m-1">
    <div class="col-12 p-1 m-1">
        <div class="btn-group btn-group-vertical" role="group">
            <button is="bootstrap-btn" size="sm" color="primary">Primary</button>
            <button is="bootstrap-btn" size="sm" color="primary">Primary</button>
            <button is="bootstrap-btn" size="sm" color="secondary">Secondary</button>
            <button is="bootstrap-btn" size="sm" color="success">Success</button>
            <button is="bootstrap-btn" size="sm" color="danger">Danger</button>
            <button is="bootstrap-btn" size="sm" color="warning">Warning</button>
            <button is="bootstrap-btn" size="sm" color="info">Info</button>
            <button is="bootstrap-btn" size="sm" color="light">Light</button>
            <button is="bootstrap-btn" size="sm" color="dark">Dark</button>
            <button is="bootstrap-btn" size="sm" color="link">Link</button>
        </div>
    </div>
    <div class="col-12 p-1 m-1">
        <div class="btn-group" role="group" aria-label="Basic example">
            <button is="bootstrap-btn" size="sm" outline color="primary">Primary</button>
            <button is="bootstrap-btn" size="sm" outline color="secondary">Secondary</button>
            <button is="bootstrap-btn" size="sm" outline color="success">Success</button>
            <button is="bootstrap-btn" size="sm" outline color="danger">Danger</button>
            <button is="bootstrap-btn" size="sm" outline color="warning">Warning</button>
            <button is="bootstrap-btn" size="sm" outline color="info">Info</button>
            <button is="bootstrap-btn" size="sm" outline color="light">Light</button>
            <button is="bootstrap-btn" size="sm" outline color="dark">Dark</button>
            <button is="bootstrap-btn" size="sm" outline color="link">Link</button>
        </div>
    </div>
    <div class="col-12 p-1 m-1">
        <div class="btn-group" role="group" aria-label="Basic example">
            <button is="bootstrap-btn" size="sm" outline color="secondary">Left</button>
            <button is="bootstrap-btn" size="md" outline color="secondary">Middle</button>
            <button is="bootstrap-btn" size="lg" outline color="secondary">Right</button>
        </div>
    </div>
</div>
`;