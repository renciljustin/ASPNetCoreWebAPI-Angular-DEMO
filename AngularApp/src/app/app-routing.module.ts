import { NoAccessComponent } from './components/shared/no-access/no-access.component';
import { ModeratorGuard } from './guards/moderator.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ManageComponent } from './components/manage/manage.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard, ModeratorGuard] },
  { path: 'users/create/:id', component: UserCreateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/edit/:id', component: UserUpdateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'no-access', component: NoAccessComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
