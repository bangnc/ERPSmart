import { Directive, Input, ContentChild, TemplateRef, ElementRef, OnInit } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[col-header]' })
export class ColumnHeaderDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }
}

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[col-body]' })
export class ColumnBodyDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }

}
// tslint:disable-next-line:directive-selector
@Directive({ selector: 'app-page-column' })
export class ColumnDirective {
    @Input() title: string;
    @Input() orderby: string;
    @Input() width: string;
    @Input() class: string;
    @ContentChild(ColumnHeaderDirective) headerTpl: ColumnHeaderDirective;
    @ContentChild(ColumnBodyDirective) bodyTpl: ColumnBodyDirective;
    constructor() { }
}
// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[app-page-actions]' })
export class ActionBarDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }

}
// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[app-page-filter]' })
export class FilterBarDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }

}

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[app-page-content]' })
export class TableContentDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }

}

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[app-page-create-content]' })
export class CreateInViewContentDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }

}
// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[app-page-content-custom]' })
export class CustomContentDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }

}

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'ng-template[app-page-tree-tc]' })
export class TreeTCContentDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }

}
