import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageUtilsModule } from '../../../shared/page/page-utils/page-utils.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        PageUtilsModule
    ],
    declarations: [
      CardComponent
    ],
    exports: [
      CardComponent
    ]
})
export class CardModule {
    static forRoot(): ModuleWithProviders { return { ngModule: CardModule, providers: [] }; }
}
