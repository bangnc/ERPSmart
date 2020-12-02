import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WavesModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageUtilsModule } from '../page-utils/page-utils.module';
import { InputUtilsModule } from '../../input/input-utils/input-utils.module';

import { TableComponent } from './table.component';


export { MetaStruct, PageOption } from './table.interface';
const EL_DECLAR = [
  TableComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    WavesModule,
    NgbTooltipModule,
    PageUtilsModule,
    InputUtilsModule
  ],
  declarations: EL_DECLAR,
  exports: [
    PageUtilsModule,
    TableComponent,
    InputUtilsModule
  ]
})
export class TableModule {
  static forRoot(): ModuleWithProviders { return { ngModule: TableModule, providers: [] }; }
}
