import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChucNang } from '../chucnang';
import { ChucNangService } from './../chucnang.service';
import { LoaiChucNangService } from './../../qtht.loaichucnang/loaichucnang.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { Module } from '../../qtht.module/module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chucnang-form[class="app-module-warp"]',
  templateUrl: './chucnang-form.component.html',
  providers: [ChucNangService, LoaiChucNangService]
})
export class ChucNangFormComponent implements OnInit {

  data: ChucNang = new ChucNang();
  Modules: Array<Module> = new Array<Module>();
  ds_loaichucnang: Array<any> = new Array<any>();
  id: string;
  editMode = false;
  chucnang_url = 'api/qtht-chucnang';
  loaichucnang_url = 'api/qtht-loaichucnang';
  old_module_id: string;
  old_loai_chuc_nang_id: string;
  // urlLinhVucDaoTao = 'api/qtht-linhvucdaotao';
  urlModule = 'api/qtht-module';

  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.CHUCNANG_CAPNHAT,
    DELETE: PERMSConstant.QTHT.CHUCNANG_XOA
  };

  validationMessages = {
    'ten':
    {
      'required': 'Nhập thông tin tên chức năng.'
    },
    'ma':
    {
      'required': 'Nhập thông tin mã chức năng.'
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
    public service: ChucNangService,
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
    // this.router.navigate(['/qtht-chucnang']);
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
    this._getModule();
    this._getLoaiChucNang(this.data.module_id);
  }

  private _save(obj: ChucNang) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.loading = false;
          this.router.navigate(['/qtht-chucnang/form/' + res.id], { replaceUrl: true });
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
    this.router.navigate(['/qtht-chucnang/form/new']);
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
          this.router.navigate(['/qtht-chucnang']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new ChucNang();
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
          this.old_module_id = data.module_id;
          this.old_loai_chuc_nang_id = data.loai_chuc_nang_id;
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
  onChangeModule(module_id: string) {
    this._getLoaiChucNang(module_id);
  }
  private _getLoaiChucNang(module_id: string) {
    this.ds_loaichucnang = null;

    if (module_id != null) {
      let filter = {
        module_id: module_id
      };
      this.ds_loaichucnang = null;

      if (module_id !== this.old_module_id) {
        this.data.loai_chuc_nang_id = null;
        filter = {
          module_id: module_id
        };
      } else {
        this.data.loai_chuc_nang_id = this.old_loai_chuc_nang_id;
      }


      this.commonService.getAll(this.loaichucnang_url, 1, 0, {}, filter, '')
        .subscribe(res => {
          this.ds_loaichucnang = res.data;
        },
          err => {
            console.log(err);
          });

    }


  }
}
