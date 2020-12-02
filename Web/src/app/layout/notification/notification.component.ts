import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { NotificationService } from './notification.service';
import { AppSettingService } from '../../app-setting.service';
import { MetaStruct } from '../../shared';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [],
})
export class NotificationComponent implements OnInit {
  navName = 'Notifications';
  setting: any;
  url = '';
  empty = false;
  @Input() notifications: {
    meta: MetaStruct,
    data: Array<any>
  } = {
      meta: new MetaStruct(),
      data: []
    };
  @Output() emitClose = new EventEmitter<string>();
  constructor(
    private service: NotificationService,
    private settingService: AppSettingService,
    private router: Router
  ) {
    this.setting = this.settingService.get();
    this.url = (this.setting.API_ENDPOINT + '/UploadFile/') || '';
  }
  ngOnInit(): void {
  }

  closeNav() {
    this.emitClose.emit(this.navName);
  }
  public markReadAllNotify() {
    this.notifications.data.map(x => {
      if (x.states !== 1) {
        x.states = 1;
      }
    });
    this.service.markReadAll().subscribe();
  }
  public markReadNotify(obj: any) {
    if (obj.states !== 1) {
      obj.states = 1;
      this.service.markRead(obj.id).subscribe();
    }

  }
  public viewNotify(obj: any) {
    this.markReadNotify(obj);
    this.closeNav();
  }
  hiddenNotify(id: string) {
    this.notifications.data = this.notifications.data.filter(x => x.id !== id);
    this.notifications.meta.total--;
    this.service.hiddenNofify(id).subscribe();
  }
}

