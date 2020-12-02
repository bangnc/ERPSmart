import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertContentComponent } from './behavior-alert.component';
import { ConfirmContentComponent } from './behavior-confirm.component';

@Injectable()
export class BehaviorsService {
  constructor(private modalService: NgbModal) {

  }
  alert(opt: any) {
    opt = opt || {};

    return new Promise((resolve, reject) => {
      const modalRef = this.modalService.open(AlertContentComponent, { size: opt.size || '' });
      modalRef.componentInstance.title = opt.title || 'Thông báo';
      modalRef.componentInstance.size = opt.size || '';
      modalRef.componentInstance.msg = opt.msg || '';
      modalRef.componentInstance.type = opt.type || 'black';
      modalRef.result.then((result) => {
        resolve(true);
      }, (reason) => {
        resolve(false);
      });

    });

  }
  confirm(opt: any) {
    opt = opt || {};

    return new Promise((resolve, reject) => {
      const modalRef = this.modalService.open(ConfirmContentComponent, { size: opt.size || '' });
      modalRef.componentInstance.title = opt.title || 'Thông báo';
      modalRef.componentInstance.size = opt.size || '';
      modalRef.componentInstance.msg = opt.msg || '';
      modalRef.componentInstance.type = opt.type || 'black';
      modalRef.result.then((result) => {
        resolve(true);
      }, (reason) => {
        resolve(false);
      });

    });

  }
}
