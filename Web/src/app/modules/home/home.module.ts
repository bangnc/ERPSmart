import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { HomeComponent } from './home.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CardModule } from './card/card.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule,
    CardModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ]),

  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
