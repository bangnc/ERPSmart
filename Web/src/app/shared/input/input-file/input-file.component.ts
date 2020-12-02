import { Component, OnInit, Input, HostBinding, forwardRef, ViewChild } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR,
    Validator,
    NG_VALIDATORS,
    Validators,
    FormControl,
    AbstractControl
} from '@angular/forms';
import { generatorGUID } from '../../utils';
import { AppSettingService } from '../../../app-setting.service';
import { BehaviorsService } from '../../../shared/behaviors/behaviors.service';

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
}

@Component({
    selector: 'app-input[type="file"]',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFileComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputFileComponent),
            multi: true
        }
    ]
})
export class InputFileComponent implements ControlValueAccessor, OnInit, Validator {

    private innerValue: any;
    private inverValidationMessages = new Map([
        ['required', 'Trường này không được để trống']
    ]);
    public id: string;
    public frmCtr: FormControl = new FormControl();
    public errors: string;
    @Input() isEditable = true;
    @Input() title: string;
    @Input() icon: string;
    @Input() validationMessages: any = {};
    @HostBinding('attr.class') appLayoutClass = 'md-form';
    @Input() typeFile: any;
    @Input() moduleFile: any;
    @Input() accept: string;
    @ViewChild('inputFile')
    inputFile: any;
    @Input() select_multiple = false; // mặc định chọn 1 file
    multiple = false; // Cho phép chọn nhiều file
    domainFileUrl: string;
    fileClients: any = [];
    @Input() placeholder: string;

    constructor(private appSettingService: AppSettingService,
        private behaviors: BehaviorsService) {
        this.id = generatorGUID();
        const setting = appSettingService.get();
        this.domainFileUrl = setting.API_ENDPOINT + '/UploadFile/';
        this.frmCtr.valueChanges.subscribe(val => {
        });
    }
    // function private
    private onChange(_: any) { }
    private onTouched() { }
    private onValidatorChange(v: any) { }

    ngOnInit(): void {
        // this.frmCtr.setValidators(Validators.email);
        // this.frmCtr.valueChanges.subscribe(val => {
        //     this.updateValue(val);
        // });
        this.multiple = this.select_multiple;
        this.icon = this.icon || 'mdi mdi-attachment';
        this.typeFile = this.typeFile || '';
        this.moduleFile = this.moduleFile || 'approval';
        this.accept = this.accept || '*';
        this.placeholder = this.placeholder || 'Chọn file đính kèm';
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
            this.frmCtr.setValue('');
        }
        // bangnc trường hợp nhiều file
        if (this.select_multiple) {
            this.fileClients = this.innerValue;
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
        if (!this.multiple) {
            if (v) {
                const files = v.srcElement.files[0];
                const that = this;
                if (files) {
                    const filename = files.name;
                    const extensions = filename.substr((filename.lastIndexOf('.') + 1), filename.length).toLowerCase();
                    const path = URL.createObjectURL(files);
                    // bangnc kiểm tra nếu có typeFile thì check ngược lại thì vẫn uppoad
                    if (this.typeFile !== null && this.typeFile !== '' && this.typeFile !== undefined) {
                        if (this.typeFile.toLowerCase().indexOf(extensions) >= 0) {
                            const FR = new FileReader();
                            let fileData = {
                                'file_data': null,
                                'file_path': null,
                                'name': null,
                                'module': null
                            };
                            FR.onload = (e: any) => {
                                const Data = e.target.result;
                                const FileName = filename;
                                fileData = {
                                    'file_data': Data,
                                    'name': FileName,
                                    'file_path': path,
                                    'module': that.moduleFile
                                };
                                that.value = fileData;
                            };
                            FR.readAsDataURL(files);
                        } else {
                            // alert('File không đúng định dạng, vui lòng chọn lại');
                            // this.inputFile.nativeElement.value = '';
                            // this.value = null;
                            this.behaviors.alert({
                                msg: 'File không đúng định dạng, vui lòng chọn lại!',
                                size: '',
                                type: 'danger'
                            });
                            return;
                        }
                    } else {
                        const FR = new FileReader();
                        let fileData = {
                            'file_data': null,
                            'file_path': null,
                            'name': null,
                            'module': null
                        };
                        FR.onload = (e: any) => {
                            const Data = e.target.result;
                            const FileName = filename;
                            fileData = {
                                'file_data': Data,
                                'name': FileName,
                                'file_path': path,
                                'module': that.moduleFile
                            };
                            that.value = fileData;
                        };
                        FR.readAsDataURL(files);
                    }
                }
            }
        } else {
            const files: FileList = v.srcElement.files;
            const lstFile = Array.from(files);
            const checkMaximum = lstFile.some(s => {
                return parseFloat((s.size / (1024 * 1024)).toFixed(2)) > 10;
            });
            // Duyệt danh sách từng file kiểm tra dung lượng
            for (let index = 0; index < lstFile.length; index++) {
                const element = files[index];
                const mb = parseFloat((element.size / (1024 * 1024)).toFixed(2));
                if (mb > 10) {
                    if (this.behaviors.alert({
                        // tslint:disable-next-line:max-line-length
                        msg: 'Dung lượng file không được quá 10MB.',
                        size: '',
                        type: 'primary',
                    })) {
                    }
                    break;
                }
                let typefile = element.name.substr(element.name.lastIndexOf('.') + 1);
                typefile = typefile.toLowerCase();
                // tslint:disable-next-line:max-line-length
                if (typefile === 'apk' || typefile === 'exe' || typefile === 'msi') {
                    if (this.behaviors.alert({
                        // tslint:disable-next-line:max-line-length
                        msg: 'Định dạng file không cho phép. Vui lòng thử lại!',
                        size: '',
                        type: 'primary',
                    })) {
                        this.inputFile.nativeElement.value = '';
                        return;
                    }
                }
                // Kiểm tra danh sách tồn tại file
                if (this.fileClients !== null && this.fileClients !== undefined && this.fileClients.length > 0) {
                    const checkExitsFile = this.fileClients.filter(item => item.name === element.name);
                    if (checkExitsFile.length > 0) {
                        if (this.behaviors.alert({
                            // tslint:disable-next-line:max-line-length
                            msg: 'File ' + element.name + ' đã tồn tại. Vui lòng kiểm tra lại!',
                            size: '',
                            type: 'primary',
                        })) {
                            this.inputFile.nativeElement.value = '';
                            return;
                        }
                    }
                }
                const that = this;
                if (element && !checkMaximum) {
                    const filename = element.name;
                    const path = URL.createObjectURL(element);
                    const FR = new FileReader();
                    let fileData = {
                        'file_data': null,
                        'file_path': null,
                        'name': null,
                        'module': null,
                    };
                    FR.onload = (e: any) => {
                        const Data = e.target.result;
                        const FileName = filename;
                        fileData = {
                            'file_data': Data,
                            'name': FileName,
                            'file_path': path,
                            'module': that.moduleFile,
                        };
                        if (that.fileClients == null) {
                            that.fileClients = [];
                        }
                        that.fileClients.push(fileData);
                        that.value = that.fileClients;
                    };
                    FR.readAsDataURL(element);
                }
            } // for từng file
        }
    }

    async  removeFile(file: any) {
        // this.inputFile.nativeElement.value = '';
        // this.value = null;
        if (await this.behaviors.confirm({
            msg: 'Bạn có chắc chắn muốn xóa file đính kèm này không?',
            size: '',
            type: 'danger',
            hidden: true
        })) {
            this.inputFile.nativeElement.value = '';
            if (!this.multiple) {
                this.value = null;
            } else {
                this.fileClients = this.fileClients.filter(item => item !== file);
                this.value = this.fileClients;
            }
        }
    }

    getUrl(path: any) {
        return this.domainFileUrl + encodeURIComponent(path);
    }

    inputClick() {
        this.inputFile.nativeElement.click();
    }
}
