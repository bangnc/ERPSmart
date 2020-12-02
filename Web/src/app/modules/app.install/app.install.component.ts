import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInstallService } from './app.install.service';

@Component({
    selector: 'app-install[class="app-module-warp"]',
    templateUrl: './app.install.html',
    providers: [AppInstallService]
})
export class AppInstallComponent implements OnInit {
    pass = '12345';
    loading = false;
    validationMessages = {
        pass: {
            required: 'Nhập mật khẩu.'
        },
        to_chuc_id: {
            required: 'Nhập tổ chức hội'
        }
    };
    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private service: AppInstallService
    ) {
    }

    ngOnInit(): void {
    }

    navigateBack(ev: any) {
        this.location.back();
    }

    creates(pass) {
        this.loading = true;
        this.service.creates(pass)
            .subscribe(
                res => {
                    if (res === true) {
                        alert('Tạo tài khoản thành công');
                    } else {
                        alert('Tài khoản đã tồn tại trong hệ thống, vui lòng kiểm tra lại');
                    }
                    this.loading = false;
                },
                err => {
                    console.log(err);
                    this.loading = false;
                });
    }
}
