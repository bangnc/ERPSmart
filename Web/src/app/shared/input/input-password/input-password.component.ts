import { Component, OnInit, Input, HostBinding, forwardRef } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    Validators,
    FormControl,
    AbstractControl
} from '@angular/forms';
import { generatorGUID } from '../../utils';

@Component({
    selector: 'app-input[type="password"]',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputPasswordComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputPasswordComponent),
            multi: true
        }
    ]
})

export class InputPasswordComponent implements ControlValueAccessor, OnInit, Validator {

    private innerValue: any;
    private inverValidationMessages = new Map([
        ['required', 'Trường này không được để trống']
    ]);
    public id: string;
    public frmCtr: FormControl = new FormControl();
    public errors: string;
    @Input() isEditable = true;
    @Input() placeholder = '';
    @Input() title: string;
    @Input() icon: string;
    @Input() autofocus = false;
    @Input() validationMessages: any = {};
    @HostBinding('attr.class') appLayoutClass = 'md-form';
    constructor() {
        this.id = generatorGUID();
    }
    // function private
    private onChange(_: any) { }
    private onTouched() { }
    private onValidatorChange(v: any) { }
    ngOnInit(): void {
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
            this.onChange(this.innerValue);
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
        // throw new Error("Method not implemented.");
        this.onValidatorChange = fn;
    }
    updateValue(v: any) {
        this.value = v;
    }

}
