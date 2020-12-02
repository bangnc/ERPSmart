import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DieuHuong } from '../dieuhuong';
import { DieuHuongService } from './../dieuhuong.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { Module } from '../../qtht.module/module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dieuhuong-form[class="app-module-warp"]',
  templateUrl: './dieuhuong-form.component.html',
  providers: [DieuHuongService]
})
export class DieuHuongFormComponent implements OnInit {

  data: DieuHuong = new DieuHuong();
  Modules: Array<Module> = new Array<Module>();
  id: string;
  editMode = false;
  dieuhuong_url = 'api/modulecateg';
  urlLinhVucDaoTao = 'api/qtht-linhvucdaotao';
  urlModule = 'api/qtht-module';

  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.DIEUHUONG_CAPNHAT,
    DELETE: PERMSConstant.QTHT.DIEUHUONG_XOA
  };

  validationMessages = {
    'ten':
    {
      'required': 'Nhập thông tin tên điều hướng.'
    },
    'ma':
    {
      'required': 'Nhập thông tin mã điều hướng.'
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
    public service: DieuHuongService,
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
    // this.router.navigate(['/qtht-dieuhuong']);
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
  }

  private _save(obj: DieuHuong) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.loading = false;
          this.router.navigate(['/qtht-dieuhuong/form/' + res.id], { replaceUrl: true });
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
    this.router.navigate(['/qtht-dieuhuong/form/new']);
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
          this.router.navigate(['/qtht-dieuhuong']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new DieuHuong();
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
