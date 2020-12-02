import { Component, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
const colors = ['#4285F4', '#00C851', '#FF8800'];
@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {

  public navName = 'Apps';
  public dieu_huong$: Observable<any>;
  public isModuleOpened = false;
  public moduleOpen: any;
  @Output() emitClose = new EventEmitter<string>();
  constructor(
    private store: Store<any>,
  ) {
    // this.data = JSON.parse(localStorage.getItem('module'));
    this.dieu_huong$ = this.store.pipe(select((state: any) => state.oauthReducer.dieu_huong));
  }

  closeNav() {
    this.emitClose.emit(this.navName);
  }
  getIconClass(item: any) {
    if (item.icon) {
      return `${item.icon}`;
    } else {
      switch(item.ten.trim().substr(0, 1).toLowerCase()){
        case 'đ':
          return 'mdi mdi-alpha-d-box-outline';
        case 'ê':
          return 'mdi mdi-alpha-e-box-outline';
        case 'ô':
          return 'mdi mdi-alpha-o-box-outline';
        case 'ơ':
          return 'mdi mdi-alpha-o-box-outline';
        case 'â':
          return 'mdi mdi-alpha-a-box-outline';
        case 'ă':
          return 'mdi mdi-alpha-a-box-outline';
        default:
          return `mdi mdi-alpha-${item.ten.trim().substr(0, 1).toLowerCase()}-box-outline`;
      }
    }
  }
  openModule(_module) {
    if (_module.ds_dieu_huong.length > 0) {
      this.isModuleOpened = true;
      this.moduleOpen = _module;
    }

  }
  closeModule() {
    this.isModuleOpened = false;
  }
}
