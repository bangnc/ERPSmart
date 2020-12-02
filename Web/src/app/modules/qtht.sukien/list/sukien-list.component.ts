import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SuKienService } from '../sukien.service';
import { MetaStruct, PageOption, BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';

@Component({
  selector: 'app-sukien-list[class="app-module-warp"]',
  templateUrl: './sukien-list.component.html',
  providers: [SuKienService]
})
export class SuKienListComponent implements OnInit {

  data: Array<any>;
  url = 'api/qtht-sukien';
  meta: MetaStruct;
  idx: any;
  pageOption = new PageOption();
  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.SUKIEN_CAPNHAT,
    DELETE: PERMSConstant.QTHT.SUKIEN_XOA
  };

  constructor(
    private router: Router,
    private location: Location,
    public service: SuKienService,
    private commonService: CommonService,
    private behaviors: BehaviorsService,
  ) {
    this.data = new Array();
    this.commonService.setAddViewKeyBoard(
      add => {
        if (AppConst.ChucNang.QTHT[this.perms.EDIT]) {
          this.create();
        }
      });
  }

  ngOnInit(): void {
    console.log(this.perms);
    this.pageOption.filter = { tieu_de: '', noi_dung: '', tinh_trang: 2};
    this.pageOption.search = '';
    this.commonService.initPageOption(this.router.url, (pageOption) => {
      this.pageOption = pageOption || this.pageOption;
      this.getMany();
    });

    // console.log(this.navigateBack);
  }

  // tslint:disable-next-line:member-ordering
  TinhTrangs = [
    { id: 2, ten: 'Tất cả' },
    { id: 1, ten: 'Hiển thị trang chủ' },
    { id: 0, ten: 'Ẩn' }
  ];

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

  create() {
    this.router.navigateByUrl('qtht-sukien/form/new');
  }

  showDetail(item) {
    this.router.navigateByUrl('qtht-sukien/form/' + item.id);
  }

  async delete(item) {
    if (await this.behaviors.confirm({
      msg: 'Bạn có chắc chắn muốn xóa bản ghi này',
      size: '',
      type: 'danger'
    })) {
      this.loading = true;
      this.commonService.del(this.url, item.id).subscribe(
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
}
