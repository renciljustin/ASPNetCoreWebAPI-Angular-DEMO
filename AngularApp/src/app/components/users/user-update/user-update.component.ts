import { BadRequestError } from './../../shared/error-handling/bad-request.error';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundError } from '../../shared/error-handling/not-found.error';
import { throwError } from 'rxjs';
import { IUserDetail } from 'src/app/shared/interfaces/IUserDetail';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { IUserUpdate } from 'src/app/shared/interfaces/IUserUpdate';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: FormGroup;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              fb: FormBuilder) {
    this.user = fb.group({
      id: fb.control(''),
      firstName: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      lastName: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      birthDate: fb.control(new Date()),
      email: fb.control('', Validators.email)
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.usersService.getUser(id)
      .subscribe(
        user => {
          this.renderUserView(user);
        },
        error => {
          if (error instanceof NotFoundError) {
            console.log('User not exists.');
          }
          return throwError(error);
        }
      );
  }

  renderUserView(user: IUserDetail) {
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        this.user.get(key).setValue(user[key]);
      }
    }
  }

  get getId(): AbstractControl {
    return this.user.get('id');
  }

  get getFirstName(): AbstractControl {
    return this.user.get('firstName');
  }

  get getLastName(): AbstractControl {
    return this.user.get('lastName');
  }

  get getBirthDate(): AbstractControl {
    return this.user.get('birthDate');
  }

  get getEmail(): AbstractControl {
    return this.user.get('email');
  }

  saveChanges() {
    const userUpdate = this.renderUserModel();

    this.usersService.updateUser(this.getId.value, userUpdate)
      .subscribe(
        () => {
          this.router.navigate(['/users'], {
            queryParams: {
              sort: 'latest',
              page: 1,
              max: 50
            }
          });
        },
        error => {
          if (error instanceof BadRequestError) {
            console.log('Bad Request.');
          }
          return throwError(error);
        }
      );
  }

  renderUserModel(): IUserUpdate {
    const userUpdate: IUserUpdate = {
      firstName: null,
      lastName: null,
      birthDate: null,
      email: null
    };

    for (const key in userUpdate) {
      if (userUpdate.hasOwnProperty(key)) {
        userUpdate[key] = this.user.get(key).value;
      }
    }

    return userUpdate;
  }
}
