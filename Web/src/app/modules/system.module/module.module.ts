import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { ModuleListComponent } from './list/module-list.component';
import { ModuleFormComponent } from './form/module-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: ModuleListComponent },
      { path: 'form/:id', component: ModuleFormComponent }
    ]),

  ],
  declarations: [
    ModuleListComponent,
    ModuleFormComponent
  ]
})
export class ModuleModule { }
