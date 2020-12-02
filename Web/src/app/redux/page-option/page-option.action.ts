// counter.actions.ts
import { Action } from '@ngrx/store';
import { pageOptionActionTypes } from './page-option.constant';
import {RemoveToken} from '../oauth/oauth.action';

export class SetPageOption implements Action {
  readonly type = pageOptionActionTypes.SET_PAGE_OPTION;
  constructor(public pageOption: any, public url: string) { }
}
export type pageOptionActionsUnion = SetPageOption |RemoveToken;
