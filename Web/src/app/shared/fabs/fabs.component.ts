import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface SvgPosition {
    x: number;
    y: number;
}
export enum LineStyle {
    Oblique = 1,
    CurveClockwise = 2,
    CurveCounterclockwise = 3
}
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-fabs',
    templateUrl: './fabs.component.html',
    styleUrls: ['./fabs.component.scss']
})
export class FabsComponent implements OnInit {

    @Input() icon: String;
    @Input() items: Array<any>;
    public isActive = false;
    constructor() { }
    ngOnInit(): void {

    }
    public toogleActive() {
       // this.isActive = !this.isActive;
    }
}

