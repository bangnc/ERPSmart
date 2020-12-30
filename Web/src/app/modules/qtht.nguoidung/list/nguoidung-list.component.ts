import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NguoiDungService } from '../nguoidung.service';
import { MetaStruct, PageOption, BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';

import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nguoidung-list[class="app-module-warp"]',
  templateUrl: './nguoidung-list.component.html',
  providers: [NguoiDungService]
})
export class NguoiDungListComponent implements OnInit {

  data: Array<any>;
  url = 'api/SystemUser';
  urlPhongBan = 'api/tc-phongban';
  urlToChuc = 'api/tc-tochuc?output_type=dm';
  meta: MetaStruct;
  idx: any;
  pageOption = new PageOption();
  loading = false;
  profile: any;
  optionPhongBanByHoi = {
    value: 'id', label: 'ten', apiUrl: this.urlPhongBan, sort: { ten: 1 }, filter: { to_chuc_id: null }
  };

  perms = {
    EDIT: PERMSConstant.QTHT.NGUOIDUNG_CAPNHAT,
    DELETE: PERMSConstant.QTHT.NGUOIDUNG_XOA
  };
  optionTC: any;

  constructor(
    private router: Router,
    private location: Location,
    public service: NguoiDungService,
    private commonService: CommonService,
    private behaviors: BehaviorsService,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.data = new Array();

    this.store
      .pipe(
        select((state: any) => state.oauthReducer.profile),
        map(profile => {
          this.profile = profile;
          console.log('this.profile', this.profile);
        })
      )
      .subscribe();

    this.commonService.setAddViewKeyBoard(
      add => {
        if (AppConst.ChucNang.QTHT[this.perms.EDIT]) {
          this.create();
        }
      });
    this.optionTC = { value: 'id', label: 'ten', apiUrl: this.urlToChuc, sort: { ma: 1 } };
  }

  ngOnInit(): void {
    this.pageOption.filter = {};
    this.pageOption.search = '';
    this.pageOption.sort = { FullName: 1 };
    this.commonService.initPageOption(this.router.url, (pageOption) => {
      this.pageOption = pageOption || this.pageOption;
      this.getMany();
    });
    // this.getToChuc();
  }

  getMany() {
    this.loading = true;
    this.commonService.getAll(this.url,
      this.pageOption.currentPage,
      this.pageOption.pageSize,
      this.pageOption.sort,
      this.pageOption.filter,
      this.pageOption.search).subscribe(res => {
        this.data = res.data;
        this.meta = res.meta;
        this.idx = (res.meta.page - 1) * (res.meta.page_size);
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }

  navigateBack(ev: any) {
    this.location.back();
  }

  papeOptionChange(ev) {
    switch (ev.name) {
      case 'search-change':
        this.pageOption.currentPage = 1;
        break;
      case 'filter-submmit':
        this.pageOption.currentPage = 1;
        break;
      case 'filter-remove':
        this.pageOption.currentPage = 1;
        this.pageOption.filter = {};
        break;
      default:
        this.pageOption = ev.data;
        break;
    }
    this.commonService.setPageOption(this.pageOption, this.router.url);
    this.getMany();
  }

  filter() {
    this.papeOptionChange({ name: 'filter-submmit' });
  }

  create() {
    this.router.navigateByUrl('qtht-nguoidung/form/new');
  }

  syncUser() {
    this.loading = true;
    this.service.syncUser().subscribe(
      res => {
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      });
  }

  showDetail(item) {
    this.router.navigateByUrl('qtht-nguoidung/form/' + item.id);
  }

  async delete(item) {
    if (await this.behaviors.confirm({
      msg: 'Bạn có chắc chắn muốn xóa bản ghi này',
      size: '',
      type: 'danger'
    })) {
      this.loading = true;
      this.commonService.del(this.url, item.UserId).subscribe(
        res => {
          this.getMany();
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  async deletes(itemSelected: Array<any>) {
    if (await this.behaviors.confirm({
      msg: 'Bạn có chắc chắn muốn xóa các bản ghi này',
      size: '',
      type: 'danger'
    })) {
      this.loading = true;
      this.commonService.dels(this.url, itemSelected.map(x => x.id)).subscribe(
        res => {
          this.getMany();
        },
        err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  searchTC() {
    this.optionTC.sort = {cap_don_vi: 1, ma: 1};
  }

  changeHoi() {
    this.pageOption.filter.phong_ban_id = null;
      if (this.pageOption.filter.to_chuc_id !== null) {
        this.optionPhongBanByHoi = {
          value: 'id',
          label: 'ten',
          apiUrl: this.urlPhongBan,
          sort: { ten: 1 },
          filter: { to_chuc_id: this.pageOption.filter.to_chuc_id }
        };
      } else {
        this.optionPhongBanByHoi = {
          value: 'id', label: 'ten', apiUrl: this.urlPhongBan, sort: { ten: 1 }, filter: { to_chuc_id: null }
        };
      }
  }
}
