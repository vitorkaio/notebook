import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private rota: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;

    console.log("auth.gaurd");
    console.log("De: " + this.rota.url);
    console.log("Para: " + state.url);

    return new Promise(resolve => {

      this.checkLogin(url).then(res => {
        if(res != null){
          console.log("notes");
          resolve(true);
          return true;
        }
        console.log('not user logged');
        this.rota.navigate(["/login"]);
        resolve(false);
        return false;
      });

    });

  }

  // Arrumar Isso aqui.
  public checkLogin(url: string) {
    return new Promise(resolve => {
      const promise = this.authService.isLogged();
      promise.then(res => {
        resolve(res);
      });
    });
  }

}// Fim do authguard
