import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SuKien } from '../sukien';
import { SuKienService } from '../sukien.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sukien-form[class="app-module-warp"]',
  templateUrl: './sukien-form.component.html',
  providers: [SuKienService]
})
export class SuKienFormComponent implements OnInit {

  data: SuKien = new SuKien();
  id: string;
  editMode = false;
  thongbao_url = 'api/modulecateg';
  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.SUKIEN_CAPNHAT,
    DELETE: PERMSConstant.QTHT.SUKIEN_XOA
  };


  validationMessages = {
    'tieu_de':
    {
      'required': 'Nhập thông tin tiêu đề.'
    },
    'noi_dung':
    {
      'required': 'Nhập thông tin nội dung.'
    }
  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: SuKienService,
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
    // this.router.navigate(['/dm-chucvu']);
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

  private _save(obj: SuKien) {
    if (obj.tinh_trang) {
      obj.tinh_trang = 1;
    } else {
      obj.tinh_trang = 0;
    }
    this.loading = true;
    // obj.phan_loai = obj.phan_loai === true ? 1 : 0;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.router.navigate(['/qtht-sukien/form/' + res.id], { replaceUrl: true });
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
          console.log(err);
        });
    }
  }

  private _add() {
    this.router.navigate(['/qtht-sukien/form/new']);
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
          this.router.navigate(['/qtht-sukien']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new SuKien();
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
