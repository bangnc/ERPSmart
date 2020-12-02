import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from '../module';
import { ModuleService } from './../module.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { LoaiModule } from '../../qtht.loaimodule/loaimodule';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-module-form[class="app-module-warp"]',
  templateUrl: './module-form.component.html',
  providers: [ModuleService]
})
export class ModuleFormComponent implements OnInit {

  data: Module = new Module();
  LoaiModules: Array<LoaiModule> = new Array<LoaiModule>();
  id: string;
  editMode = false;
  module_url = 'api/modulecateg';
  urlLoaiModule = 'api/qtht-loaimodule';

  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.MODULE_CAPNHAT,
    DELETE: PERMSConstant.QTHT.MODULE_XOA
  };

  validationMessages = {
    'ten':
    {
      'required': 'Nhập thông tin tên module.'
    },
    'ma':
    {
      'required': 'Nhập thông tin mã module.'
    },
    'loai_module_id':
    {
      'required': 'Nhập thông tin loại module.'
    }
  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: ModuleService,
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
    // this.router.navigate(['/qtht-module']);
  }

  save() {
    this._save(this.data);
  }

  add() {
    this._add();
  }

  update() {
    this.editMode = true;
    // Lấy danh sách danh mục
    this.getDanhMuc();
  }

  delete() {
    this._delete(this.data.id);
  }

  getDanhMuc() {
    this._getLoaiModule();
  }

  private _save(obj: Module) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.loading = false;
          this.router.navigate(['/qtht-module/form/' + res.id], { replaceUrl: true });
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
    this.router.navigate(['/qtht-module/form/new']);
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
          this.router.navigate(['/qtht-module']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new Module();
    this.editMode = true;

    // Lấy danh sách danh mục
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

  private _getLoaiModule() {
    this.LoaiModules = new Array<LoaiModule>();
    this.commonService.getAll(this.urlLoaiModule, 1, 0, {}, {}, '')
      .subscribe(res => {
        this.LoaiModules = res.data;
      },
        err => {
          console.log(err);
        });
  }
}
