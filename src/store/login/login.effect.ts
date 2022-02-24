// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { AuthService } from 'src/app/services/auth/auth.service';
// import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.action';
// import {map,catchError, switchMap} from 'rxjs/operators';
// import { of } from 'rxjs';

// @Injectable()

// export class LoginEffect {
//     constructor(private actions$: Actions, private authService: AuthService) { }

//     recoverPassword$ = createEffect(() => this.actions$.pipe(
//         ofType(recoverPassword),
//         switchMap(() => this.authService.recoverFunc('email').pipe(
//             map(() => recoverPasswordSuccess()),
//             catchError(error => of(recoverPasswordFail({error})))
//         ))
//     ));
// }
