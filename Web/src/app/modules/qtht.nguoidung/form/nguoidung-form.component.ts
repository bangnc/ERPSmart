import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NguoiDung } from '../nguoidung';
import { NguoiDungService } from './../nguoidung.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { Nhom } from '../../qtht.nhom/nhom';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nguoidung-form[class="app-module-warp"]',
  templateUrl: './nguoidung-form.component.html',
  providers: [NguoiDungService]
})
export class NguoiDungFormComponent implements OnInit {

  data: NguoiDung = new NguoiDung();
  Nhoms: Array<Nhom> = new Array<Nhom>();
  id: string;
  editMode = false;
  nguoidung_url = 'api/qtht-nguoidung';
  urlToChuc = 'api/tc-tochuc?output_type=dm';
  urlPhongBan = 'api/tc-phongban';
  urlNhom = 'api/qtht-nhom';
  optionTC: any;
  is_administrator = false;

  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.NGUOIDUNG_CAPNHAT,
    DELETE: PERMSConstant.QTHT.NGUOIDUNG_XOA
  };

  validationMessages = {
    'FullName':
    {
      'required': 'Nhập thông tin họ và tên.'
    },
    'UserName':
    {
      'required': 'Nhập thông tin tên tài khoản.'
    },
    'Password':
    {
      'required': 'Nhập thông tin mật khẩu.'
    },
    'to_chuc_id':
    {
      'required': 'Nhập thông tin Hội LHPN.'
    },
    'ds_nhom_id':
    {
      'required': 'Nhập thông tin nhóm người dùng.'
    },
    'Email':
    {
      'required': 'Nhập email người dùng.'
    }
  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: NguoiDungService,
    private route: ActivatedRoute,
    private behaviors: BehaviorsService,
    private commonService: CommonService,
    private store: Store<any>,
  ) {
    this.store
      .pipe(
        select((state: any) => state.oauthReducer.profile),
        map(profile => {
          if (profile.tai_khoan_goc) {
            this.is_administrator = true;
          }
        })
      )
      .subscribe();

    this.commonService.setFormKeyBoard(
      save => {
        if (this.positionlForm.valid && this.editMode && AppConst.ChucNang.QTHT[this.perms.EDIT]) {
          this._save(this.data);
        }
      },
      update => {
        if (this.positionlForm.valid && !this.editMode && AppConst.ChucNang.QTHT[this.perms.EDIT]) {
          this.update();
        }
      });
    this.optionTC = { value: 'id', label: 'ten', apiUrl: this.urlToChuc, sort: { ma: 1 } };
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params.id;
        if (this.id === null || this.id === 'new') {
          this._initNew();
        } else {
          this._iniRead(this.id);
        }
      });
  }

  navigateBack(ev: any) {
    this.location.back();
    // this.router.navigate(['/qtht-nguoidung']);
  }

  save() {
    this._save(this.data);
  }

  add() {
    this._add();
  }

  update() {
    this.editMode = true;
   // this.getDanhMuc();
  }

  delete() {
    this._delete(this.data.UserId);
  }
  close() {
    this.router.navigate(['/qtht-nguoidung/list'], { replaceUrl: true });
  }
  getDanhMuc() {
    // this._getToChuc();
    this._getPhongBan();
    this._getNhom();
  }

  chonToChuc(to_chuc_id) {
    // Lấy danh sách phòng ban theo tổ chức
    this._getPhongBan();
  }

  private _save(obj: NguoiDung) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.loading = false;
          this.router.navigate(['/qtht-nguoidung/form/' + res.UserId], { replaceUrl: true });
          this.editMode = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    } else {
      this.service.update(this.data, this.id).subscribe(
        res => {
          this.data = res;
          this.editMode = false;
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _add() {
    this.router.navigate(['/qtht-nguoidung/form/new']);
  }

  private async _delete(id: string) {
    if (await this.behaviors.confirm({
      msg: 'Bạn có chắc chắn muốn xóa bản ghi này',
      size: '',
      type: 'danger'
    })) {
      this.loading = true;
      this.service.del(id).subscribe(
        res => {
          this.loading = false;
          this.router.navigate(['/qtht-nguoidung']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new NguoiDung();
    this.data.tai_khoan = '';
    this.data.mat_khau = '';
    this.data.email = '';
    this.editMode = true;
    this.getDanhMuc();
  }

  private _iniRead(id: string) {
    this.editMode = false;
    this._getById(id);
  }

  private _getById(id: string) {
    this.loading = true;
    this.service.getById(id)
      .subscribe(
        data => {
          this.data = data;
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        });
  }
  private _getPhongBan() {
    const to_chuc_id = this.data.to_chuc_id;
    if (to_chuc_id !== undefined && to_chuc_id !== null && to_chuc_id !== '') {
      this.commonService.getAll(this.urlPhongBan, 1, 0, {}, { to_chuc_id: to_chuc_id }, '')
        .subscribe(res => {
        },
          err => {
            console.log(err);
          });
    }
  }

  private _getNhom() {
    this.Nhoms = new Array<Nhom>();
    this.commonService.getAll(this.urlNhom, 1, 0, {}, {}, '')
      .subscribe(res => {
        this.Nhoms = res.data;
      },
        err => {
          console.log(err);
        });
  }

  searchTC() {
    this.optionTC.sort = { cap_don_vi: 1, ma: 1 };
  }
}
