import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Nhom } from '../nhom';
import { NhomService } from './../nhom.service';
import { BehaviorsService, CommonService, PageOption, PERMSConstant, AppConst, MetaStruct } from '../../../shared';
import { VaiTro } from '../../qtht.vaitro/vaitro';
import { NguoiDung } from '../../qtht.nguoidung/nguoidung';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NguoiDungModalComponent } from '../modal/nguoidung-modal.component';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nhom-form[class="app-module-warp"]',
  templateUrl: './nhom-form.component.html',
  providers: [NhomService]
})
export class NhomFormComponent implements OnInit {

  data: Nhom = new Nhom();
  VaiTros: Array<VaiTro> = new Array<VaiTro>();
  NguoiDungs: Array<NguoiDung> = new Array<NguoiDung>();
  ds_nguoi_dung_by_nhom: Array<NguoiDung> = new Array<NguoiDung>();
  pageOption: PageOption = new PageOption();
  id: string;
  editMode = false;
  nhom_url = 'api/modulecateg';
  urlVaiTro = 'api/qtht-vaitro';
  urlNguoiDung = 'api/qtht-nguoidung';
  urlNguoiDungByNhom = 'api/qtht-nguoidung/bynhom';
  isNhomHoiDongThiDua = false;
  loading = false;
  profile: any;
  meta: MetaStruct;
  idx: any;
  perms = {
    EDIT: PERMSConstant.QTHT.NHOM_CAPNHAT,
    DELETE: PERMSConstant.QTHT.NHOM_XOA
  };

  validationMessages = {
    'ten':
    {
      'required': 'Nhập thông tin tên nhóm.'
    },
    'ma':
    {
      'required': 'Nhập thông tin mã nhóm.'
    },
    'ds_vai_tro_id':
    {
      'required': 'Nhập thông tin vai trò.'
    }
  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: NhomService,
    private route: ActivatedRoute,
    private behaviors: BehaviorsService,
    private commonService: CommonService,
    private store: Store<any>,
    private modalService: NgbModal
  ) {
    this.store.pipe(select((state: any) => state.oauthReducer.profile),
        map(profile => {
          this.profile = profile;
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
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params.id;
        if (this.id === null || this.id === 'new') {
          this._initNew();
        } else {
          this._iniRead(this.id);
          this.GetNguoiDungByNhom(this.id);
        }
      });
  }

  navigateBack(ev: any) {
    this.location.back();
    // this.router.navigate(['/qtht-nhom']);
  }

  save() {
    this._save(this.data);
  }

  add() {
    this._add();
  }

  update() {
    this.editMode = true;
    this._getVaiTro();
  }

  delete() {
    this._delete(this.data.id);
  }

  private _save(obj: Nhom) {
    obj.ds_nguoi_dung_add = this.data.ds_nguoi_dung_add;
    obj.ds_nguoi_dung_remove = this.data.ds_nguoi_dung_remove;
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.GetNguoiDungByNhom(res.id);
          this.loading = false;
          this.router.navigate(['/qtht-nhom/form/' + res.id], { replaceUrl: true });
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
          this.GetNguoiDungByNhom(this.data.id);
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
    this.router.navigate(['/qtht-nhom/form/new']);
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
          this.router.navigate(['/qtht-nhom']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  async deleteNguoiDung(item: any) {
    if (await this.behaviors.confirm({
      msg: 'Bạn có chắc chắn muốn xóa bản ghi này',
      size: '',
      type: 'danger'
    })) {
      this.data.ds_nguoi_dung_remove = this.data.ds_nguoi_dung_remove || [];
      this.data.ds_nguoi_dung_add = this.data.ds_nguoi_dung_add || [];
      this.ds_nguoi_dung_by_nhom = this.ds_nguoi_dung_by_nhom.filter(x => x.id !== item.id);
      this.data.ds_nguoi_dung_remove.push(item);
      this.data.ds_nguoi_dung_add = this.data.ds_nguoi_dung_add.filter(x => x.id !== item.id);
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new Nhom();
    this.editMode = true;
    this._getVaiTro();
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
          if (this.data.ma === AppConst.NHOM.HOIDONG_TDKT) {
            this.isNhomHoiDongThiDua = true;
          }
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        });
  }

  private _getVaiTro() {
    this.VaiTros = new Array<VaiTro>();
    this.commonService.getAll(this.urlVaiTro, 1, 0, {}, {}, '')
      .subscribe(res => {
        this.VaiTros = res.data;
      },
        err => {
          console.log(err);
        });
  }

  showModal() {
    const tmp = this.modalService.open(NguoiDungModalComponent, { windowClass: 'modal-xl' });
    tmp.componentInstance.isNhomHDTDKT = this.isNhomHoiDongThiDua;
    tmp.componentInstance.toChucIdLogin = this.profile.to_chuc.id;
    tmp.result.then(res => {
      if (res) {
        this.ds_nguoi_dung_by_nhom = this.ds_nguoi_dung_by_nhom || [];
        this.data.ds_nguoi_dung_add = this.data.ds_nguoi_dung_add || [];
        this.data.ds_nguoi_dung_remove = this.data.ds_nguoi_dung_remove || [];
        if (this.ds_nguoi_dung_by_nhom !== null && this.ds_nguoi_dung_by_nhom !== undefined) {
          res.forEach(item => {
            const lst = this.ds_nguoi_dung_by_nhom.filter(x => x.id === item.id);
            if (typeof (lst) !== undefined && lst.length === 0) {
              this.ds_nguoi_dung_by_nhom.push(item);
              this.data.ds_nguoi_dung_add.push(item);
            }
          });
        } else {
          res.forEach(item => {
            this.ds_nguoi_dung_by_nhom.push(item);
            this.data.ds_nguoi_dung_add.push(item);
          });
        }
        // tslint:disable-next-line: max-line-length
        this.data.ds_nguoi_dung_remove = this.data.ds_nguoi_dung_remove.filter(x => !this.data.ds_nguoi_dung_add.map(z => z.id).includes(x.id));
      }
    });
  }

  papeOptionChange(ev) {
    switch (ev.name) {
      case 'search-change':
        this.pageOption.currentPage = 1;
        break;
      default:
        this.pageOption = ev.data;
        break;
    }
    this.GetNguoiDungByNhom(this.id);
  }

  GetNguoiDungByNhom(id) {
    this.loading = true;
    this.pageOption.filter = {
      'nhom_id': id
    };
    this.commonService.getAll(this.urlNguoiDung,
      this.pageOption.currentPage,
      this.pageOption.pageSize,
      this.pageOption.sort,
      this.pageOption.filter,
      this.pageOption.search).subscribe(res => {
        this.ds_nguoi_dung_by_nhom = res.data;
        this.meta = res.meta;
        this.idx = (res.meta.page - 1) * (res.meta.page_size);
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }

}
