import { ElementRef, EventEmitter, OnInit, Self, Component, Input, Output } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { PaginationConfig } from './pagination.config';

export interface IPageChangedEvent {
    itemsPerPage: number;
    page: number;
}

const paginationConfig: PaginationConfig = new PaginationConfig();

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    providers: [NgModel]
})
export class PaginationComponent implements ControlValueAccessor, OnInit {
    @Input() public boundaryLinks: boolean;
    @Input() public directionLinks: boolean;
    @Input() public firstText: string;
    @Input() public previousText: string;
    @Input() public nextText: string;
    @Input() public lastText: string;

    @Input() public disabled: boolean;

    @Output() private numPages: EventEmitter<number> = new EventEmitter();
    @Output() private pageChanged: EventEmitter<IPageChangedEvent> = new EventEmitter();

    public config: any;
    public classMap: string;

    private _itemsPerPage: number;
    private _totalItems: number;
    private _totalPages: number;
    private _page: number;

    onChange(_: any) {
    }
    onTouched() {
    }
    // page_size
    @Input() public get itemsPerPage() {
        return this._itemsPerPage;
    }
    public set itemsPerPage(v: number) {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
    }
    // total_data
    @Input() private get totalItems(): number {
        return this._totalItems;
    }
    private set totalItems(v: number) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }
    // total_page
    private get totalPages() {
        return this._totalPages;
    }
    private set totalPages(v: number) {
        this._totalPages = v;
        this.numPages.emit(v);
    }
    // current_page
    public set page(value) {
        const _previous = this._page;
        this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
        if (_previous === this._page || typeof _previous === 'undefined') {
            return;
        }
        this.onChange(this._page);
        this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
        });
    }
    public get page() {
        return this._page;
    }

    constructor( @Self() public cd: NgModel, public elementRef: ElementRef) {
        cd.valueAccessor = this;
        this.config = this.config || paginationConfig;
    }

    ngOnInit() {
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';

        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;


        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
        this.totalPages = this.calculateTotalPages();

    }

    writeValue(value: number) {
        this.page = value;
    }
    public selectPage(page: number, event?: MouseEvent) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                const target: any = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    }
    public getText(key: string): string {
        return (this)[key + 'Text'] || paginationConfig[key + 'Text'];
    }

    public noPrevious(): boolean {
        return this.page === 1;
    }

    public noNext(): boolean {
        return this.page === this.totalPages;
    }

    // base class
    private calculateTotalPages(): number {
        const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    onlyNumberKey(event: any) {
        return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }
}
