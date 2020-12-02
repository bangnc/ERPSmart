import { NgModule, ModuleWithProviders } from '@angular/core';
import {
    ColumnHeaderDirective,
    ColumnBodyDirective,
    ColumnDirective,
    ActionBarDirective,
    FilterBarDirective,
    TableContentDirective,
    CreateInViewContentDirective,
    CustomContentDirective,
    TreeTCContentDirective
} from './page.directive';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
export {
    ColumnHeaderDirective,
    ColumnBodyDirective,
    ColumnDirective,
    ActionBarDirective,
    FilterBarDirective,
    TableContentDirective,
    CreateInViewContentDirective,
    CustomContentDirective,
    TreeTCContentDirective
};

const EL_DECLAR = [
    ColumnHeaderDirective,
    ColumnBodyDirective,
    ColumnDirective,
    ActionBarDirective,
    FilterBarDirective,
    TableContentDirective,
    CreateInViewContentDirective,
    PaginationComponent,
    CustomContentDirective,
    TreeTCContentDirective
];
@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: EL_DECLAR,
    exports: EL_DECLAR,
    providers: [
    ]
})
export class PageUtilsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: PageUtilsModule, providers: [] }; }
}
