import { Component, OnInit, Input, HostBinding, forwardRef, Output, EventEmitter } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    Validators,
    FormControl,
    AbstractControl
} from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { generatorGUID } from '../../utils';
import { NumeralPipe } from '../input-utils/input-numeral.pipes';

@Component({
    selector: 'app-input[type="number"]',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputNumberComponent),
            multi: true
        }
    ]
})
export class InputNumberComponent implements ControlValueAccessor, OnInit, Validator {

    private innerValue: any;
    private inverValidationMessages = new Map([
        ['required', 'Trường này không được để trống']
    ]);
    public id: string;
    public frmCtr: FormControl = new FormControl();
    public errors: string;
    public maskOption: {
        mask: any[];
        guide: boolean;
        placeholderChar: string;
        pipe: any;
        keepCharPositions: boolean;
    } = {
            mask: [],
            guide: true,
            placeholderChar: '_',
            pipe: undefined,
            keepCharPositions: false,
        };
    @Input() isEditable = true;
    @Input() placeholder = '';
    @Input() title: string;
    @Input() icon: string;
    @Input() autofocus = false;
    @Input() thousandsSeparatorSymbol = true;
    @Input() validationMessages: any = {};
    @Input() modeDateMask = '';  // ngày:'dd', tháng: 'mm', năm: 'yyyy'
    @HostBinding('attr.class') appLayoutClass = 'md-form';
    @Input() theme = 'md';
    @Output() emitBlur = new EventEmitter<any>();
    // bangnc sử dụng tham số input isDay

    constructor(private numeralPipe: NumeralPipe) {
        this.id = generatorGUID();
    }
    // function private
    private onChange(_: any) { }
    private onTouched() { }
    private onValidatorChange(v: any) { }

    // function xử lý lỗi validator. đọc thông tin lỗi và render ra mes tùy theo loại lỗi
    private processErrors(errors: any) {
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
    // function chuyển đổi dữ liệu từ bên ngoài vào controll
    private transform2InnerValue(v: any) {
        if (this.thousandsSeparatorSymbol) {
            v = this.numeralPipe.transform(v, 'num');
        }
        return v;
    }
    // function chuyển đổi dữ liệu từ bên trong control ra bên ngoài
    private transform2OuterValue(v: any) {
        v = this.numeralPipe.transform(v, 'toNum');
        return v;
    }
    ngOnInit(): void {
        // bangnc mặc định là số
        if (this.modeDateMask !== '' && this.modeDateMask !== undefined) {
            this.maskOption.pipe = createAutoCorrectedDatePipe(this.modeDateMask);
            switch (this.modeDateMask) {
                case 'dd':
                    this.maskOption.mask = [/\d/, /\d/];
                    break;
                case 'mm':
                    this.maskOption.mask = [/\d/, /\d/];
                    break;
                default: // yyyy
                    this.maskOption.mask = [/\d/, /\d/, /\d/, /\d/];
                    break;
            }
        } else {
            this.maskOption.mask = createNumberMask({
                prefix: '',
                thousandsSeparatorSymbol: this.thousandsSeparatorSymbol ? ' ' : '',
                allowDecimal: false,
                decimalSymbol: ',',
                decimalLimit: 6,
                allowNegative: true,
                suffix: '' // This will put the dollar sign at the end, with a space.
            });
        }
        // this.frmCtr.setValidators(Validators.email);
        this.frmCtr.valueChanges.subscribe(val => {
            this.updateValue(val);
        });

    }
    // get accessor
    get value(): any {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    // truyền binding ra bên ngoài component
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            const outVal = this.transform2OuterValue(v);
            this.onChange(outVal);
        }

    }
    writeValue(v: any): void {
        if (v) {
            v = this.transform2InnerValue(v);
        }
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

    registerOnValidatorChange?(fn: () => void): void {
        // throw new Error("Method not implemented.");
        this.onValidatorChange = fn;
    }
    updateValue(v: any) {
        this.value = v;
    }

    blur() {
        if (this.frmCtr.status === 'VALID') {
            this.emitBlur.emit();
        }
    }
}
