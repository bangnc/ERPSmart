import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfilePassComponent } from './profile-pass.component';
import { SharedModule } from '../../shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ProfilePassComponent
  ],
  exports: [
    ProfileComponent
  ],
  entryComponents: [ProfilePassComponent]
})
export class ProfileModule { }
