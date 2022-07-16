import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  message!: string;
  loader = false;
  static path = () => ['login'];
  destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'registered';
      const key2 = 'loggedOut';
      if (params[key1] === 'success') {
        this.snackBar.open(
          'You have been successfully registered. Please Log in',
          '',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          }
        );
      }
      if (params[key2] === 'success') {
        this.snackBar.open('You have been loggedout successfully', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loginUser(): void {
    this.loader = true;
    this.authService
      .login(this.form.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loader = false))
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(DashboardComponent.path(), {
            queryParams: { loggedin: 'success' },
          });
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open('Wrong user or password', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
      });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }
}
