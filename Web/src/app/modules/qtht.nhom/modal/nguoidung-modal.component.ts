import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MetaStruct, PageOption, CommonService } from '../../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chucvu-canbo-modal',
  templateUrl: './nguoidung-modal.component.html',
  styleUrls: ['./nguoidung-modal.component.scss'],
})
export class NguoiDungModalComponent implements OnInit {

  dataNguoiDung: Array<any>;
  url = 'api/qtht-nguoidung';
  urlToChuc = 'api/tc-tochuc?output_type=dm';
  urlPhongBan = 'api/tc-phongban';
  meta: MetaStruct;
  pageOption: PageOption = new PageOption();
  @ViewChild('btnSelect') btnSelect: ElementRef;
  idex: any;
  loading = false;
  @Input() isNhomHDTDKT: boolean;
  @Input() toChucIdLogin: string;

  optionPBCapDuoi = {
    value: 'id',
    label: 'ten',
    apiUrl: this.urlPhongBan,
    sort: { ten_day_du: 1 },
    filter: { to_chuc_id: null }
  };

  constructor(
    private location: Location,
    private commonService: CommonService,
    public activeModal: NgbActiveModal,
  ) {
    this.dataNguoiDung = new Array();
  }

  ngOnInit(): void {
    if (this.isNhomHDTDKT === true) {
      this.pageOption.filter = {
        cap_to_chuc_hoi: 1,
        ten: null,
        to_chuc_id: null,
        phong_ban_id: null
      };
    } else {
      this.pageOption.filter = {
        cap_to_chuc_hoi: null,
        ten: null,
        to_chuc_id: null,
        phong_ban_id: null
      };
    }

    this.pageOption.sort = { ten: 1 };
    this.pageOption.search = '';
    this.getMany();
  }

  navigateBack(ev: any) {
    this.location.back();
  }

  getMany() {
    this.loading = true;
    this.commonService.getAll(this.url,
      this.pageOption.currentPage,
      this.pageOption.pageSize,
      this.pageOption.sort,
      this.pageOption.filter,
      this.pageOption.search).subscribe(res => {
        this.dataNguoiDung = res.data;
        this.meta = res.meta;
        this.idex = (res.meta.page - 1) * (res.meta.page_size);
        this.loading = false;
      },
        err => {
          this.loading = false;
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
    this.getMany();
  }

  selectCanBo(itemSelected) {
    this.activeModal.close(itemSelected);
  }

  clickBtnSelect() {
    this.btnSelect.nativeElement.click();
  }

  changeToChucHoi() {
    if (this.pageOption.filter.to_chuc_id !== null && this.pageOption.filter.to_chuc_id !== undefined) {
      this.optionPBCapDuoi = {
        value: 'id',
        label: 'ten',
        apiUrl: this.urlPhongBan,
        sort: { ten_day_du: 1 },
        filter: { to_chuc_id: this.pageOption.filter.to_chuc_id }
      };
    } else {
      this.optionPBCapDuoi = {
        value: 'id',
        label: 'ten',
        apiUrl: this.urlPhongBan,
        sort: { ten_day_du: 1 },
        filter: { to_chuc_id: this.pageOption.filter.to_chuc_id }
      };
    }
  }

  search() {
    this.getMany();
  }

  clearSearch() {
    if (this.isNhomHDTDKT === true) {
      this.pageOption.filter = {
        cap_to_chuc_hoi: 1,
        ten: null,
        to_chuc_id: null,
        phong_ban_id: null
      };
    } else {
      this.pageOption.filter = {
        cap_to_chuc_hoi: null,
        ten: null,
        to_chuc_id: null,
        phong_ban_id: null
      };
    }
    this.pageOption.sort = { ten: 1 };
    this.pageOption.search = '';

    this.optionPBCapDuoi = {
      value: 'id',
      label: 'ten',
      apiUrl: this.urlPhongBan,
      sort: { ten_day_du: 1 },
      filter: { to_chuc_id: null }
    };

    this.getMany();
  }

}
