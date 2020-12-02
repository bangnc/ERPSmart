import { Component, OnInit, Input, HostBinding, forwardRef, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    FormControl,
    AbstractControl
} from '@angular/forms';
import { generatorGUID } from '../../utils';

@Component({
    selector: 'app-input[type="checkbox-group"]',
    templateUrl: './input-checkbox-group.component.html',
    styleUrls: ['./input-checkbox-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputCheckBoxGroupComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputCheckBoxGroupComponent),
            multi: true
        }
    ]
})
export class InputCheckBoxGroupComponent implements ControlValueAccessor, OnInit, OnChanges, Validator {

    private innerValue: any;
    private inverValidationMessages = new Map([
        ['required', 'Trường này không được để trống']
    ]);
    public id: string;
    // public frmCtr: FormControl = new FormControl();
    public errors: string;
    @Input() isEditable = true;
    @Input() placeholder: string;
    @Input() title: string;
    @Input() icon: string;
    @Input() validationMessages: any = {};
    @Input() vertical: string;
    @Input() autofocus = false;
    @HostBinding('attr.class') appLayoutClass = 'md-form';
    @ViewChild('checkBox') checkBox: ElementRef;
    @Input() name: string;
    public items: Array<any> = [];

    @Input() data: Array<any> = [];
    @Input() options: {
        value: string,
        label: string
    };

    constructor() {
        this.id = generatorGUID();
    }

    // function private
    private onChange(_: any) { }

    ngOnInit(): void {
        this.options = this.options || { value: 'id', label: 'name' };
        this.options.label = this.options.label || 'name';
        this.options.value = this.options.value || 'id';
        /*
        this.frmCtr.valueChanges.subscribe(val => {
            this.updateValue(val);
        });*/
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        const elFocus = this.checkBox.nativeElement.querySelectorAll('input[type=checkbox]');
        if (elFocus.length > 0 && this.autofocus) {
            setTimeout(() => {
                elFocus[0].focus();
                elFocus[0].classList.add('autofocus');
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
            this.onChange(this.innerValue);
        }
    }

    writeValue(v: any): void {
        if (v !== this.innerValue) {
            this.innerValue = v;
            // this.frmCtr.setValue(v);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState?(isDisabled: boolean): void {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // kiểm tra nếu control bên ngoài validator lỗi thì bắn lỗi vào control bên trong để hiển thị
        c.statusChanges.subscribe((status) => {
            if (status === 'INVALID') {
                this.processErrors(c.errors);
                // this.frmCtr.setErrors(c.errors);
            }
        });
        /*
        // kiểm tra nếu control bên trong validator lỗi thì hiển thị lỗi và trả lỗi về control bên ngoài
        if (this.frmCtr.status === 'INVALID') {
            this.processErrors(this.frmCtr.errors);
            return this.frmCtr.errors;
        }
        */
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
    }

    updateValue(v: any) {
        this.value = v;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('data')) {
            const temp = changes.data.currentValue || [];
            this.items = temp.map(x => Object.assign({}, x));
        }
    }

}
