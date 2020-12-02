
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { CommonService } from '../../shared';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-unauthorized[class="app-module-warp"]',
    templateUrl: './unauthorized.component.html'    ,
    styleUrls: ['./unauthorized.component.scss'],
  })
  export class UnauthorizedComponent implements OnInit {
    public strTenHoi: string;
    public loading: boolean;
    constructor(
        private store: Store<any>,
        private commonService: CommonService,
      ) {
        this.store.pipe(
          select((state: any) => state.oauthReducer),
          map(oauth => {
            const profile = oauth.profile;
            if (profile && profile.to_chuc) {
              this.commonService.getTenToChucCapTren(profile.to_chuc.id)
            .subscribe(
              data => {
                this.strTenHoi = 'HỆ THỐNG QUẢN LÝ CÁN BỘ, HỘI VIÊN ' + data;
              },
              err => {
                console.log(err);
              });
            }
          })).subscribe();
      }

    ngOnInit(): void {

    }
}
