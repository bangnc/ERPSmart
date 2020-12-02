import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  OnInit,
  ContentChild,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ColumnDirective,
  ActionBarDirective,
  FilterBarDirective,
  TableContentDirective,
  CreateInViewContentDirective,
  CustomContentDirective,
  TreeTCContentDirective
} from '../page-utils/page-utils.module';
import { MetaStruct, PageOption, ShowHideOption } from './page-list.interface';
import { map } from 'rxjs/operators';
import { CommonService } from '../../app-common/app-common.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() hasNavBack = true;
  @Input() pageTitle: string;
  @Input() data: Array<any>;
  @Input() keyExtractor: any;
  @Input() meta: MetaStruct = {
    page: 1,
    page_size: 20,
    ranger: {
      from: 1,
      to: 100
    },
    total: 100,
    total_page: 5
  };
  @Input() showHideOption: ShowHideOption = {
    showSearch: true, isFilterOpen: true, showActionBar: true, showIconFilter: true, showTable: true, showTreeTC: false
  };
  @Input() sideBar: Array<any>;
  @Input() pageOption: PageOption = new PageOption();
  @Input() noCheckBox = false;
  @Input() noSubHeader = false;
  @Input() loading = false;
  @Input() createInView = false;
  @Input() autofocus_search = true;
  @Input() search_option = false; // thêm trường hiển thị tìm kiếm: hội viên
  @Output() emitSearchOption = new EventEmitter<any>();

  @Output() emitNavigateBack = new EventEmitter<any>();
  @Output() emitChange = new EventEmitter<any>();
  @Output() emitRowDbClick = new EventEmitter<any>();
  @ContentChild(FilterBarDirective) filterBarTpl: FilterBarDirective;
  @ContentChild(ActionBarDirective) actionBarTpl: ActionBarDirective;
  @ContentChild(TableContentDirective) tableContentTpl: TableContentDirective;
  @ContentChild(CustomContentDirective) customContentTpl: TableContentDirective;
  @ContentChild(TreeTCContentDirective) tcTreeContentTpl: TableContentDirective;
  @ContentChild(CreateInViewContentDirective) createInViewContentTpl: CreateInViewContentDirective;
  @ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;
  @ViewChild('filterBar') filterBar: ElementRef;
  @ViewChild('tblBody') tblBody: ElementRef;
  public itemSelected: Array<any> = [];
  public pageSizes: Array<any> = [5, 10, 20, 30, 50, 100];
  public sideBarByModule$: Observable<any>;
  public hasKeySearch: boolean;
  public isFiltered = false;
  constructor(
    private location: Location,
    private store: Store<any>,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {
    this.commonService.setViewKeyBoard(
      filter => {
        this.filterSubmit();
      },
      clear => {
        this.filerRemove();
      },
      toggle => {
        this.toogleFilter();
      },
      back => {
        this.navigateBack();
      });
  }
  ngOnInit(): void {
    this.keyExtractor = this.keyExtractor || 'id';
    this.meta = this.meta || {
      page: 1,
      page_size: 20,
      ranger: {
        from: 0,
        to: 0
      },
      total: 0,
      total_page: 1
    };
    this.pageOption = this.pageOption || {
      currentPage: 1,
      pageSize: 20,
      sort: null,
      search: '',
      filter: {}
    };
    this.showHideOption = this.showHideOption || {
      showSearch: true,
      isFilterOpen: false,
      showActionBar: true,
      showIconFilter: true,
      showTable: true,
      showTreeTC: false
    };
  }

  ngOnDestroy(): void {
    this.commonService.removeKeyBoard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('data')) {
      if (changes.data.currentValue !== changes.data.previousValue) {
        this.itemSelected = changes.data.currentValue.filter(x => x.selected === true);
      }
    }
  }
  // function for output callback
  public navigateBack() {
    if (this.emitNavigateBack.observers.length > 0) {
      this.emitNavigateBack.emit();
    } else {
      this.location.back();
    }

  }
  public searchChange(val: string) {
    if (val) {
      val = val.trim();
    }
    this.pageOption.search = val;
    this.hasKeySearch = (!!val);
    this.emitChange.emit({ name: 'search-change', data: this.pageOption });
  }
  trimObjValues(obj) {
    Object.keys(obj).map(k => {
      if (obj[k] && typeof obj[k] === 'string') {
        obj[k] = obj[k].trim();
      }
    });
    return obj;
  }

  public filterSubmit() {
    this.pageOption.filter = this.trimObjValues(this.pageOption.filter);
    this.emitChange.emit({ name: 'filter-submmit', data: this.pageOption });
  }
  public filerRemove() {
    this.emitChange.emit({ name: 'filter-remove', data: this.pageOption });
  }
  public pageChange() {
    this.emitChange.emit({ name: 'page-change', data: this.pageOption });
  }
  public sortChange(_orderby: string, _name: string) {
    if (!_orderby) {
      return;
    }
    const tempSort = this.pageOption.sort[_orderby];
    switch (this.pageOption.sort[_orderby]) {
      case 1:
        this.pageOption.sort[_orderby] = -1;
        break;
      case -1:
        this.pageOption.sort[_orderby] = null;
        break;
      default:
        this.pageOption.sort = {};
        this.pageOption.sort[_orderby] = 1;
        break;
    }
    this.emitChange.emit({ name: 'sort-change', data: this.pageOption });
  }
  public pageSizeChange() {
    this.emitChange.emit({ name: 'page-size-change', data: this.pageOption });
  }
  public onRowDblclick(item: any) {
    this.emitRowDbClick.emit(item);
  }
  // bangnc
  public filterOption() {
    this.emitSearchOption.emit({ name: 'search-option', data: true });
  }

  public onRowKeydown(evKey: any, item: any) {
    switch (evKey.code) {
      case 'Enter':
        if (!(evKey.altKey || evKey.ctrlKey || evKey.shiftKey)) {
          this.emitRowDbClick.emit(item);
        }
        break;
      case 'Space':
        if (evKey.ctrlKey) {
          const checkboxItem = evKey.target.querySelector('input[type="checkbox"].check-item');
          checkboxItem.click();
        }
        break;
      case 'ArrowUp':
        const preEl = evKey.target.previousElementSibling;
        if (preEl) {
          preEl.focus();
        }
        evKey.preventDefault();
        break;
      case 'ArrowDown':
        const nextEl = evKey.target.nextElementSibling;
        if (nextEl) {
          nextEl.focus();
        }
        evKey.preventDefault();
        break;
      default:
        break;
    }
  }
  // function for output callback
  // view check
  getItemSelected() {
    return this.data.filter(x => x.selected === true);
  }
  isAllChecked() {
    return this.data.every(x => x.selected);
  }
  checkAll(event: any) {
    this.data.forEach(x => x.selected = event.target.checked);
    this.itemSelected = this.getItemSelected();
  }
  checkItem(event: any) {
    this.itemSelected = this.getItemSelected();
  }
  onCheckBoxClick(event: any) {
    event.stopPropagation();
  }
  // end view check
  // filter function
  toogleFilter() {
    // bangnc
    this.showHideOption.isFilterOpen = !this.showHideOption.isFilterOpen;
    if (this.showHideOption.isFilterOpen) {
      // xử lý focus vào input khi filter open
      const elFocus = this.filterBar.nativeElement.querySelectorAll('input.autofocus,textarea.autofocus');
      if (elFocus.length > 0) {
        setTimeout(() => {
          elFocus[0].focus();
        }, 0);
      }
    }
  }
  // end filter funtcion

  // sort function
  getHeaderClass(column) {
    const colClass = [];
    if (column.class) {
      colClass.push(column.class);
    }
    if (column.orderby) {
      colClass.push('sort');
      switch (this.pageOption.sort[column.orderby]) {
        case 1:
          colClass.push('ascending');
          break;
        case -1:
          colClass.push('descending');
          break;
      }
    }
    return colClass;
  }
  checkHasFilter(obj: any) {
    return Object.keys(obj).some(k => {
      if (typeof obj[k] === 'number') {
        return obj[k] != null;
      } else if (obj[k]) {
        return true;
      } else {
        return false;
      }
    });
  }
}
