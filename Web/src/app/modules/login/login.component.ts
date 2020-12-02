import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';



import { AuthenticationService } from '../../shared';
import { SetTcLogoutOption } from '../../redux/tc.tree/tc.tree.action';
// import '../../../assets/lib/gapi/client_platform.js';


// declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

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
  constructor(
    private authenticationService: AuthenticationService,
    private ngZone: NgZone,
    private router: Router,
    private store: Store<any>,
  ) {
    this.loginData$ = this.store.pipe(select('oauthReducer'));
  }
  ngOnInit(
  ): void {
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
        default:
          this.loginError = error.error_description;
          break;
      }
    }
    // if (this.loginError) {
    //   document.getElementById('login_title').scrollIntoView();
    // }

  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.account.username, this.account.password, this.account.isKeepLogin)
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

  loginGoogle() {
    const that = this;
    /*
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        scope: that.scope
      });
      that._loginGoogle();
    });*/
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
