import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { KyBaoCaoListComponent } from './list/kybaocao-list.component';
import { KyBaoCaoFormComponent } from './form/kybaocao-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: KyBaoCaoListComponent },
      { path: 'form/:id', component: KyBaoCaoFormComponent }
    ]),

  ],
  declarations: [
    KyBaoCaoListComponent,
    KyBaoCaoFormComponent
  ]
})
export class KyBaoCaoModule { }
