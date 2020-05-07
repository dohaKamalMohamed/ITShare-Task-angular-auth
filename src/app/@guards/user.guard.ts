// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../@service/auth.service';
import { User } from 'src/app/@models/user';


@Injectable()


export class AuthGuard implements CanActivate {
    currentUser:User;
    constructor( private router: Router,private authService:AuthService) { 
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa',this.currentUser)
        if(this.currentUser){
            return true
        }
        else{
            this.router.navigate(['/login']);
            return false
        }
        
    }
}
