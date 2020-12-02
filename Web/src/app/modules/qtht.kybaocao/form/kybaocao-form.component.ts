import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { KyBaoCao } from '../kybaocao';
import { KyBaoCaoService } from '../kybaocao.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-kybaocao-form[class="app-module-warp"]',
  styleUrls: ['./kybaocao-form.component.scss'],
  templateUrl: './kybaocao-form.component.html',
  providers: [KyBaoCaoService]
})
export class KyBaoCaoFormComponent implements OnInit {
  data: KyBaoCao = new KyBaoCao();
  id: string;
  editMode = false;
  kybaocao_url = 'api/modulecateg';

  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.KYBAOCAO_CAPNHAT,
    DELETE: PERMSConstant.QTHT.KYBAOCAO_XOA
  };

  validationMessages = {
    'ho_ten':
    {
      'required': 'Nhập thông tin Họ và tên.'
    },
    'to_chuc_id':
    {
      'required': 'Nhập thông tin Hội.'
    },
    'ngay_bao_cao':
    {
      'pattern': 'Ngày từ 1-31'
    },
    'thang_bao_cao':
    {
      'pattern': 'Tháng từ 1-12'
    },
    'ngay_bat_dau':
    {
      'pattern': 'Ngày từ 1-31'
    },
    'thang_bat_dau':
    {
      'pattern': 'Tháng từ 1-12'
    },
    'ngay_ket_thuc':
    {
      'pattern': 'Ngày từ 1-31'
    },
    'thang_ket_thuc':
    {
      'pattern': 'Tháng từ 1-12'
    },
    'nam':
    {
      'pattern': 'Năm từ 1-9999'
    }
  };
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: KyBaoCaoService,
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
    // this.router.navigate(['/dm-kybaocao']);
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

  private _save(obj: KyBaoCao) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.router.navigate(['/qtht-kybaocao/form/' + res.id], { replaceUrl: true });
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
    this.router.navigate(['/qtht-kybaocao/form/new']);
  }

  private async _delete(id: string) {
    if (await this.behaviors.confirm({
      msg: 'Bạn có chắc chắn muốn xóa bản ghi này',
      size: '',
      type: 'danger'
    })) {
      this.service.del(id).subscribe(
        res => {
          this.router.navigate(['/qtht-kybaocao']);
        },
        err => {
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new KyBaoCao();
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
