import { AdminGuard } from './guards/admin.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { AuthGuard } from './guards/auth.guard';
import { AppErrorHandler } from './components/shared/error-handling/app-error-handler.error';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageComponent } from './components/manage/manage.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { UsersService } from './services/users.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NoAccessComponent } from './components/shared/no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserUpdateComponent,
    AdminComponent,
    ManageComponent,
    NoAccessComponent,
    NoAccessComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    UsersService,
    AuthGuard,
    AdminGuard,
    ModeratorGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
