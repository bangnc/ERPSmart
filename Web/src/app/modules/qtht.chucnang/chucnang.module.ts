import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { ChucNangListComponent } from './list/chucnang-list.component';
import { ChucNangFormComponent } from './form/chucnang-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: ChucNangListComponent },
      { path: 'form/:id', component: ChucNangFormComponent }
    ]),

  ],
  declarations: [
    ChucNangListComponent,
    ChucNangFormComponent
  ]
})
export class ChucNangModule { }
