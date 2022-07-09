import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { DashboardComponent } from '../../../dashboard/dashboard.component';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  message!: string;
  loginLoading = false;
  static path = () => ['login'];
  destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loginUser() {
    this.loginLoading = true;

    this.authService
      .loginWithUserCredentials(this.form.value.email, this.form.value.password)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loginLoading = false))
      )
      .subscribe(
        (data) => {
          this.router.navigate(DashboardComponent.path());
        },
        (error) => {
          this.snackBar.open('Contraseña o usuario incorrecto', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
        }
      );
  }

  private initFormBuilder() {
    this.form = this.formBuilder.group({
      email: [
        'rafamarfil77@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123456', Validators.required],
    });
  }
}
