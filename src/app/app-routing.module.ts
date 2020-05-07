import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './@component/user/login/login.component';
import { RegisterComponent } from './@component/user/register/register.component';
import { HomeComponent } from './@component/home/home.component';
import { ShopsComponent } from './@component/home/shops/shops.component';
import { UsersComponent } from './@component/home/users/users.component';
import { SubscribesComponent } from './@component/home/subscribes/subscribes.component';
import { UserShopsComponent } from './@component/home/user-shops/user-shops.component';
import { AuthGuard } from './@guards/user.guard';
import { AdminGuard } from './@guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard],children:[
    { path: '', redirectTo: 'shops', pathMatch: 'full' },
    { path: 'shops', component: ShopsComponent},
    { path: 'shop', component: ShopsComponent},
    { path: 'users', component: UsersComponent,canActivate: [AdminGuard]},
    { path: 'subscibtion', component: SubscribesComponent,canActivate: [AdminGuard]},
    { path: 'userShops', component:UserShopsComponent,canActivate: [AdminGuard]},
 ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
