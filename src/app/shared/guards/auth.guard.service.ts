import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        console.log('auth.gaurd: ' + url);
        if(this.checkLogin(url)){
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    checkLogin(url: string): boolean {
        return this.loginService.isLogged();
    }
}