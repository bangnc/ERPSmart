import {
    Component, OnInit, Input, HostBinding, forwardRef, Output, EventEmitter,
    SimpleChanges, ViewChild, ElementRef
} from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    FormControl,
    AbstractControl
} from '@angular/forms';
import { generatorGUID } from '../../utils';
import { Observable, Subject, of, empty } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-input[type="select-server"]',
    templateUrl: './input-select-server.component.html',
    styleUrls: ['./input-select-server.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSelectServerComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputSelectServerComponent),
            multi: true
        }
    ]
})
export class InputSelectServerComponent implements ControlValueAccessor, OnInit, Validator {

    private innerValue: any;
    private inverValidationMessages = new Map([
        ['required', 'Trường này không được để trống']
    ]);
    private curPage = 1;
    private keySearch = '';
    private totalPage = 1;
    private isReload = true;
    public id: string;
    public frmCtr: FormControl = new FormControl();
    public errors: string;
    public items$: Observable<any>;
    public inputSearch$ = new Subject<string>();
    public loading = false;
    public data: Array<any> = [];

    @Input() isEditable = true;
    @Input() hasBindValue = true;
    @Input() placeholder: string;
    @Input() title: string;
    @Input() icon: string;
    @Input() validationMessages: any = {};
    @Input() readModeData: any;
    @Input() autofocus = false;
    @ViewChild('select') select: ElementRef;
    @Input() defaultEmpty = false;
    @Input() titleWithPlacehoder = true;

    @Input('options') options: {
        value: string,
        label: string,
        multiple: boolean,
        apiUrl: string,
        pageSize: number,
        filter: any,
        sort: any
    };
    @Output() emitChange = new EventEmitter<any>();
    @Output() emitSearch = new EventEmitter<any>();
    @Output() emitFocus = new EventEmitter<any>();

    @HostBinding('attr.class') appLayoutClass = 'md-form';
    constructor(private ngSelectConfig: NgSelectConfig,
        private http: HttpClient,
        private el: ElementRef) {
        this.ngSelectConfig.notFoundText = 'Không tìm thấy kết quả';
        this.ngSelectConfig.clearAllText = 'Xóa tất cả';
        this.id = generatorGUID();
    }

    // function private
    private onChange(_: any) { }
    private onTouched() { }
    private onValidatorChange(v: any) { }

    ngOnInit(): void {
        // this.readModeData = this.readModeData || [{}];
        this.options = this.options || {
            value: 'id',
            label: 'name',
            multiple: false,
            apiUrl: null,
            pageSize: 20,
            filter: null,
            sort: null

        };
        this.options.multiple = this.options.multiple || false;
        this.options.label = this.options.label || 'name';
        this.options.pageSize = this.options.pageSize || 20;
        this.options.filter = this.options.filter || {};
        this.options.sort = this.options.sort || {};
        this.placeholder = this.placeholder || '';
        if (!this.options.apiUrl) {
            console.error('control select server chưa có option ApiUrl');

        }
        if (this.options.multiple) {
            this.readModeData = this.readModeData || [];
        } else {
            this.readModeData = this.readModeData || {};
        }
        this.frmCtr.valueChanges.subscribe(val => {
            this.updateValue(val);
            const obj = this.readModeData;
            if (obj !== null && obj !== undefined &&
                Object.keys(obj).length !== 0 && obj.constructor === Object) {
                    if (!this.data.map(x => x[this.options.value]).includes(obj[this.options.value])) {
                        this.data = this.data.concat(this.readModeData);
                    }
            }

            const els = this.el.nativeElement.querySelectorAll('.ng-input input');
            if (els.length > 0) {
                if (!val) {
                    setTimeout(() => {
                        els[0].setAttribute('placeholder', this.placeholder);
                    }, 0);
                } else {
                    setTimeout(() => {
                        els[0].removeAttribute('placeholder');
                    }, 0);
                }
            }
        });

        this.init();

        // this.items = this.commonService.getAll('api/dm-diaban', 1, 0, {}, { bac: 2 }, '');
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        const els = this.el.nativeElement.querySelectorAll('.ng-input input');
        if (els.length > 0 && this.autofocus) {
            setTimeout(() => {
                els[0].focus();
                els[0].classList.add('autofocus');
            }, 0);
        }
    }
    // get accessor
    get value(): any {
        return this.innerValue;
    }

    // truyền binding ra bên ngoài component
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v);
        }
    }

    writeValue(v: any): void {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.frmCtr.setValue(v);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // kiểm tra nếu control bên ngoài validator lỗi thì bắn lỗi vào control bên trong để hiển thị
        c.statusChanges.subscribe((status) => {
            if (status === 'INVALID') {
                this.processErrors(c.errors);
                this.frmCtr.setErrors(c.errors);
            }
        });
        // kiểm tra nếu control bên trong validator lỗi thì hiển thị lỗi và trả lỗi về control bên ngoài
        if (this.frmCtr.status === 'INVALID') {
            this.processErrors(this.frmCtr.errors);
            return this.frmCtr.errors;
        }
        return null;
    }

    processErrors(errors: any) {
        this.errors = '';
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                if (this.validationMessages.hasOwnProperty(key)) {
                    this.errors += this.validationMessages[key] || '' + '';
                } else {
                    const mes = this.inverValidationMessages.get(key);
                    this.errors += mes ? mes : errors[key] || '' + '';
                }
            }
        }
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.onValidatorChange = fn;
    }

    updateValue(v: any) {
        this.value = v;
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('options')) {
            this.options = this.options || {
                value: 'id',
                label: 'name',
                multiple: false,
                apiUrl: null,
                pageSize: 20,
                filter: null,
                sort: null

            };
            this.options.multiple = this.options.multiple || false;
            this.options.label = this.options.label || 'name';
            this.options.pageSize = this.options.pageSize || 20;
            this.options.filter = this.options.filter || {};
            this.options.sort = this.options.sort || {};
            if (!this.options.apiUrl) {
                console.error('control select server chưa có option ApiUrl');
            }
            if (this.options.multiple) {
                this.readModeData = this.readModeData || [];
            } else {
                this.readModeData = this.readModeData || {};
            }
            this.keySearch = '';
            this.isReload = true;
            this.fetchData().subscribe();
        }
    }

    public change(val) {
        this.emitChange.emit({ data: val });
    }
    public init() {
        this.items$ = this.inputSearch$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(keySearch => {
                keySearch = keySearch || '';
                this.keySearch = keySearch;
                this.isReload = true;
                return this.fetchData();
            })
        );
        this.items$.subscribe();
        // this.inputSearch$.next(null);
    }
    public onScrollToEnd() {
        this.curPage++;
        this.isReload = false;
        if (this.curPage <= this.totalPage) {
            this.fetchData().subscribe();
        }
    }
    public onClose() {
        this.inputSearch$.next(null);
        const els = this.el.nativeElement.querySelectorAll('.ng-input input');
        if (els.length > 0) {
            setTimeout(() => {
                els[0].removeAttribute('placeholder');
            }, 0);
        }
    }
    public fetchData(): Observable<any> {
        this.loading = true;
        if (this.isReload) {
            this.curPage = 1;
        }
        let url = '';
        if (this.options.apiUrl.indexOf('?') !== -1) {
            // tslint:disable-next-line:max-line-length
            url = `${this.options.apiUrl}&page=${this.curPage}&page_size=${this.options.pageSize}&sort=${JSON.stringify(this.options.sort)}&filter=${JSON.stringify(this.options.filter)}&search=${this.keySearch}`;
        } else {
            // tslint:disable-next-line:max-line-length
            url = `${this.options.apiUrl}?page=${this.curPage}&page_size=${this.options.pageSize}&sort=${JSON.stringify(this.options.sort)}&filter=${JSON.stringify(this.options.filter)}&search=${this.keySearch}`;
        }
        if (this.defaultEmpty) {
            if (this.keySearch) {
                return this.http.get(url).pipe(
                    catchError(() => {
                        this.loading = false;
                        return of({ data: [] });
                    }), // empty list on error
                    tap((res) => {
                        let data = [];
                        if (res.data.length > 0) {
                            if (this.isReload) {
                                this.isReload = false;
                                this.data = new Array();
                                if (this.readModeData) {
                                    if (this.readModeData.length > 0 || this.readModeData[this.options.value]) {
                                        this.data = this.data.concat(this.readModeData);
                                    }
                                }
                            }
                            if (this.options.multiple) {
                                data = this.readModeData ?
                                    // tslint:disable-next-line:max-line-length
                                    res.data.filter(x => this.readModeData.every(y => x[this.options.value] !== y[this.options.value])) : res.data;
                            } else {
                                data = this.readModeData ?
                                    res.data.filter(x => x[this.options.value] !== this.readModeData[this.options.value]) : res.data;
                            }
                            this.data = this.data.concat(data);
                            this.totalPage = res.meta.total_page;
                        } else {
                            this.data = [];
                        }

                        this.loading = false;
                    })
                );
            } else {
                this.data = [];
                this.loading = false;
                return empty();
            }

        } else {
            return this.http.get(url).pipe(
                catchError(() => {
                    this.loading = false;
                    return of({ data: [] });
                }), // empty list on error
                tap((res) => {
                    let data = [];
                    if (res.data.length > 0) {
                        if (this.isReload) {
                            this.isReload = false;
                            this.data = new Array();
                            if (this.readModeData) {
                                if (this.readModeData.length > 0 || this.readModeData[this.options.value]) {
                                    this.data = this.data.concat(this.readModeData);
                                }
                            }
                        }
                        if (this.options.multiple) {
                            data = this.readModeData ?
                                // tslint:disable-next-line:max-line-length
                                res.data.filter(x => this.readModeData.every(y => x[this.options.value] !== y[this.options.value])) : res.data;
                        } else {
                            data = this.readModeData ?
                                res.data.filter(x => x[this.options.value] !== this.readModeData[this.options.value]) : res.data;
                        }
                        this.data = this.data.concat(data);
                        this.totalPage = res.meta.total_page;
                    } else {
                        this.data = [];
                    }

                    this.loading = false;
                })
            );
        }
    }

    search() {
        this.emitSearch.emit();
    }

    onFocus() {
        const els = this.el.nativeElement.querySelectorAll('.ng-input input');
        const els2 = this.el.nativeElement.querySelectorAll('.ng-has-value .ng-input input');
        if (els.length > 0 && els2.length === 0) {
            setTimeout(() => {
                els[0].setAttribute('placeholder', this.placeholder);
            }, 0);
        }
    }

    public onBlur() {
        const els = this.el.nativeElement.querySelectorAll('.ng-input input');
        const els2 = this.el.nativeElement.querySelectorAll('.ng-has-value .ng-input input');
        if (els.length > 0) {
            if (els2.length === 0) {
                setTimeout(() => {
                    els[0].setAttribute('placeholder', this.placeholder);
                }, 0);
            } else {
                setTimeout(() => {
                    els[0].removeAttribute('placeholder');
                }, 0);
            }

        }
    }

    onClear() {
        this.readModeData = [];
        const els = this.el.nativeElement.querySelectorAll('.ng-input input');
        if (els.length > 0) {
            setTimeout(() => {
                els[0].setAttribute('placeholder', this.placeholder);
            }, 0);
        }
    }
}
