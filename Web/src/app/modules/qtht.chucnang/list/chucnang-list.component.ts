import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChucNangService } from '../chucnang.service';
import { MetaStruct, PageOption, BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';
import { Module } from '../../qtht.module/module';

@Component({
  selector: 'app-chucnang-list[class="app-module-warp"]',
  templateUrl: './chucnang-list.component.html',
  providers: [ChucNangService]
})
export class ChucNangListComponent implements OnInit {

  data: Array<any>;
  Modules: Array<Module> = new Array<Module>();
  url = 'api/qtht-chucnang';
  urlModule = 'api/qtht-module';
  meta: MetaStruct;
  idx: any;
  pageOption = new PageOption();
  loading = false;
  perms = {
    EDIT: PERMSConstant.QTHT.CHUCNANG_CAPNHAT,
    DELETE: PERMSConstant.QTHT.CHUCNANG_XOA
  };

  constructor(
    private router: Router,
    private location: Location,
    public service: ChucNangService,
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
    this.pageOption.filter = { ma: '', ten: '', module: null };
    this.pageOption.sort = { 'module.so_thu_tu': 1, 'loai_chuc_nang.so_thu_tu': 1, 'so_thu_tu': 1 };
    this.pageOption.search = '';
    this.commonService.initPageOption(this.router.url, (pageOption) => {
      this.pageOption = pageOption || this.pageOption;
      this.getMany();
    });
    this.getModule();
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
        this.pageOption.filter = { ma: '', ten: '', module: null };
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
    this.router.navigateByUrl('qtht-chucnang/form/new');
  }

  showDetail(item) {
    this.router.navigateByUrl('qtht-chucnang/form/' + item.id);
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
  private getModule() {
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
