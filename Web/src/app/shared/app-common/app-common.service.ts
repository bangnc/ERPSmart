import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SetPageOption } from '../../redux/page-option/page-option.action';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Injectable()
export class CommonService {
  [x: string]: any;
  private roleData: any;
  private subScriptionStore: Subscription;
  strTitle = '';
  // keyBoard
  backKeyBoard: Hotkey | Hotkey[];
  filterKeyBoard: Hotkey | Hotkey[];
  clearKeyBoard: Hotkey | Hotkey[];
  toggleKeyBoard: Hotkey | Hotkey[];
  addKeyBoard: Hotkey | Hotkey[];
  saveKeyBoard: Hotkey | Hotkey[];
  editKeyBoard: Hotkey | Hotkey[];

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor(
    private store: Store<any>,
    private http: HttpClient,
    private _hotkeysService: HotkeysService,
  ) { }

  private extractData(res: Response) {
    const _default: any = {};
    const body = res;
    return body || _default;
  }
  private trimObjValues(obj) {
    Object.keys(obj).map(k => {
      if (obj[k] && typeof obj[k] === 'string') {
        obj[k] = obj[k].trim();
      }
    });
    return obj;
  }

  getAll(
    url: string,
    page: number,
    page_size: number,
    sort: any,
    filter: any,
    search: string
  ): Observable<any> {
    let query = '';
    if (url.indexOf('?') !== -1) {
      query = url + '&page=' + page + '&page_size=' + page_size;
    } else {
      query = url + '?page=' + page + '&page_size=' + page_size;
    }
    if (sort) {
      query = query + '&sort=' + JSON.stringify(sort);
    } else {
      query = query + '&sort=';
    }

    if (filter) {
      query = query + '&filter=' + JSON.stringify(this.trimObjValues(filter));
    } else {
      query = query + '&filter=';
    }

    if (search) {
      query = query + '&search=' + search.trim();
    } else {
      query = query + '&search=';
    }

    return this.http.get<any>(query).pipe(map(this.extractData));
  }

  getByID(url: any, id: any) {
    return this.http.get<any>(url + '/' + id).pipe(map(this.extractData));
  }
  del(url: any, id: string): Observable<any> {
    return this.http.delete<any>(url + '/' + id);
  }
  dels(url: any, listId: Array<string>): Observable<any> {
    return this.http.post<any>(url + '/deletes', listId);
  }
  getDanhMuc(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map(this.extractData));
  }
  // bangnc lấy danh sách năm
  getNam() {
    const lstYear = [];
    const nam = new Date().getFullYear();
    for (let i = nam + 7; i >= nam - 7; i--) {
      lstYear.push({
        nam: i,
        id: i
      });
    }
    return lstYear.sort(this.compareNumbers);
  }

  getNamNew(_nam: number) {
    const lstYear = [];
    const nam = new Date().getFullYear();
    for (let i = nam + _nam; i >= nam - _nam; i--) {
      lstYear.push({
        nam: i,
        id: i
      });
    }
    return lstYear.sort(this.compareNumbers);
  }

  compareNumbers(a, b) {
    return a - b;
  }
  /**
   * Kiểm tra ngày bắt đầu và ngày kết thúc
   * trả về ngày tháng năm theo tháng tiếng anh
   * bangnc
   */
  checkTime(ngay_tl, ngay_kt) {
    const ngay_thanh_lap = ngay_tl;
    let ntl = '';
    if (ngay_thanh_lap !== null && ngay_thanh_lap !== undefined) {
      ntl = ngay_thanh_lap.toString().substr(0, 10);
    }

    if (ntl.includes('/')) {
      const arrayNTL = ntl.split('/');
      ntl = arrayNTL[2] + '-' + arrayNTL[1] + '-' + arrayNTL[0];
    }
    const ngay_ket_thuc = ngay_kt;
    let nkt = '';
    if (ngay_ket_thuc !== null && ngay_ket_thuc !== undefined) {
      nkt = ngay_ket_thuc.toString().substr(0, 10);
    }

    let arrayKT = [];
    let arrayTL = [];
    if (nkt !== '' && nkt.includes('-')) {
      arrayKT = nkt.split('-');
    }
    if (ntl !== '' && ntl.includes('-')) {
      arrayTL = ntl.split('-');
    }

    let str_ngay_ket_thuc = '';
    // tslint:disable-next-line:radix
    str_ngay_ket_thuc = this.monthNames[parseInt(arrayKT[1]) - 1] +
      ' ' +
      arrayKT[2] +
      ', ' +
      arrayKT[0] +
      ' 00:00:00';

    let str_ngay_thanh_lap = '';
    // tslint:disable-next-line:radix
    str_ngay_thanh_lap = this.monthNames[parseInt(arrayTL[1]) - 1] +
      ' ' +
      arrayTL[2] +
      ', ' +
      arrayTL[0] +
      ' 00:00:00';
    let obj = {};
    return (obj = {
      str_ngay_thanh_lap: str_ngay_thanh_lap,
      str_ngay_ket_thuc: str_ngay_ket_thuc
    });
  }
  setPageOption(pageOption: any, url: string) {
    this.store.dispatch(new SetPageOption(pageOption, url));
  }
  initPageOption(url: string, callback: Function) {
    this.subScriptionStore = this.store
      .pipe(
        select((state: any) => state.pageOptionReducer.data[url]),
        map(option => {
          callback(option);
          return option;
        })
      )
      .subscribe();
  }
  destroyPageOption() {
    if (this.subScriptionStore) {
      this.subScriptionStore.unsubscribe();
      this.subScriptionStore = null;
    }

  }
  setFormKeyBoard(fSave: Function, fEdit: Function) {
    this.saveKeyBoard = this._hotkeysService.add(
      new Hotkey(
        'ctrl+alt+s',
        (event: KeyboardEvent, combo: string): boolean => {
          fSave();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );

    this._hotkeysService.add(
      this.editKeyBoard = new Hotkey(
        'ctrl+alt+e',
        (event: KeyboardEvent, combo: string): boolean => {
          fEdit();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );
  }

  setViewKeyBoard(
    fFilter: Function,
    fClear: Function,
    fToggle: Function,
    fBack: Function
  ) {
    this.filterKeyBoard = this._hotkeysService.add(
      new Hotkey(
        'ctrl+alt+enter',
        (event: KeyboardEvent, combo: string): boolean => {
          fFilter();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );

    this.clearKeyBoard = this._hotkeysService.add(
      new Hotkey(
        'ctrl+alt+x',
        (event: KeyboardEvent, combo: string): boolean => {
          fClear();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );

    this.toggleKeyBoard = this._hotkeysService.add(
      new Hotkey(
        'ctrl+alt+f',
        (event: KeyboardEvent, combo: string): boolean => {
          fToggle();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );

    this.backKeyBoard = this._hotkeysService.add(
      new Hotkey(
        'ctrl+alt+backspace',
        (event: KeyboardEvent, combo: string): boolean => {
          fBack();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );
  }

  setAddViewKeyBoard(fAdd: Function) {
    this.addKeyBoard = this._hotkeysService.add(
      new Hotkey(
        'ctrl+alt+n',
        (event: KeyboardEvent, combo: string): boolean => {
          fAdd();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );
  }

  setBackFormKeyBoard(fBack: Function) {
    this.backKeyBoard = this._hotkeysService.add(
      new Hotkey(
        'ctrl+alt+backspace',
        (event: KeyboardEvent, combo: string): boolean => {
          fBack();
          return false;
        },
        ['INPUT', 'TEXTAREA', 'SELECT']
      )
    );
  }

  removeKeyBoard() {
    this._hotkeysService.remove(this.backKeyBoard);
    this._hotkeysService.remove(this.filterKeyBoard);
    this._hotkeysService.remove(this.clearKeyBoard);
    this._hotkeysService.remove(this.toggleKeyBoard);
    this._hotkeysService.remove(this.addKeyBoard);
    this._hotkeysService.remove(this.saveKeyBoard);
    this._hotkeysService.remove(this.editKeyBoard);
  }

  checkValid(ngay, thang, nam) {
    if (ngay && !thang) {
      return 'thang';
    } else {
      if ((ngay || thang) && !nam) {
        return 'nam';
      }
    }
    return '';
  }

  getTenToChucCapTren(id_to_chuc: string): Observable<any> {
    if (id_to_chuc) {
      return this.http.get<any>(`api/tc-tochuc/${id_to_chuc}/laytendaydu`);
    }
  }

  /***
   * Convert dữ liệu về XML
   *
   * bangnc
   */

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  GetTitle(title: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store.pipe(select((state: any) => state.oauthReducer.profile), map(profile => {
        if (profile.to_chuc_id) {
          this.http.get<any>(`api/tc-tochuc/${profile.to_chuc_id}/laytendaydu`).subscribe(
            res => {
              resolve(title + ' ' + res);
            },
            err => {
              reject(err);
              console.log(err);
            });
        }
      })).subscribe();
    });
  }

  getTitleByTC(id_to_chuc: string, title: string): Promise<any> {
    if (id_to_chuc) {
      return new Promise((resolve, reject) => {
        this.http.get<any>(`api/tc-tochuc/${id_to_chuc}/laytendaydu`).subscribe(
          res => {
            resolve(title + ' ' + res);
          },
          err => {
            reject(err);
            console.log(err);
          });
      });
    }
  }

  getDanhMucAsync(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
          console.log(err);
        });
    });
  }
  /***
* Lấy tên file theo ngày tháng năm hiện tại
*
* nameFile tên file
*
* .extendFile: .docx, .xlsx
* bangnc
*/
  getFileName(nameFile, extendFile) {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const time = new Date().getTime();
    const ngayBC = year + '-' + month + '-' + day + '-' + time;
    const fileName = nameFile + '_' + ngayBC + extendFile;
    return fileName;
  }

  getAllAsync(
    url: string,
    page: number,
    page_size: number,
    sort: any,
    filter: any,
    search: string
  ): Promise<any> {
    let query = '';
    if (url.indexOf('?') !== -1) {
      query = url + '&page=' + page + '&page_size=' + page_size;
    } else {
      query = url + '?page=' + page + '&page_size=' + page_size;
    }
    if (sort) {
      query = query + '&sort=' + JSON.stringify(sort);
    } else {
      query = query + '&sort=';
    }

    if (filter) {
      query = query + '&filter=' + JSON.stringify(this.trimObjValues(filter));
    } else {
      query = query + '&filter=';
    }

    if (search) {
      query = query + '&search=' + search.trim();
    } else {
      query = query + '&search=';
    }

    return new Promise((resolve, reject) => {
      this.http.get<any>(query).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
          console.log(err);
        });
    });
  }

  getByIdAsync(url: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(url + '/' + id).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
          console.log(err);
        });
    });
  }
}
