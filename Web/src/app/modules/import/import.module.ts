import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { ImportComponent } from './import.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ImportComponent }
    ]),

  ],
  declarations: [ImportComponent]
})
export class ImportModule { }
