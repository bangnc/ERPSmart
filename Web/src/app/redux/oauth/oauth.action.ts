// counter.actions.ts
import { Action } from '@ngrx/store';
import { OauthActionTypes } from './oauth.constant';

export class SetToken implements Action {
  readonly type = OauthActionTypes.SET_TOKEN;
  constructor(public token: any, public isKeepLogin: boolean) { }
}

export class RemoveToken implements Action {
  readonly type = OauthActionTypes.REMOVE_TOKEN;
  constructor() { }
}

export class SetStateToLogging implements Action {
  readonly type = OauthActionTypes.SET_TO_LOGGING;
  constructor() { }
}
export class SetStateToLoginFailed implements Action {
  readonly type = OauthActionTypes.SET_TO_LOGIN_FAILED;
  constructor() { }
}

export class SetQuyen implements Action {
  readonly type = OauthActionTypes.SET_QUYEN;
  constructor(public data: any) { }
}
export type OauthActionsUnion = SetStateToLogging | SetStateToLoginFailed | SetToken | RemoveToken | SetQuyen;
