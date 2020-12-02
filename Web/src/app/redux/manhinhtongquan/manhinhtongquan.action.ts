import { Action } from '@ngrx/store';
import { dashboardActionTypes } from './manhinhtongquan.constant';
import { RemoveToken } from '../oauth/oauth.action';

export class SetDashboardOption implements Action {
  readonly type = dashboardActionTypes.SET_DASHBOARD;
  constructor(public tree: any, public opens: any, public key: string) { }
}


export type dashboardActionsUnion = SetDashboardOption | RemoveToken;
