import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaiKhoanTichHop } from '../taikhoantichhop';
import { TaiKhoanTichHopService } from '../taikhoantichhop.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-taikhoantichhop-form[class="app-module-warp"]',
  templateUrl: './taikhoantichhop-form.component.html',
  providers: [TaiKhoanTichHopService]
})
export class TaiKhoanTichHopFormComponent implements OnInit {

  data: TaiKhoanTichHop = new TaiKhoanTichHop();
  id: string;
  editMode = false;
  taikhoantichhop_url = 'api/modulecateg';

  loading = false;
  perms = {
    EDIT: PERMSConstant.DM.TONGIAO_CAPNHAT,
    DELETE: PERMSConstant.DM.TONGIAO_XOA
  };
  status = [
    { id: true, name: 'Kích hoạt' },
    { id: false, name: 'Khóa' }
  ];
  validationMessages = {
    'ma_he_thong':
    {
      'required': 'Nhập mã hệ thống'
    },
    'tai_khoan':
    {
      'required': 'Nhập tên tài khoản'
    },
    'ten_he_thong':
    {
      'required': 'Nhập tên hệ thống'
    }

  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: TaiKhoanTichHopService,
    private route: ActivatedRoute,
    private behaviors: BehaviorsService,
    private commonService: CommonService,
  ) {
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
    // this.router.navigate(['/qtht-taikhoantichhop']);
  }

  save() {
    this._save(this.data);
  }

  add() {
    this._add();
  }

  update() {
    this.editMode = true;
  }

  delete() {
    this._delete(this.data.id);
  }

  private _save(obj: TaiKhoanTichHop) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.router.navigate(['/qtht-taikhoantichhop/form/' + res.id], { replaceUrl: true });
          this.editMode = false;
          this.loading = false;
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
    this.router.navigate(['/qtht-taikhoantichhop/form/new']);
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
          this.router.navigate(['/qtht-taikhoantichhop']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new TaiKhoanTichHop();
    this.editMode = true;
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

}
