import { Action } from '@ngrx/store';
import { tcTreedActionTypes } from './tc.tree.constant';
import { RemoveToken } from '../oauth/oauth.action';

export class SetTcTreeOption implements Action {
  readonly type = tcTreedActionTypes.SET_TC_TREE;
  constructor(public tree: any, public selectedItem: any, public url: string) { }
}

export class SetTcLogoutOption implements Action {
  readonly type = tcTreedActionTypes.SET_TC_LOGOUT;
  constructor(public logout: boolean) { }
}

export class SetTcRefreshOption implements Action {
  readonly type = tcTreedActionTypes.SET_TC_REFRESH;
  constructor(public refresh: boolean) { }
}


export class SetTcKeyOption implements Action {
  readonly type = tcTreedActionTypes.SET_TC_KEY;
  constructor(public key: string) { }
}

export class SetTcSelectedOption implements Action {
  readonly type = tcTreedActionTypes.SET_TC_SELECTED;
  constructor(public selectedItem: any) { }
}

export type tcTreeActionsUnion = SetTcTreeOption | SetTcLogoutOption |
SetTcRefreshOption | SetTcKeyOption | SetTcSelectedOption | RemoveToken;
