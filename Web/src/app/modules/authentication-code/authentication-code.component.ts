import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../shared';
import { SetTcLogoutOption } from '../../redux/tc.tree/tc.tree.action';
import { AppSettingService } from '../../app-setting.service';
// import '../../../assets/lib/gapi/client_platform.js';


// declare const gapi: any;
@Component({
  selector: 'app-authentication-code',
  templateUrl: './authentication-code.component.html',
  styleUrls: ['./authentication-code.scss'],
  providers: [AuthenticationService]
})
export class AuthenticationCodeComponent implements OnInit {
  strTenHoi = "HỆ THỐNG QUẢN LÝ CÁN BỘ, HỘI VIÊN HLHPN VIỆT NAM";
  account: any = {
    username: '',
    password: '',
    isKeepLogin: true
  };
  loginMode = 'internal';
  loginError: string;
  loading = false;
  returnUrl: string;
  isKeepLogin = true;
  clientId = '92702623059-94flcmteuu2a1uk1o94dd5jeknq1lakb.apps.googleusercontent.com';
  scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/gmail.send',
  ].join(' ');
  public auth2: any;
  public loginData$: Observable<any>;
  private tokenkey: any;
  private appSetting: any;
  
  constructor(
    private authenticationService: AuthenticationService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
    private settingService: AppSettingService
    
  ) {
    this.appSetting = settingService.get();
    this.loginData$ = this.store.pipe(select('oauthReducer'));
  }
  ngOnInit(
  ): void {
    console.log(1)
    // check login and redirect
    this.route.queryParams.subscribe(params => {
      const tokenKey = params['tokenKey'];
      if(tokenKey){
        this.tokenkey = tokenKey;
        // call token grant_type:sso
        this.loginExternal(this.tokenkey, false, "sso");
      }else{
        // neu khong có token key, tu redirect ve trang hom
        this.router.navigate(['/home'])
      }
      
      
    });
  }
  private handlerError(error: any) {
    if (error && error.error) {
      switch (error.error) {
        case 'invalid_user':
          this.loginError = 'Tài khoản không tồn tại trong hệ thống';
          break;
        case 'invalid_password':
          this.loginError = 'Mật khẩu không chính xác, vui lòng kiểm tra lại';          
          break;
          case 'invalid_auth_403':
          this.loginError = error.error_description;
          break;
          case 'invalid_auth_code':
            this.loginError = error.error_description;
            // hiện tại khi xác thực token key về phía hội bị lỗi, null thì trả về trang login tại app HLHPN
            // nếu xác thực lỗi thì quay lại trang đăng nhập SSO Portal
            this.router.navigate(['/home'])
            break;          
        default:
          this.loginError = error.error_description;
          break;
      }
    }
    // if (this.loginError) {
    //   document.getElementById('login_title').scrollIntoView();
    // }

  }
  loginExternal(code: string, isKeepLogin: boolean, grant_type:string) {
    this.loading = true;
    this.authenticationService.loginExternal(code, isKeepLogin, grant_type )
      .subscribe(data => {
        this.loading = false;
        this.store.dispatch(new SetTcLogoutOption(false));
      },
        error => {
          console.log(error);
          this.handlerError(error.error);
          this.loading = false;
        });
  }

  logoutSSO() {
    let url = this.appSetting.SSO_LOGOUT_URL +"?url="+ this.appSetting.SSO_LOGIN_URL;
    window.location.href = url;
  }

  switchLogin() {
    if (this.loginMode === 'google') {
      this.loginMode = 'internal';
    } else {
      this.loginMode = 'google';
    }
  }
  private _loginGoogle() {
    /*
    this.auth2.grantOfflineAccess({ prompt: 'select_account' }).then(result => {
      this.ngZone.run(() => {
        console.log(result.code);

        this.authenticationService.loginExternal(result.code, true)
          .subscribe(data => {
            this.router.navigate(['/home']);
          },
            error => {
              console.log(error);
              this.handlerError(error.error);
              this.loading = false;
            });
      });
    });
    */
  }

}
