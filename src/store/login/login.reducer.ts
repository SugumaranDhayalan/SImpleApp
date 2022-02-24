import { actionSheetController } from '@ionic/core';
import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.action';
import { LoginState } from './LoginState';

const initialState: LoginState = AppInitialState.login;

export const reducer = createReducer(
    initialState,
    on(recoverPassword, currentState => ({
        ...currentState,
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: true,
    })),
    on(recoverPasswordSuccess, currentState => ({
        ...currentState,
        error: null,
        isRecoveredPassword: true,
        isRecoveringPassword: false
    })),
    on(recoverPasswordFail, (currentState, action) => ({
        ...currentState,
        error: action.error,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    })),
    on(login, currentState => ({
        ...currentState,
        error: null,
        isLoggedIn: false,
        isLoggingIn: true
    })),
    on(loginSuccess, currentState => ({
        ...currentState,
        error: null,
        isLoggingIn: false,
        isLoggedIn:true
    })),

    on(loginFail, (currentState, action) => ({
        ...currentState,
        error: action.error,
        isLoggedIn: false,
        isLoggingIn: false
    })),
);


export const loginReducer = ((store, action) => reducer(store, action));
