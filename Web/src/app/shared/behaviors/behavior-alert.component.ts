import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alert',
    templateUrl: './behavior-alert.html'
})
export class AlertContentComponent {
    @Input() msg: any;
    @Input() title: string;
    @Input() size: string;
    @Input() type: string;
    constructor(public activeModal: NgbActiveModal) { }
}
