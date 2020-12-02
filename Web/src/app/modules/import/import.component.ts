import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WorkBook, WorkSheet, utils, read } from 'xlsx';

@Component({
  selector: 'app-import[class="app-module-warp"]',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private http: HttpClient) {
  }
  public data: any;
  private url_dantoc = '/api/dm-dantoc/import';
  private url_tongiao = '/api/dm-tongiao/import';
  private url_nghenghiep = '/api/dm-nghenghieptp/import';
  private url_cocautochuc = '/api/tc-tochuc/import';
  private url_dieuhuong = '/api/qtht-dieuhuong/import';
  private url_chucnang = '/api/qtht-chucnang/import';
  private url_chuyennganh = '/api/dm-chuyennganhdaotao/import';

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // this.cdRef.detectChanges();
  }

  onFileDanTocChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (utils.sheet_to_json(ws, { header: 0 }));
      this.http.post<any>(this.url_dantoc, this.data).subscribe(data => {
        console.log(data);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
  onFileTonGiaoChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (utils.sheet_to_json(ws, { header: 0 }));
      this.http.post<any>(this.url_tongiao, this.data).subscribe(data => {
        console.log(data);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
  onFileNgheNghiepChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (utils.sheet_to_json(ws, { header: 0 }));
      this.http.post<any>(this.url_nghenghiep, this.data).subscribe(data => {
        console.log(data);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onFileCoCauToChucChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (utils.sheet_to_json(ws, { header: 0 }));
      this.http.post<any>(this.url_cocautochuc, this.data).subscribe(data => {
        console.log(data);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
  onFileDieuHuongChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (utils.sheet_to_json(ws, { header: 0 }));
      this.http.post<any>(this.url_dieuhuong, this.data).subscribe(data => {
        console.log(data);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
  onFileChucNangChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (utils.sheet_to_json(ws, { header: 0 }));
      this.http.post<any>(this.url_chucnang, this.data).subscribe(data => {
        console.log(data);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onFileChuyenNganhChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (utils.sheet_to_json(ws, { header: 0 }));
      this.http.post<any>(this.url_chuyennganh, this.data).subscribe(data => {
        console.log(data);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
