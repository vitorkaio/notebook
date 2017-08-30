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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    console.log("auth.gaurd");
    console.log("De: " + this.rota.url);
    console.log("Para: " + state.url);

    if (this.checkLogin(url) != null) {
      console.log("notes");
      return true;
    }

    console.log('not user logged');
    this.rota.navigate(["/login"]);
    return false;
  }

  // Arrumar Isso aqui.
  public checkLogin(url: string) {
    this.authService.isLogged().then(resolve => {
      console.log(resolve);
      return resolve;
    });

  }

}// Fim do authguard
