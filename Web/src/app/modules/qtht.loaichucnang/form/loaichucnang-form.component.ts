import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaiChucNang } from '../loaichucnang';
import { LoaiChucNangService } from '../loaichucnang.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { NgForm } from '@angular/forms';
import { Module } from '../../qtht.module/module';

@Component({
  selector: 'app-loaichucnang-form[class="app-module-warp"]',
  templateUrl: './loaichucnang-form.component.html',
  providers: [LoaiChucNangService]
})
export class LoaiChucNangFormComponent implements OnInit {

  data: LoaiChucNang = new LoaiChucNang();
  id: string;
  editMode = false;
  loaichucnang_url = 'api/modulecateg';
  Modules: Array<Module> = new Array<Module>();
  urlModule = 'api/qtht-module';
  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.LOAIMODULE_CAPNHAT,
    DELETE: PERMSConstant.QTHT.LOAIMODULE_XOA
  };

  validationMessages = {
    'ten':
    {
      'required': 'Nhập thông tin tên loại module.'
    },
    'ma':
    {
      'required': 'Nhập thông tin mã loại module.'
    },
    'module_id':
    {
      'required': 'Nhập thông tin module.'
    }
  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: LoaiChucNangService,
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
    // this.router.navigate(['/qtht-loaichucnang']);
  }

  save() {
    this._save(this.data);
  }

  add() {
    this._add();
  }

  update() {
    this.editMode = true;
    this._getModule();
  }

  delete() {
    this._delete(this.data.id);
  }

  private _save(obj: LoaiChucNang) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.loading = false;
          this.router.navigate(['/qtht-loaichucnang/form/' + res.id], { replaceUrl: true });
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
    this.router.navigate(['/qtht-loaichucnang/form/new']);
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
          this.router.navigate(['/qtht-loaichucnang']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new LoaiChucNang();
    this.editMode = true;
    this._getModule();
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
  private _getModule() {
    this.Modules = new Array<Module>();
    this.commonService.getAll(this.urlModule, 1, 0, {}, {}, '')
      .subscribe(res => {
        this.Modules = res.data;
      },
        err => {
          console.log(err);
        });
  }

}
