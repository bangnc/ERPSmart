import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { HomeService } from './home.service';
import { CommonService, PERMSConstant } from 'src/app/shared';
// import { Subscription, timer } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home[class="app-module-warp"]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit, AfterViewInit {


  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<any>,
    private commonService: CommonService,
    private service: HomeService
  ) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
  }


}

