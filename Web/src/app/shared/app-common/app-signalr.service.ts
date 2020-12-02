import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettingService } from '../../app-setting.service';
import { TokenService } from '../authentication/token.service';

declare var $: any;
@Injectable()
export class SignalrService {
    // Declare the variables
    private appSetting: any;
    private proxy: any;
    private proxyName = 'notificationHub';
    private connection: any;
    private tryingToReconnect = false;
    // create the Event Emitter
    public onNotify: EventEmitter<any>;
    public connectionEstablished: EventEmitter<Boolean>;
    public connectionExists: Boolean;
    constructor(private http: HttpClient,
        private appSettingService: AppSettingService,
        private tokenService: TokenService
    ) {
        this.appSetting = appSettingService.appSetting || {};
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.onNotify = new EventEmitter<any>();
        this.connectionExists = false;
        // create hub connection
        this.connection = $.hubConnection(this.appSetting.API_ENDPOINT);
        // create new proxy as name already given in top
        this.proxy = this.connection.createHubProxy(this.proxyName);
        // register on server events
        this.registerOnServerEvents();
    }
    private setToken() {
        const token = this.tokenService.getToken();
        let access_token = '';
        if (token) {
            access_token = token.access_token;
        }

        this.connection.qs = { access_token: access_token };
    }
    private startConnection(): void {
        // $.signalR.ajaxDefaults.headers = { Authorization: access_token};
        this.connection.start().done((data: any) => {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id, data);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }

    // check in the browser console for either signalr connected or not
    public stopConnection() {
        this.connection.stop();
    }
    public initialize(): void {
        // đăng ký các event lắng nghe từ server
        // this.registerOnServerEvents();
        // stop connection trước khi start
        this.stopConnection();
        // set token cho connection
        this.setToken();
        // khởi chạy connection
        this.startConnection();

        // quản lý bật hạ cờ khi reconnect
        this.connection.reconnecting(() => {
            this.tryingToReconnect = true;
        });

        this.connection.reconnected(() => {
            this.tryingToReconnect = false;
        });
        // // xử lý connect lại khi connect lỗi
        // this.connection.error((error) => {
        //     this.initialize();
        // });
        // // nễu quá trình chạy connnect bị disconnect thì connect lại
        // this.connection.disconnected(() => {
        //     if (this.tryingToReconnect) {
        //         setTimeout(() => {
        //             this.initialize();
        //         }, 5000);
        //     }
        // });
    }
    private registerOnServerEvents(): void {
        this.proxy.on('notify', (res) => {
            console.log('received in SignalRService: ', res);
            this.onNotify.emit(res);
        });
    }

}
