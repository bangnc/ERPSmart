import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  Input,
  ContentChild,
  Output,
  EventEmitter,
  SimpleChanges,
  HostListener
} from '@angular/core';
import { ActivityContentDirective } from './workflow-config.directive';


@Component({
  selector: 'app-workflow-config',
  templateUrl: './workflow-config.component.html',
  styleUrls: ['./workflow-config.component.scss']
})
export class WorkflowConfigComponent implements OnInit, OnChanges {
  private maxActySize: {
    w: number,
    h: number
  } = {
      w: 0,
      h: 0
    };
  @Input() activities: Array<any>;
  @Input() transactions: Array<any>;
  @Input() isEditable = true;
  @Input() hasTransName = true;
  @Input() isBoxShadow = true;
  @Input('pointsize') pointsize: {
    width: number,
    height: number
  } = { width: 200, height: 100 };

  @Output() emitTransClick = new EventEmitter<any>();
  @ViewChild('svgLayer') svgLayer: ElementRef;
  @ViewChild('wflWarp') wflWarp: ElementRef;
  public zoomSize = 100;
  @ContentChild(ActivityContentDirective) activityContentTpl: ActivityContentDirective;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._reSizeSvg();
  }
  constructor() {
  }
  ngOnInit(): void {
    this.pointsize = this.pointsize || { width: 200, height: 100 };
    this.pointsize.width = this.pointsize.width || 200;
    this.pointsize.height = this.pointsize.height || 100;
    this.activities = this.activities || [];
    this.transactions = this.transactions || [];
    this._initWorkflow();
  }
  // moi lan data thay doi. tinh toan lai position cua cac transtion
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('activities') || changes.hasOwnProperty('transactions')) {
      this._initWorkflow();
    }
  }
  // ham tinh toan lai position cua cac transition
  private _initWorkflow() {
    this.activities.forEach(acty => {
      this.moveActivity(acty.position, acty);
    });
    this._setMaxActySize();
    this._reSizeSvg();
  }
  // ham set x w lon nhat cua cac activity
  private _setMaxActySize() {
    this.maxActySize = {
      w: Math.max.apply(Math, this.activities.map(function (o) { return o.position.x; })) + 250,
      h: Math.max.apply(Math, this.activities.map(function (o) { return o.position.y; })) + 150
    };
  }
  // hamf reSize lai svg element cho vua khop voi vi tri activity
  private _reSizeSvg() {
    const wflWarpSize = {
      w: this.wflWarp.nativeElement.offsetWidth,
      h: this.wflWarp.nativeElement.offsetHeight
    };
    const svgSize = {
      w: Math.max.apply(Math, [this.maxActySize, wflWarpSize].map(function (o) { return o.w; })),
      h: Math.max.apply(Math, [this.maxActySize, wflWarpSize].map(function (o) { return o.h; }))
    };

    this.svgLayer.nativeElement.setAttribute('style', `width: ${svgSize.w}px;height: ${svgSize.h}px`);
  }
  // ham cap nhat tinh toan khi di chuyen cac activity
  public moveActivity(ev, acty) {
    const _posActy = {
      x: ev.x + this.pointsize.width / 2,
      y: ev.y + this.pointsize.height / 2
    };
    // acty.position = ev;
    // lấy danh sách tran from để update
    const trans_from_list = this.transactions.filter(x => x.activity_from_id === acty.id);
    trans_from_list.forEach(x => {
      x.position_from = _posActy;
    });
    // lấy danh sách tran to để update
    const trans_to_list = this.transactions.filter(x => x.activity_to_id === acty.id);
    trans_to_list.forEach(x => {
      x.position_to = _posActy;
    });


  }
  // ham cap nhat tinh toan khi ket thuc di chuyen activity
  public moveActivityEnd(ev, acty) {
    acty.position = ev;
    this._setMaxActySize();
    this._reSizeSvg();
  }
  // ham emit event khi click vao transition
  public onTransClick(item) {
    this.emitTransClick.emit(item);
  }
  public zoomOut() {
    if (this.zoomSize > 5) {
      this.zoomSize -= 5;
      this.wflWarp.nativeElement.setAttribute('style', `zoom: ${this.zoomSize}%;`);
      this._reSizeSvg();
    }

  }
  public zoomIn() {
    this.zoomSize += 5;
    this.wflWarp.nativeElement.setAttribute('style', `zoom: ${this.zoomSize}%;`);
    this._reSizeSvg();
  }
}
