import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from './profile.service';
import { Profile } from './profile';
import { CommonService } from '../../shared';
import { AppSettingService } from '../../app-setting.service';
import { ProfilePassComponent } from './profile-pass.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})

export class ProfileComponent implements OnInit {
  profile: Profile = new Profile();
  navName = 'Profile';
  editMode = false;
  hasTime = false;
  avatar: any;
  Departments: any;
  Positions: any;
  data: any;
  Genders = [
    { id: 1, name: 'Nam' },
    { id: 0, name: 'Nữ' }
  ];
  url_department = 'api/department';
  url_position = 'api/position';
  url: string;
  validationMessages = {
    'first_name':
    {
      'required': 'Nhập thông tin họ'
    },
    'last_name':
    {
      'required': 'Nhập thông tin tên'
    },
    'email':
    {
      'required': 'Nhập thông tin email.'
    }
  };
  @Output() emitClose = new EventEmitter<string>();
  constructor(
    private store: Store<any>,
    private service: ProfileService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private settingService: AppSettingService
  ) {

    const setting = this.settingService.get();
    this.url = (setting.API_ENDPOINT + '/UploadFile/') || '';
    this.store.pipe(select((state: any) => state.oauthReducer.profile), map(profile => {
      this.profile = profile;
    })).subscribe();
  }
  ngOnInit(): void {

    // this._getbyId();
  }
  closeNav() {
    this.emitClose.emit(this.navName);
  }
  edit() {
    this.editMode = true;
  }
  save() {
    this._update(this.profile);
    this.editMode = false;
  }
  cancel() {
    this.editMode = false;
    this._getbyId();
  }
  changePass() {
    this.modalService.open(ProfilePassComponent, { backdrop: 'static' });
  }
  logout() {
    this.service.logout();
  }
  private _getbyId() {
    this.service.getById().subscribe(res => {
      if (res.img_data != null) {
        res.img_data.file_data = this.url + res.avatar_url;
      } else {
        res.img_data = this.profile.img_data;
      }
      this.profile = res;
    });
  }
  private _update(obj) {
    this.service.update(obj).subscribe(res => {
      if (res.img_data != null) {
        res.img_data.file_data = this.url + res.avatar_url;
      } else {
        res.img_data = this.profile.img_data;
      }
      this.profile = res;
    });
  }
}
