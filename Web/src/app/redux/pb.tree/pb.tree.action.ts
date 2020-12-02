import { Action } from '@ngrx/store';
import { pbTreedActionTypes } from './pb.tree.constant';
import { RemoveToken } from '../oauth/oauth.action';

export class SetPbdOption implements Action {
  readonly type = pbTreedActionTypes.SET_PB_ID;
  constructor(public phongban_id: string) { }
}

export type pbTreeActionsUnion = SetPbdOption | RemoveToken;
