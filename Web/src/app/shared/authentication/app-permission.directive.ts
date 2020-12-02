import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appPermission]'
})
export class AppPermissionDirective implements OnInit {
  context: any = {};
  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.store.pipe(
      select((state: any) => state.oauthReducer.chuc_nang[this.route.snapshot.data.module]),
      map(chucnang => {
        chucnang = chucnang || {};
        this.context.$implicit = chucnang;
        this.updateView();
        return chucnang;
      })).subscribe();

  }
  @Input()
  set appPermission(val) {
  }
  updateView() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }
}
