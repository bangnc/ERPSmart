import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageFormComponent } from './page-form.component';
import { PageUtilsModule } from '../page-utils/page-utils.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FabsModule } from '../../fabs/fabs.module';
import { InputUtilsModule } from '../../input/input-utils/input-utils.module';


const EL_DECLAR = [
  PageFormComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbTooltipModule,
    PageUtilsModule,
    FabsModule,
    InputUtilsModule
  ],
  declarations: EL_DECLAR,
  exports: [
    PageUtilsModule,
    PageFormComponent,
    InputUtilsModule
  ]
})
export class PageFormModule {
  static forRoot(): ModuleWithProviders { return { ngModule: PageFormModule, providers: [] }; }
}
