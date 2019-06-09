import { BadRequestError } from './../../shared/error-handling/bad-request.error';
import { AuthValidator } from './../../../shared/validators/auth.validator';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { throwError, pipe } from 'rxjs';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { combineLatest, switchMap } from 'rxjs/operators';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
    this.register = fb.group({
      // tslint:disable-next-line:max-line-length
      userName: fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), AuthValidator.hasSpace], this.duplicateUserName.bind(this)),
      // tslint:disable-next-line:max-line-length
      password: fb.control('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$'), AuthValidator.hasSpace]),
      firstName: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      lastName: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      email: fb.control('', Validators.email)
    });
  }

  ngOnInit() {
    if (!this.authService.isExpired) {
      this.router.navigate(['/home']);
    }
  }

  private duplicateUserName(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      this.authService.userNameAvailable(control.value)
        .subscribe(available => {
          if (!available) {
            resolve({
              duplicateUserName: true
            });
          }
          resolve(null);
        });
    });
  }

  get userName(): AbstractControl {
    return this.register.get('userName');
  }

  get password(): AbstractControl {
    return this.register.get('password');
  }

  get firstName(): AbstractControl {
    return this.register.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.register.get('lastName');
  }

  get email(): AbstractControl {
    return this.register.get('email');
  }

  onRegister() {
    this.authService.register(this.register.value as IUserRegister)
    .pipe(
      switchMap(userDetail => {
        const userLogin: IUserLogin = {
          userName: userDetail.userName,
          password: this.password.value
        };
        return this.authService.login(userLogin);
      })
    ).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/']);
        }
      },
      error => {
        if (error instanceof BadRequestError) {
          console.log('Bad Request.');
        }
        this.password.reset();
        return throwError(error);
      }
    );
  }
}
