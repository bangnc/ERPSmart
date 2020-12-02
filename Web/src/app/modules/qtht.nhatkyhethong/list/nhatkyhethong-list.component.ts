import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NhatKyHeThongService } from '../nhatkyhethong.service';
import { MetaStruct, PageOption, BehaviorsService, CommonService, PERMSConstant, AppConst } from '../../../shared';


@Component({
  selector: 'app-nhatkyhethong-list[class="app-module-warp"]',
  templateUrl: './nhatkyhethong-list.component.html',
  providers: [NhatKyHeThongService]
})
export class NhatKyHeThongListComponent implements OnInit {

  data: Array<any>;
  url = 'api/qtht-nhatkyhethong';
  urlToChuc = 'api/tc-tochuc';
  meta: MetaStruct;
   idx: any;
  pageOption = new PageOption();
    loading = false;
  perms =  {
    EDIT: PERMSConstant.TC.PHONGBAN_CAPNHAT,
    DELETE: PERMSConstant.TC.PHONGBAN_XOA
  };
  ListAction: Array<any>;
  constructor(
    private router: Router,
    private location: Location,
    public service: NhatKyHeThongService,
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
    this.pageOption.filter = { to_chuc_id: null, ma: '', mo_ta: '' };
    this.pageOption.search = '';
    this.commonService.initPageOption(this.router.url, (pageOption) => {
      this.pageOption = pageOption || this.pageOption;
      this.getMany();
    });

    // this.getToChuc();
    this.service.getaction().subscribe((res) => {
      this.ListAction = res;
    });
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
        this.pageOption.filter = { to_chuc_id: null, ma: '', mo_ta: '' };
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
    this.router.navigateByUrl('tc-nhatkyhethong/form/new');
  }

  showDetail(item) {
    this.router.navigateByUrl('tc-nhatkyhethong/form/' + item.id);
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

  private async _delete(id: string) {
    if (await this.behaviors.confirm({
      msg: 'Bạn có chắc chắn muốn xóa bản ghi này',
      size: '',
      type: 'danger'
    })) {
      this.service.del(id).subscribe(
        res => {
          this.router.navigate(['/qtht-nhatkyhethong/list']);
        },
        err => {
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
  clickXemChiTiet(item) {
    this.router.navigate(['/qtht-nhatkyhethong/form/' + item.id]);
  }
  /*
  private getToChuc() {
    this.ToChucs = new Array<CoCauToChuc>();
    this.commonService.getAll(this.urlToChuc, 1, 0, {}, {}, '')
      .subscribe(res => {
        this.ToChucs = res.data;
      },
      err => {
        console.log(err);
      });
  }
  */
}
