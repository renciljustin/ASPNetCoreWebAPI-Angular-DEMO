import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { IUserList } from 'src/app/shared/interfaces/IUserList';
import { Router } from '@angular/router';
import { BadRequestError } from '../../shared/error-handling/bad-request.error';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: IUserList[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  deleteUser(user: IUserList) {
    if (confirm('Are you sure to delete this user?')) {

      const index = this.users.indexOf(user);
      this.users.splice(index, 1);

      this.usersService.deleteUser(user.id)
        .subscribe(
          null,
          error => {
            if (error instanceof BadRequestError) {
              console.log('Bad Request.');
            }

            this.users.splice(index, 0, user);

            return throwError(error);
          }
        );
    }
  }
}
