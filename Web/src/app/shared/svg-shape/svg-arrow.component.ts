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
    selector: '[svg-arrow]',
    templateUrl: './svg-arrow.component.html',
    styleUrls: ['./svg-arrow.component.scss']
})
export class SvgArrowComponent implements OnInit {

    @Input() from: SvgPosition;
    @Input() to: SvgPosition;
    @Input() name: string;
    @Input() pointSize: {
        w: number,
        h: number
    };
    @Input() lineStyle: LineStyle = LineStyle.Oblique;
    @Output() emitArrowClick = new EventEmitter<any>();
    public positionLable: any = { x: 0, y: 0 };
    constructor() { }
    ngOnInit(): void {
        this.to = this.to || { x: 0, y: 0 };
        this.from = this.from || { x: 0, y: 0 };
    }
    getPoints() {
        switch (this.lineStyle) {
            case LineStyle.Oblique:
                return this.getPointOblique();
            case LineStyle.CurveClockwise:
                return this.getPointCurve(60);
            case LineStyle.CurveCounterclockwise:
                return this.getPointCurve(-60);
            default:
                return this.getPointOblique();
        }
    }
    private getPointOblique() {
        const tmp = { x: this.to.x - this.from.x, y: this.to.y - this.from.y };
        const pointH = this.pointSize.h / 2 + 10;
        const pointW = this.pointSize.w / 2 + 10;
        let to = { x: 0, y: 0 };
        if (tmp.y < pointH && tmp.y > -pointH) {
            if (tmp.x > 0) {
                to = { x: this.to.x - pointW, y: this.to.y };
            } else {
                to = { x: this.to.x + pointW, y: this.to.y };
            }
        } else {
            if (tmp.y > 0) {
                to = { x: this.to.x, y: this.to.y - pointH };
            } else {
                to = { x: this.to.x, y: this.to.y + pointH };
            }
        }
        this.positionLable = {
            x: this.from.x + (to.x - this.from.x) / 3 * 2,
            y: this.from.y + (to.y - this.from.y) / 3 * 2
        };
        return `M${this.from.x},${this.from.y} L ${to.x},${to.y}`;
    }
    private getPointCurve(
        offset: number  // distance of control point from mid-point of line:
    ) {
        const tmp = { x: this.to.x - this.from.x, y: this.to.y - this.from.y };
        const pointH = this.pointSize.h / 2 + 10;
        const pointW = this.pointSize.w / 2 + 10;
        let to = { x: 0, y: 0 };
        if (tmp.y < pointH && tmp.y > -pointH) {
            if (tmp.x > 0) {
                to = { x: this.to.x - pointW, y: this.to.y };
            } else {
                to = { x: this.to.x + pointW, y: this.to.y };
            }
        } else {
            if (tmp.y > 0) {
                to = { x: this.to.x, y: this.to.y - pointH };
            } else {
                to = { x: this.to.x, y: this.to.y + pointH };
            }
        }
        // mid-point of line:
        const mp = {
            x: (this.from.x + this.to.x) * 0.5,
            y: (this.from.y + this.to.y) * 0.5
        };
        // angle of perpendicular to line:
        const theta = Math.atan2(to.y - this.from.y, to.x - this.from.x) - Math.PI / 2;

        // location of control point:
        const cp = {
            x: mp.x + offset * Math.cos(theta),
            y: mp.y + offset * Math.sin(theta)
        };

        this.positionLable = {
            x: (cp.x + mp.x) * 0.5,
            y: (cp.y + mp.y) * 0.5
        };
        return `M${this.from.x},${this.from.y} Q ${cp.x},${cp.y} ${to.x},${to.y}`;


    }

    onArrowClick() {
        this.emitArrowClick.emit();
    }
}

