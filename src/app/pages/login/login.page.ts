import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/appState';
import { hide, show } from 'src/store/loading/loading.action';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.action';
import { LoginState } from 'src/store/login/LoginState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  loginForm: FormGroup;
  submitted = false;
  authServiceSubscription: any;

  constructor(private fb: FormBuilder, private router: Router, private store: Store<AppState>,
    private toastrCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
    this.store.select('login').subscribe((loginState) => {
      this.onRecoveringPassword(loginState);
      this.recoveredPassword(loginState);

      this.onLoggingIn(loginState);
      this.onLoggenIn(loginState);

      this.onError(loginState);
      this.toggleLoading(loginState);
    });
  }

  toggleLoading(loginState: LoginState) {
    if(loginState.isRecoveringPassword || loginState.isLoggingIn) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  onLoggingIn(loginState: LoginState) {
    if(loginState.isLoggingIn) {
      this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe((user) => {
        this.store.dispatch(loginSuccess({user}));
      }, error => {
        this.store.dispatch(loginFail({error}));
      });
    }
  }

  onLoggenIn(loginState: LoginState) {
    if(loginState.isLoggedIn) {
    this.router.navigate(['home']);
    }
  }

  onRecoveringPassword(loginState: LoginState) {
    if(loginState.isRecoveringPassword) {
      this.authServiceSubscription = this.authService.recoverFunc(this.loginForm.get('username').value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({error}));
      });
    }
  }

  ngOnDestroy() {
    if(this.authServiceSubscription) {
      this.authServiceSubscription.unsubscribe();
    }
  }

  async onError(loginState: LoginState) {
    if(loginState.error) {
      const toast = await this.toastrCtrl.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger',
        duration:3000
      });
      toast.present();
    }
  }

  async recoveredPassword(loginState: LoginState) {
    if(loginState.isRecoveredPassword) {
      const toast = await this.toastrCtrl.create({
        position: 'bottom',
        message: 'Successfully Email sent',
        color: 'primary',
        duration:3000
      });
      toast.present();
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(login());

  }

  register() {
    this.router.navigate(['register']);
  }

  forgtPassword() {
    this.store.dispatch(recoverPassword());
    // this.store.dispatch(show());
    // setTimeout(() => {
    //   this.store.dispatch(hide());
    // }, 3000);
  }

}
