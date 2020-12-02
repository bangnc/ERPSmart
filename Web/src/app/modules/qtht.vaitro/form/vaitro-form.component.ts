import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VaiTro } from '../vaitro';
import { VaiTroService } from './../vaitro.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { Module } from '../../qtht.module/module';
import { DieuHuong } from '../../qtht.dieuhuong/dieuhuong';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-vaitro-form[class="app-module-warp"]',
  templateUrl: './vaitro-form.component.html',
  styleUrls: ['./vaitro-form.component.scss'],
  providers: [VaiTroService]
})
export class VaiTroFormComponent implements OnInit {

  data: VaiTro = new VaiTro();
  Modules: Array<Module> = new Array<Module>();
  DieuHuongs: Array<DieuHuong> = new Array<DieuHuong>();
  id: string;
  editMode = false;
  vaitro_url = 'api/modulecateg';
  urlModule = 'api/qtht-module/getall';
  urlDieuHuong = 'api/qtht-dieuhuong';

  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.VAITRO_CAPNHAT,
    DELETE: PERMSConstant.QTHT.VAITRO_XOA
  };

  validationMessages = {
    'ten':
    {
      'required': 'Nhập thông tin tên vai trò.'
    },
    'ma':
    {
      'required': 'Nhập thông tin mã vai trò.'
    }
  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: VaiTroService,
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
        this.getDanhMuc();
      });
  }

  navigateBack(ev: any) {
    this.location.back();
    // this.router.navigate(['/qtht-vaitro']);
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

  getDanhMuc() {
    this._getModule();
  }

  chonModule(event, itemModule) {
    if (event.target.checked) {

      itemModule.ds_dieu_huong = itemModule.ds_dieu_huong || [];
      this.data.ds_dieu_huong_id = this.data.ds_dieu_huong_id.concat(itemModule.ds_dieu_huong.map(x => x.id));
    } else {
      const temp = itemModule.ds_dieu_huong.map(x => x.id);
      this.data.ds_dieu_huong_id = this.data.ds_dieu_huong_id.filter(x => temp.every(y => y !== x));
    }
  }

  chonModuleForChucNang(event, itemModule) {
    if (event.target.checked) {
      this.data.ds_loai_chuc_nang_id = this.data.ds_loai_chuc_nang_id || [];
      itemModule.ds_loai_chuc_nang = itemModule.ds_loai_chuc_nang || [];
      this.data.ds_loai_chuc_nang_id = this.data.ds_loai_chuc_nang_id.concat(itemModule.ds_loai_chuc_nang.map(x => x.id));

      this.data.ds_chuc_nang_id = this.data.ds_chuc_nang_id || [];
      itemModule.ds_loai_chuc_nang.forEach(item => {
        this.data.ds_chuc_nang_id = this.data.ds_chuc_nang_id.concat(item.ds_chuc_nang.map(y => y.id));
      });

    } else {
      const temp = itemModule.ds_loai_chuc_nang.map(x => x.id);
      this.data.ds_loai_chuc_nang_id = this.data.ds_loai_chuc_nang_id.filter(x => temp.every(y => y !== x));

      // bỏ chọn all ds_chuc_nang_id
      let temp_ds_chucnang = [];
      const temp2 = itemModule.ds_loai_chuc_nang.forEach(element => {
        temp_ds_chucnang = temp_ds_chucnang.concat(element.ds_chuc_nang.map(y => y.id));
      });
      this.data.ds_chuc_nang_id = this.data.ds_chuc_nang_id.filter(x => temp_ds_chucnang.every(y => y !== x));
      // const temp2 = itemModule.ds_chuc_nang_id.map(x => x.id);
      // this.data.ds_chuc_nang_id = this.data.ds_chuc_nang_id.filter(x => temp2.every(y => y !== x));
    }
  }

  chonDieuHuong(event, itemModule) {
    if (event.target.checked) {
      if (this.data.ds_module_dieu_huong_id.every(x => x !== itemModule.id)) {
        this.data.ds_module_dieu_huong_id = this.data.ds_module_dieu_huong_id.concat(itemModule.id);
      }
    } else {
      const temp = itemModule.ds_dieu_huong.map(x => x.id);
      console.log(temp);
      let temp2 = false;
      temp.forEach(element => {
        if (this.data.ds_dieu_huong_id.indexOf(element) !== -1) {
          temp2 = true;
        }
      });
      if (!temp2 || this.data.ds_dieu_huong_id.length === 0) {
        this.data.ds_module_dieu_huong_id = this.data.ds_module_dieu_huong_id.filter(x => itemModule.id !== x);
      }
    }
  }
  chonLoaiChucNang(event, itemModule, itemLCN) {
    if (event.target.checked) {
      if (this.data.ds_module_chuc_nang_id.every(x => x !== itemModule.id)) {
        this.data.ds_module_chuc_nang_id = this.data.ds_module_chuc_nang_id.concat(itemModule.id);
      }
      // selected all chuc nang
      itemLCN.ds_loai_chuc_nang = itemLCN.ds_loai_chuc_nang || [];
      this.data.ds_chuc_nang_id = this.data.ds_chuc_nang_id.concat(itemLCN.ds_chuc_nang.map(x => x.id));

    } else {
      // remove seleceted module
      const temp = itemModule.ds_loai_chuc_nang.map(x => x.id);
      let temp2 = false;
      temp.forEach(element => {
        if (this.data.ds_loai_chuc_nang_id.indexOf(element) !== -1) {
          temp2 = true;
        }
      });
      if (!temp2 || this.data.ds_loai_chuc_nang_id.length === 0) {
        this.data.ds_module_chuc_nang_id = this.data.ds_module_chuc_nang_id.filter(x => itemModule.id !== x);
      }

      // remove all seleceted chuc nang
      const templcn = itemLCN.ds_chuc_nang.map(x => x.id);
      this.data.ds_chuc_nang_id = this.data.ds_chuc_nang_id.filter(x => templcn.every(y => y !== x));
    }
  }

  chonChucNang(event, itemModule, itemLCN) {
    if (event.target.checked) {
      this.data.ds_loai_chuc_nang_id = this.data.ds_loai_chuc_nang_id || [];
      if (this.data.ds_module_chuc_nang_id.every(x => x !== itemModule.id)) {
        this.data.ds_module_chuc_nang_id = this.data.ds_module_chuc_nang_id.concat(itemModule.id);
      }
      if (this.data.ds_loai_chuc_nang_id.every(x => x !== itemLCN.id)) {
        this.data.ds_loai_chuc_nang_id = this.data.ds_loai_chuc_nang_id.concat(itemLCN.id);
      }

    } else {
      const temp = itemLCN.ds_chuc_nang.map(x => x.id);

      let temp2 = false;
      temp.forEach(element => {
        if (this.data.ds_chuc_nang_id.indexOf(element) !== -1) {
          temp2 = true;
        }
      });
      if (!temp2 || this.data.ds_chuc_nang_id.length === 0) {
        this.data.ds_loai_chuc_nang_id = this.data.ds_loai_chuc_nang_id.filter(x => itemLCN.id !== x);
        this.data.ds_module_chuc_nang_id = this.data.ds_module_chuc_nang_id.filter(x => itemModule.id !== x);
      }

    }
  }

  toggleItem(obj: any) {
    obj.visible = !obj.visible;
  }
  expandNav() {
    this.Modules.forEach(modul => {
      modul.visible = false;
    });
  }
  collapseNav() {
    this.Modules.forEach(modul => {
      modul.visible = true;
    });
  }

  expandModule() {
    this.Modules.forEach(modul => {
      modul.visible = false;
      modul.ds_loai_chuc_nang.forEach(loai => {
        loai.visible = true;
      });
    });
  }
  collapseModule() {
    this.Modules.forEach(modul => {
      modul.visible = true;
      modul.ds_loai_chuc_nang.forEach(loai => {
        loai.visible = false;
      });
    });
  }

  private _save(obj: VaiTro) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.loading = false;
          this.router.navigate(['/qtht-vaitro/form/' + res.id], { replaceUrl: true });
          this.editMode = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    } else {
      this.service.update(this.data, this.id).subscribe(
        res => {
          // this.data = res;
          this.router.navigate(['/qtht-vaitro/form/' + res.id], { replaceUrl: true });
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
    this.router.navigate(['/qtht-vaitro/form/new']);
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
          this.router.navigate(['/qtht-vaitro']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new VaiTro();
    this.editMode = true;
  }

  private _iniRead(id: string) {
    this.editMode = false;
    this._getById(id);
  }

  private _getById(id: string) {
    this.loading = true;
    // lay danh sach module
    const getAllModule = this.service.getAllModule(this.urlModule);
    const getInfoVaiTro = this.service.getById(id);
    // lay thong tin vai tro
    forkJoin([getAllModule, getInfoVaiTro]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld
      this.Modules = results[0].data;

      this.data = results[1];
      this.data.ds_module_chuc_nang_id = this.data.ds_module_chuc_nang_id || [];
      this.data.ds_loai_chuc_nang_id = this.data.ds_loai_chuc_nang_id || [];
      //
      this.Modules.forEach(modul => {
        let flagModule = false;

        modul.ds_loai_chuc_nang.forEach(loai => {
          const flag = loai.ds_chuc_nang.filter(x => this.data.ds_chuc_nang_id.includes(x.id)).length > 0;

          if (flag) {
            this.data.ds_loai_chuc_nang_id.push(loai.id);
            flagModule = true;
          }

        });
        if (flagModule) {

          this.data.ds_module_chuc_nang_id.push(modul.id);
        }
      });
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  private _getModule() {
    this.Modules = new Array<Module>();
    this.service.getAllModule(this.urlModule)
      .subscribe(res => {
        this.Modules = res.data;
        this.Modules.forEach(modul => {
          modul.visible = true;
          modul.ds_loai_chuc_nang.forEach(loai => {
            loai.visible = false;
          });
        });
      },
        err => {
          console.log(err);
        });
  }

}
