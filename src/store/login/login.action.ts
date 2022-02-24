import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modle/userModel';

export const recoverPassword = createAction('[recover Password]');
export const recoverPasswordSuccess = createAction('[recover Password] success');
export const recoverPasswordFail = createAction('[recover Password] fail', props<{error: any}>());


export const login = createAction('[login]');
export const loginSuccess = createAction('[login] success',  props<{user: User}>());
export const loginFail = createAction('[login] fail' , props<{error: any}>());
