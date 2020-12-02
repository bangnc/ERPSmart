import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthenticationModuleService } from '../shared/authentication/authentication-module.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', redirectTo: 'home' },
        { path: 'home', loadChildren: '../modules/home/home.module#HomeModule' },
        { path: 'import', loadChildren: '../modules/import/import.module#ImportModule' },
        { path: 'unauthorized', component: UnauthorizedComponent},
        //#region Router quản trị hệ thống

        //#endregion
        //#region Router danh mục
        // {
        //     path: 'dm-khoidonvi',
        //     data: { module: 'DM' },
        //   //  canActivate: [AuthenticationModuleService],
        //     loadChildren: '../modules/dm.khoidonvi/khoidonvi.module#KhoiDonViModule'
        // },       
        //#endregion

        //#region Router QTHT
        {
            path: 'qtht-loaimodule',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.loaimodule/loaimodule.module#LoaiModuleModule'
        },
        {
            path: 'qtht-module',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.module/module.module#ModuleModule'
        },
        {
            path: 'qtht-dieuhuong',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.dieuhuong/dieuhuong.module#DieuHuongModule'
        },
        {
            path: 'qtht-chucnang',
            data: { module: 'QTHT' },
            // canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.chucnang/chucnang.module#ChucNangModule'
        },
        {
            path: 'qtht-nguoidung',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.nguoidung/nguoidung.module#NguoiDungModule'
        },
        {
            path: 'qtht-nhom',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.nhom/nhom.module#NhomModule'
        },
        {
            path: 'qtht-vaitro',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.vaitro/vaitro.module#VaiTroModule'
        },
        {
            path: 'qtht-nhatkyhethong',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.nhatkyhethong/nhatkyhethong.module#NhatKyHeThongModule'
        },
        {
            path: 'qtht-sukien',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.sukien/sukien.module#SuKienModule'
        },
        // {
        //     path: 'qtht-cauhinhhethong',
        //     data: { module: 'QTHT' },
        //   //  canActivate: [AuthenticationModuleService],
        //     loadChildren: '../modules/qtht.cauhinhhethong/cauhinhhethong.module#CauHinhHeThongModule'
        // },
        {
            path: 'qtht-kybaocao',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.kybaocao/kybaocao.module#KyBaoCaoModule'
        },
        {
            path: 'qtht-loaichucnang',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.loaichucnang/loaichucnang.module#LoaiChucNangModule'
        },
        {
            path: 'qtht-nhatkydangnhap',
            data: { module: 'QTHT' },
          //  canActivate: [AuthenticationModuleService],
            loadChildren: '../modules/qtht.nhatkydangnhap/nhatkydangnhap.module#NhatKyDangNhapModule'
        },
        {
            path: 'qtht-taikhoantichhop',
            data: { module: 'QTHT' },
            loadChildren: '../modules/qtht.taikhoantichhop/taikhoantichhop.module#TaiKhoanTichHopModule'
        },
        //#endregion
    ]
}];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
