import { Directive, TemplateRef, Input, OnChanges, SimpleChanges } from '@angular/core';



@Directive({ selector: '[appActivityContent]' })
export class ActivityContentDirective  {
    constructor(public templateRef: TemplateRef<any>) {
    }

}



