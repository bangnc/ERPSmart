import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NhatKyHeThong } from '../nhatkyhethong';
import { NhatKyHeThongService } from '../nhatkyhethong.service';
import { BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nhatkyhethong-form[class="app-module-warp"]',
  templateUrl: './nhatkyhethong-form.component.html',
  providers: [NhatKyHeThongService]
})
export class NhatKyHeThongFormComponent implements OnInit {

  data: NhatKyHeThong = new NhatKyHeThong();
  id: string;
  editMode = false;
  nhatkyhethong_url = 'api/modulecateg';

  loading = false;
  perms = {
    EDIT: PERMSConstant.DM.TONGIAO_CAPNHAT,
    DELETE: PERMSConstant.DM.TONGIAO_XOA
  };
  ban_ghi = [{
    key: '',
    value: ''
  }];
  validationMessages = {
    'ten':
    {
      'required': 'Nhập tên tôn giáo.'
    },
  };
  ListAction = [];
  @ViewChild('positionlForm') positionlForm: NgForm;
  constructor(
    private router: Router,
    private location: Location,
    public service: NhatKyHeThongService,
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
      this.service.getaction().subscribe((res) => {
        this.ListAction = res;
      });
  }

  navigateBack(ev: any) {
    this.location.back();
    // this.router.navigate(['/dm-nhatkyhethong']);
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

  private _save(obj: NhatKyHeThong) {
    this.loading = true;
    if (this.id === null || this.id === 'new') {
      this.service.create(obj).subscribe(
        res => {
          this.router.navigate(['/qtht-nhatkyhethong/form/' + res.id], { replaceUrl: true });
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
          this.loading = true;
          console.log(err);
        });
    }
  }

  private _add() {
    this.router.navigate(['/qtht-nhatkyhethong/form/new']);
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
          this.router.navigate(['/qtht-nhatkyhethong']);
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  private _initNew() {
    this.id = null;
    this.data = new NhatKyHeThong();
    this.editMode = true;
  }

  private _iniRead(id: string) {
    this.editMode = false;
    this._getById(id);
  }
  isObject(val) { return typeof val === 'object'; }
  private _getById(id: string) {
    this.loading = true;
    this.service.getById(id)
      .subscribe(
        data => {
          this.data = data;
          this.data.ban_ghi_json = JSON.parse(data.ban_ghi);
          for (const k in data.ban_ghi_json ) {
            if (data.ban_ghi_json.hasOwnProperty(k)) {
              this.ban_ghi.push({ key: k, value: data.ban_ghi_json[k] });
            }
          }

          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        });
  }
  isTypeAction(val) { return val !== 'delete'; }
  clickXemChiTiet(item) {
    switch (item.bang) {
      default: {
        break;
      }
      case 'hv_hoi_vien': {
        this.router.navigate(['/hv-hosohoivien/form/' + item.ban_ghi_id]);
        break;
      }
      case 'cb_can_bo': {
        // this.router.navigate(['/hv-hoivien/form/id=' + item.ban_ghi_id]);
        break;
      }
    }
  }

}
