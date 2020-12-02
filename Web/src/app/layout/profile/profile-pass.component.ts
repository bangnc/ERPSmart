import { Component, Output, EventEmitter } from '@angular/core';
import { ProfileService } from './profile.service';
import { Pass } from './profile';
import { AppSettingService } from '../../app-setting.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pass',
  templateUrl: './profile-pass.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfilePassComponent {
  pass = new Pass();
  navName = 'Password';
  setting: any;
  rePass: string;
  error: string;
  constructor(
    private service: ProfileService,
    private appSettingService: AppSettingService,
    public activeModal: NgbActiveModal
  ) {
    this.setting = this.appSettingService.get();
  }

  save() {
    if (this.rePass !== this.pass.newPass) {
      this.rePass = '';
      this.error = 'Nhập lại mật khẩu chưa đúng. Vui lòng nhập lại!';
    } else {
      this._update(this.pass);
    }

  }

  private _update(obj) {
    this.service.changePass(obj).subscribe(res => {
      switch (res.codeResult) {
        case 'FALSE_OLD' || 'FALSE':
          this.pass = new Pass();
          this.rePass = '';
          this.error = res.Result;
          break;
        case 'FALSE_NEW':
          this.pass.newPass = '';
          this.rePass = '';
          this.error = res.Result;
          break;
        case 'TRUE':
          alert(res.Result);
          this.activeModal.dismiss('Cross click');
          break;
        default:
          this.pass = new Pass();
          break;
      }
    });
  }
}
