import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/store/appState';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanLoad {

  constructor(private store: Store<AppState>, private route: Router) { }

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap(loginState => {
        if (loginState.isLoggedIn) {
          return of(loginState.isLoggedIn);
        } else {
          this.route.navigate(['login']);
        }})
  );
}

}

