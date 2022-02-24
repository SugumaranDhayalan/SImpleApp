import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { hide, show } from './loading.action';
import { LoadingState } from './LoadingState';


const initialState: LoadingState = AppInitialState.loading;

export const reducer = createReducer(
    initialState,
    on(show, () => ({show: true})),
    on(hide, () => ({show: false})));


export const loadingReducer = (state: LoadingState, action) => reducer(state, action);
