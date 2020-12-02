import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../../app-common/app-common.service';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit, OnDestroy {
  @HostListener('scroll', ['$event'])
  @Input()
  hasNavBack = true;
  @Input() pageTitle: string;
  @Input() sideBar: Array<any>;
  @Input() noSubHeader = false;
  @Input() loading = false;
  @Output() emitNavigateBack = new EventEmitter<any>();
  @Output() emitScroll = new EventEmitter<any>();
  public sideBarByModule$: Observable<any>;
  isShow: boolean;
  topPosToStartShowing = 100;
  constructor(
    private location: Location,
    private store: Store<any>,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {
    this.commonService.setBackFormKeyBoard(back => {
      this.navigateBack();
    });
  }
  ngOnInit(): void {
    // this.sideBarByModule$ = this.store.pipe(
    //   select((state: any) => state.oauthReducer.dieu_huong_theo_module[this.route.snapshot.data.module]),
    //   map(sideBar => {
    //     sideBar = sideBar || [];
    //     this.sideBar = sideBar;
    //     return sideBar;
    //   }));
  }
  ngOnDestroy(): void {
    this.commonService.removeKeyBoard();
  }

  // function for output callback
  public navigateBack() {
    if (this.emitNavigateBack.observers.length > 0) {
      this.emitNavigateBack.emit();
    } else {
      this.location.back();
    }
  }

  divScroll(e) {
    const el = document.querySelector('div.form-content');
    const scrollPosition = el.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    this.emitScroll.emit(this.isShow);
  }
}
