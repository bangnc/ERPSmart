import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MetaStruct, AuthenticationService } from '../shared';
import { NotificationService } from './notification/notification.service';
import { HttpClient } from '@angular/common/http';
// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppConst } from '../shared';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private subscriptionOfNotify: any;
  public navActived: string;
  public notifications: {
    meta: MetaStruct,
    data: Array<any>
  } = {
      meta: new MetaStruct(),
      data: []
    };
  // public cauHinhHeThong$: Observable<any>;
  public unread: any;
  @HostBinding('attr.class') appLayoutClass = '';

  constructor(
    private http: HttpClient,
    // private signalrService: SignalrService,
    private notificationService: NotificationService,
    // private store: Store<any>,
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<any>,
  ) {
    // this.currentUser$ = this.store.pipe(select('oauthReducer'));
    this.store.pipe(select((state: any) => state.oauthReducer), map(oauth => {
      AppConst.ChucNang = oauth.chuc_nang;
    })).subscribe();
  }

  ngOnInit(): void {
    // lấy thông tin app-init
    this.appInit();
    // khởi tạo kết nối thông báo cập nhật.
    // this.signalrService.initialize();
    // lấy danh sách thông báo
    /*
    this.refeshNofitication();
    this.subscriptionOfNotify = this.signalrService.onNotify.subscribe(res => {
      this.refeshNofitication();
    });*/
  }
  ngOnDestroy() {
    // this.signalrService.stopConnection();
    // this.subscriptionOfNotify.unsubscribe();
  }
  refeshNofitication() {
    this.notificationService.getMineNotifies().subscribe(data => {
      this.notifications = data;
      const unread = data.data.filter(x => x.states === 0).length;
      this.unread = unread > 0 ? unread : '';
    });
  }
  openNav(navName) {
    this.appLayoutClass = 'nav-open';
    this.navActived = navName;
  }
  closeNav() {
    this.appLayoutClass = '';
    this.navActived = '';
  }
  toggleNavItem(navName: string) {
    if (this.navActived === navName) {
      this.closeNav();
    } else {
      this.openNav(navName);
    }
  }
  appInit() {
    if (!this.KiemTraXuLyTinhTrangLogin()) {
      return false;
    }
    window.addEventListener('storage', (ev) => {
      if (ev.key === 'oauthReducer') {
        if (!this.authenticationService.checkIsLogin()) {
              const returnUrl = this.router.url;
              this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
        }
      }
    }, false);
    // this.cauHinhHeThong$ = this.http.get<any>('api/qtht-cauhinhhethong');
    // this.cauHinhHeThong$.pipe(map(res => {
    //   const data = res.data;
    //   AppConst.LinhVucDaoTao.LyLuanChinhTri = this.GetCHHT(data, 'LyLuanChinhTri');
    //   AppConst.LinhVucDaoTao.NghiepVuCongTacHoi = this.GetCHHT(data, 'NghiepVuCongTacHoi');
    //   AppConst.LinhVucDaoTao.TinHoc = this.GetCHHT(data, 'TinHoc');
    //   AppConst.LinhVucDaoTao.GiaoDucPhoThong = this.GetCHHT(data, 'GiaoDucPhoThong');
    //   AppConst.LinhVucDaoTao.QuanLyNhaNuoc = this.GetCHHT(data, 'QuanLyNhaNuoc');
    //   AppConst.LinhVucDaoTao.ChuyenMon = this.GetCHHT(data, 'ChuyenMon');
    //   AppConst.LinhVucDaoTao.NgoaiNgu = this.GetCHHT(data, 'NgoaiNgu');
    //   AppConst.LOAICHUCVU.BCH_HOI = this.GetCHHT(data, 'ChucVuTrongBCHHoi');
    //   AppConst.LOAICHUCVU.CHUTICH_HLHPN = this.GetCHHT(data, 'ChuTichHoiLienHiepPhuNu');
    //   AppConst.LOAICHUCVU.UYVIEN_BCH = this.GetCHHT(data, 'UyVienBanChapHanh');
    //   AppConst.LOAICHUCVU.CHUCDANHTRONGDANG = this.GetCHHT(data, 'ChucDanhTrongDang');
    //   AppConst.LOAICHUCVU.MATTRANTOQUOC = this.GetCHHT(data, 'MatTranToQuoc');
    //   AppConst.LOAICHUCVU.CHINHQUYEN = this.GetCHHT(data, 'ChinhQuyen');
    //   AppConst.TOCHUC.DONVIDACTHU = this.GetCHHT(data, 'TOCHUC_DONVIDACTHU');
    //   AppConst.TOCHUC.DACTHU = this.GetCHHT(data, 'DONVIDACTHU');
    //   AppConst.TOCHUC.BANNUCONG = this.GetCHHT(data, 'BanNuCong');
    //   AppConst.TOCHUC.HOIVIENTHEODANCU = this.GetCHHT(data, 'HOIVIENTHEODANCU');
    //   AppConst.CHUCVU.ChuTichHoiLHPNXa = this.GetCHHT(data, 'ChuTichHoiLHPNXa');
    //   AppConst.DanToc.Khac = this.GetCHHT(data, 'DanTocKhac');
    //   AppConst.DanToc.Kinh = this.GetCHHT(data, 'DanTocKinh');
    //   AppConst.NHOM.HOIDONG_TDKT = this.GetCHHT(data, 'HoiDongThiDuaKhenThuong');
    //   AppConst.TDKT.NHIEMKY_DAUNAM = this.GetCHHT(data, 'NHIEMKY_DAUNAM') || AppConst.TDKT.NHIEMKY_DAUNAM;

    //   AppConst.CHUCVU.HDND_TINH = this.GetCHHT(data, 'DAIBIEU_HDND_TINH');
    //   AppConst.CHUCVU.HDND_HUYEN = this.GetCHHT(data, 'DAIBIEU_HDND_HUYEN');
    //   AppConst.CHUCVU.HDND_XA = this.GetCHHT(data, 'DAIBIEU_HDND_XA');

    //   AppConst.CHUCVU.BCH_TINH = this.GetCHHT(data, 'UYVIEN_BCH_DANG_TINH');
    //   AppConst.CHUCVU.BCH_HUYEN = this.GetCHHT(data, 'UYVIEN_BCH_DANG_HUYEN');
    //   AppConst.CHUCVU.BCH_XA = this.GetCHHT(data, 'UYVIEN_BCH_DANG_XA');
    //   AppConst.LOAICHUCVU.CT_PCT_UVBTV_UVBCH = this.GetCHHT(data, 'CT_PCT_UVBTV_UVBCH');

    //   AppConst.GDPT.MuChu = this.GetCHHT(data, 'GDPT_MuChu');

    //   AppConst.TyLeHoanThanhXuatSac = this.GetCHHT(data, 'TiLeHoanThanhXuatSac');
    //   return res;
    // })).subscribe();

  }
  KiemTraXuLyTinhTrangLogin() {
    if (!this.authenticationService.checkIsLogin()) {
      this.authenticationService.logout(null);
      return false;
    }
    return true;
  }

  GetCHHT(data: any, key: string) {
    const resualt = data.filter(x => x.key.toLowerCase() === key.toLowerCase());
    if (resualt.length > 0) {
      return resualt[0].value;
    } else {
      return null;
    }
  }
}

