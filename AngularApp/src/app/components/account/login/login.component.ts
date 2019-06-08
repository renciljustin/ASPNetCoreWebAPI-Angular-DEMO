import { BadRequestError } from './../../shared/error-handling/bad-request.error';
import { FormGroup } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: FormGroup) {
    this.authService.login(form.value as IUserLogin)
      .subscribe(
        success => {
          if (success) {
            const returnUrl = this.route.snapshot.queryParams.returnUrl;

            if (returnUrl) {
              this.router.navigate([returnUrl]);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        error => {
          if (error instanceof BadRequestError) {
            console.log('Bad Request.');
          }
          return throwError(error);
        }
      );
  }
}
