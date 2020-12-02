import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WavesModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageUtilsModule } from '../page-utils/page-utils.module';
import { FabsModule } from '../../fabs/fabs.module';
import { InputUtilsModule } from '../../input/input-utils/input-utils.module';

import { PageListComponent } from './page-list.component';


export { MetaStruct, PageOption, ShowHideOption } from './page-list.interface';
const EL_DECLAR = [
  PageListComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    WavesModule,
    NgbTooltipModule,
    PageUtilsModule,
    FabsModule,
    InputUtilsModule
  ],
  declarations: EL_DECLAR,
  exports: [
    PageUtilsModule,
    PageListComponent,
    InputUtilsModule
  ]
})
export class PageListModule {
  static forRoot(): ModuleWithProviders { return { ngModule: PageListModule, providers: [] }; }
}
