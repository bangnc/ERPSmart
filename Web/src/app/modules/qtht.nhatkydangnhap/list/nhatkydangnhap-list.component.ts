import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoaiChucVuService } from '../nhatkydangnhap.service';
import { MetaStruct, PageOption, BehaviorsService, CommonService, PERMSConstant } from '../../../shared';
import { NhatKyDangNhap } from '../nhatkydangnhap';

@Component({
  selector: 'app-nhatkydangnhap-list[class="app-module-warp"]',
  templateUrl: './nhatkydangnhap-list.component.html',
  providers: [LoaiChucVuService]
})
export class NhatKyangNhapListComponent implements OnInit {

  data: Array<any>;
  url = 'api/qtht-nhatkydangnhap';
  urlNguoiDung = 'api/qtht-nguoidung';
  LoaiChucVus: Array<NhatKyDangNhap> = new Array<NhatKyDangNhap>();
  meta: MetaStruct;
  idx: any;
  pageOption = new PageOption();
  loading = false;
  optionNguoiDung = {
    value: 'id',
    label: 'ten',
    apiUrl: this.urlNguoiDung,
    sort: { ten: 1 },
    filter: { to_chuc_id: null }
  };

  HanhDongs = [
    {
      id: 'LogIn',
      name: 'Đăng nhập'
    },
    {
      id: 'LogOut',
      name: 'Đăng xuất'
    }
  ];

  constructor(
    private router: Router,
    private location: Location,
    public service: LoaiChucVuService,
    private commonService: CommonService,
    private behaviors: BehaviorsService,
  ) {
    this.data = new Array();
    this.optionNguoiDung = {
      value: 'id',
      label: 'ten',
      apiUrl: this.urlNguoiDung,
      sort: { ten: 1 },
      filter: { to_chuc_id: null }
    };
  }

  ngOnInit(): void {
    this.pageOption.filter = {};
    this.pageOption.search = '';
    this.pageOption.sort = { thoi_gian: -1 };
    this.commonService.initPageOption(this.router.url, (pageOption) => {
      this.pageOption = pageOption || this.pageOption;
      this.getMany();
    });

    // console.log(this.navigateBack);
    // this._getLoaiChucVu();
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

  showTime(time: Date) {
    return time.getUTCDate();
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
        this.pageOption.filter = { ten: '', ma: '', mo_ta: '' };
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
}
