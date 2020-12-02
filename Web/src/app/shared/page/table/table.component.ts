import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  OnInit,
  ContentChild
} from '@angular/core';
import { ColumnDirective, ActionBarDirective, CreateInViewContentDirective } from '../page-utils/page-utils.module';
import { MetaStruct, PageOption } from './table.interface';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() hasMeta = true;
  @Input() hasCheckBox = true;
  @Input() hasActionBar = true;
  @Input() hasSearchBar = false;
  @Input() idCheckBox: string;
  @Input() data: Array<any>;
  @Input() keyExtractor: any;
  @Input() loading = false;
  @Input() showHeader = true;
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
  @Input() pageOption: PageOption = new PageOption();
  @Input() createInView = false;
  @Output() emitChange = new EventEmitter<any>();
  // bangnc khi double click item. Sự kiện thực hiện khi isDataDouble = true. mặc định ko có sự kiện
  @Output() emitDataDouble = new EventEmitter<any>();
  @Input() isDataDouble = false;
  //
  @Input() autofocus_search = true;
  @Input() isSelecOne = false;
  @ContentChild(ActionBarDirective) actionBarTpl: ActionBarDirective;
  @ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;
  @ContentChild(CreateInViewContentDirective) createInViewContentTpl: CreateInViewContentDirective;
  public itemSelected: Array<any> = [];
  public pageSizes: Array<any> = [5, 10, 20, 30, 50, 100];
  constructor() {

  }
  ngOnInit(): void {
    this.data = this.data || [];
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
    this.idCheckBox = this.idCheckBox || 'check-all-list';
  }
  // function for output callback
  public searchChange(val: string) {
    this.itemSelected = [];
    this.pageOption.search = val;
    this.emitChange.emit({ name: 'search-change', data: this.pageOption });
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
    if (this.isSelecOne === true && this.itemSelected.length === 1) {
      this.data.map(x => x.selected = false);
      event.selected = true;
    }
    this.itemSelected = this.getItemSelected();
  }
   /***
    * sự kiện double click khi isDataDouble = true
    *
    * author: bangnc
    */
  doubleClick(item: any) {
    if (this.isDataDouble) {
      this.emitDataDouble.emit({ name: 'data-double-click', data: item });
    }
  }
  // end view check

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

}
