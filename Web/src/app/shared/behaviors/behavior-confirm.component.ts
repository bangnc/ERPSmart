import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-comfirm',
    templateUrl: './behavior-confirm.html'
})
export class ConfirmContentComponent {
    @Input() msg: any;
    @Input() title: string;
    @Input() size: string;
    @Input() type: string;
    constructor(public activeModal: NgbActiveModal) { }
}
