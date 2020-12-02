import { Component, OnInit, Input, HostBinding, forwardRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    Validators,
    FormControl,
    AbstractControl
} from '@angular/forms';
import { generatorGUID } from '../../utils';
import { MdiIcon } from './input-select-icon';

@Component({
    selector: 'app-input[type="select-icon"]',
    templateUrl: './input-select-icon.component.html',
    styleUrls: ['./input-select-icon.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSelectIconComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputSelectIconComponent),
            multi: true
        }
    ]
})
export class InputSelectIconComponent implements ControlValueAccessor, OnInit, Validator {

    private innerValue: any;
    private inverValidationMessages = new Map([
        ['required', 'Trường này không được để trống']
    ]);
    public id: string;
    public frmCtr: FormControl = new FormControl();
    public errors: string;
    public items: Array<any> = [];
    public data: Array<any> = [];

    @Input() isEditable = true;
    @Input() hasBindValue = true;
    @Input() placeholder: string;
    @Input() title: string;
    @Input() validationMessages: any = {};
    @Input() readModeData: Array<any> = [];
    @Input() icon: string;
    @Input() multiple: boolean;
    @Input() autofocus = false;
    @ViewChild('select') select: ElementRef;

    @Output() emitChange = new EventEmitter<any>();

    @HostBinding('attr.class') appLayoutClass = 'md-form';
    constructor(private ngSelectConfig: NgSelectConfig, private el: ElementRef) {
        this.ngSelectConfig.notFoundText = 'Không tìm thấy kết quả';
        this.id = generatorGUID();
    }

    // function private
    private onChange(_: any) { }
    private onTouched() { }
    private onValidatorChange(v: any) { }

    ngOnInit(): void {
        this.data = MdiIcon;
        this.frmCtr.valueChanges.subscribe(val => {
            this.updateValue(val);
        });
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
    ngOnChanges(): void {
        // this.data = this.data || [];
    }

    public change(val) {
        this.emitChange.emit({ data: val });
    }

}
