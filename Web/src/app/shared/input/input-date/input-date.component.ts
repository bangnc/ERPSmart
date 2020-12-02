import { Component, OnInit, Input, HostBinding, forwardRef, OnChanges, SimpleChanges, Injectable } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    Validators,
    FormControl,
    AbstractControl
} from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
// import * as moment from 'moment';
import * as moment from '../../../../assets/lib/moment/moment.min';
import { generatorGUID } from '../../utils';

const I18N_VALUES = {
    'vn': {
        weekdays: ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'],
        months: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12'
        ],
    }
    // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
    language = 'vn';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

    constructor(private _i18n: I18n) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}

const MASK_TIME = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
const MASK_DATE = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
const MASK_MONTH = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

@Component({
    selector: 'app-input[type="date"]',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputDateComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputDateComponent),
            multi: true
        },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})
export class InputDateComponent implements ControlValueAccessor, Validator, OnInit, OnChanges {

    private innerValue: string;
    private inverValidationMessages = new Map([
        ['required', 'Trường này không được để trống']
    ]);
    private dateFormartHasTime = 'DD/MM/YYYY HH:mm';
    private dateFormart = 'DD/MM/YYYY';
    private monthFormart = 'MM/YYYY';
    private isPickDate = true;
    public id: string;
    public frmCtr: FormControl = new FormControl();
    public errors: string;
    public time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
    public date: NgbDateStruct;
    public minDate: NgbDateStruct = {
        year: 1900,
        month: 1,
        day: 1
    };
    public maskOption: {
        mask: any[];
        guide: boolean;
        placeholderChar: string;
        pipe: any;
        keepCharPositions: boolean;
        showMask: boolean;
    } = {
            mask: MASK_DATE,
            guide: false,
            placeholderChar: '_',
            pipe: undefined,
            keepCharPositions: false,
            showMask: true
        };
    @Input() isEditable = true;
    @Input() placeholder = '';
    @Input() title: string;
    @Input() icon: string;
    @Input() validationMessages: any = {};
    @Input() mode = 'date'; // các giá trị của mode month (chỉ chọn đến tháng) date(chỉ chọn đến ngày) time(chọn đến time)
    @Input() outPutType = 'date-string'; // outPutType co the la date hoac date-string
    @Input() autofocus = false;
    @HostBinding('attr.class') appLayoutClass = 'md-form';
    constructor() {
        this.id = generatorGUID();
        this.maskOption.pipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM');
    }
    // function private
    private onChange(_: any) { }
    private onTouched() { }
    private onValidatorChange(v: any) { }
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

        let mdt = null;
        if (this.outPutType === 'date-string') {
            mdt = moment.utc(v);
        } else {
            mdt = moment(v);
        }

        if (mdt.isValid()) {
            this.date = {
                year: mdt.year(),
                month: mdt.month() + 1,
                day: mdt.date()
            };
            this.time = {
                hour: this.mode === 'time' ? mdt.hours() : 0,
                minute: this.mode === 'time' ? mdt.minute() : 0,
                second: this.mode === 'time' ? mdt.second() : 0,
            };
            const format = this.getDateFormart();
            if (this.outPutType !== 'date-string' && typeof v === 'string') {
                this.onChange(mdt.toDate());
            }

            if (this.outPutType === 'date-string' && typeof v === 'object') {
                this.onChange(mdt.format(format));
            }
            return mdt.format(format);
        }

    }
    // function chuyển đổi dữ liệu từ bên trong control ra bên ngoài
    private transform2OuterValue(v: any) {
        const format = this.getDateFormart();
        if (v.length === format.length) {
            const mdt = moment(v, format);
            if (mdt.isValid()) {
                switch (this.outPutType) {
                    case 'date-string':
                        return mdt.format('YYYY-MM-DDTHH:mm:ss');
                    default:
                        return mdt.toDate();
                }
            }
        }
    }
    private getDateFormart() {
        switch (this.mode) {
            case 'date':
                return this.dateFormart;
            case 'month':
                return this.monthFormart;
            case 'time':
                return this.dateFormartHasTime;
            default:
                return this.dateFormart;
        }
    }
    ngOnInit(): void {
        // this.frmCtr.setValidators(Validators.)
        this.frmCtr.valueChanges.subscribe(val => {
            if (val) {
                const format = this.getDateFormart();
                if (moment(val, format).format(format) !== val) {
                    const errors = { format: `Dữ liệu không đúng định dạng ${format}` };
                    this.processErrors(errors);
                    this.frmCtr.setErrors(errors);
                    this.innerValue = null;
                    this.onChange(null);
                } else {
                    this.updateValue(val);
                }
            } else {
                this.updateValue(val);
            }

        });
    }
    // function onchange để thực hiện cập nhật lại control
    // khi có những thay đổi từ các input bên ngoài
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('mode')) {
            let mask = MASK_DATE;
            let correctedDatePipe = null;
            switch (changes.mode.currentValue) {
                case 'date':
                    mask = MASK_DATE;
                    correctedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM');
                    break;
                case 'month':
                    correctedDatePipe = createAutoCorrectedDatePipe('mm/yyyy');
                    mask = MASK_MONTH;
                    break;
                case 'time':
                    correctedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM');
                    mask = MASK_TIME;
                    break;
                default:
                    correctedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM');
                    mask = MASK_DATE;
                    break;
            }
            this.maskOption = {
                mask: mask,
                guide: false,
                placeholderChar: '_',
                pipe: correctedDatePipe,
                keepCharPositions: false,
                showMask: true
            };
        }

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
    toogleDPick(dPick: any, dp: any) {
        if (!dPick.isOpen()) {
            if (dp) {
                const format = this.getDateFormart();
                const mdt = moment(this.innerValue, format);
                let dt = new Date();
                if (mdt.isValid()) {
                    dt = mdt.toDate();
                }
                const tmpDate = {
                    year: dt.getFullYear(),
                    month: dt.getMonth() + 1,
                    day: dt.getDate()
                };
                const tmpTime = {
                    hour: dt.getHours(),
                    minute: dt.getMinutes(),
                    second: dt.getSeconds()
                };
                if (JSON.stringify(tmpDate) !== JSON.stringify(this.date)) {
                    // this.isPickDate = false;
                    this.date = tmpDate;
                }
                if ((this.mode === 'time') && (JSON.stringify(tmpTime) !== JSON.stringify(this.time))) {
                    this.time = tmpTime;
                }
                dp.navigateTo(this.date);
            }
        }
        dPick.toggle();

    }

    updateValue(v: any) {
        this.value = v;
    }
    updateDateValue(v: NgbDateStruct, dPick: any) {
        if (!(this.mode === 'time')) {
            if (v) {
                if (this.isPickDate) {
                    const mdt = moment(new Date(v.year, v.month - 1, v.day, this.time.hour, this.time.minute, this.time.second));
                    const format = this.getDateFormart();
                    const val = mdt.format(format);
                    this.frmCtr.setValue(val);
                    dPick.close();
                } else {
                    this.isPickDate = true;
                }

            }

        }

    }
    updateDateTimeValue(date, time, dPick) {
        const mdt = moment(new Date(date.year, date.month - 1, date.day, time.hour, time.minute, time.second));
        const format = this.getDateFormart();
        const val = mdt.format(format);
        this.frmCtr.setValue(val);
        dPick.close();
    }

    getPlaceholder() {
        switch (this.mode) {
            case 'date':
                return 'dd/mm/yyyy';
            case 'month':
                return 'mm/yyyy';
            case 'time':
                return 'dd/mm/yyyy HH:mm';
            default:
                return 'dd/mm/yyyy';
        }
    }
}
