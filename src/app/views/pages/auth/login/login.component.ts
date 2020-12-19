// Angular
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// RxJS
import { Subject } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { Store } from '@ngrx/store';
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState } from '../../../../core/reducers';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading: boolean;
  data: any;
  submitted = false;
  private unsubscribe: Subject<any>;
  private returnUrl: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private authNoticeService: AuthNoticeService,
    private auth: AuthService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit() {
    this.initLoginForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params.returnUrl || '/';
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  get f() {
    return this.loginForm;
  }

  submit() {
    this.submitted = true;
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const authData = {
      username: controls.username.value ? controls.username.value.trim() : '',
      password: controls.password.value,
    };

    this.spinner.show();
    this.auth
      .login(authData.username, authData.password)
      .then(
        () => {
          this.store.dispatch(new Login());
          // this.router.navigateByUrl(this.returnUrl);
          this.router.navigate(['level-selector']);
          this.spinner.hide();
        },
        (error: HttpErrorResponse) => {
          if(error && error.status === 400 && error.error.error === 'invalid_grant'){
            this.authNoticeService.setNotice('Tên đăng nhập và mật khẩu không chính xác', 'danger');
          } else {
            this.authNoticeService.setNotice('Hệ thống tạm thời gián đoạn', 'danger');
          }
          this.spinner.hide();
        }
      )
      .finally(() => {
        this.spinner.hide();
        this.loading = false;
        this.cdr.markForCheck();
      });
  }
}
