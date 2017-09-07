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

  /**
   * Verifica se o usuário pode acessar a rota /notes. É executado sempre que a rota é disparada.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Promise<boolean>}
   * @memberof AuthGuardService
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;

    console.log("auth.gaurd");
    console.log("De: " + this.rota.url);
    console.log("Para: " + state.url);

    return new Promise(resolve => {
      this.checkLogin().then(res => {
        if(res != null){
          console.log("notes");
          resolve(true);
          return true;
        }
        this.rota.navigate(["/login"]);
        resolve(false);
        return false;
      });

    });

  }

  /**
   * Consulta o authService para verificar a situação do login do usuário.
   *
   * @returns {Promise<{}>}
   * @memberof AuthGuardService
   */
  public checkLogin(): Promise<{}> {
    return new Promise(resolve => {
      const promise = this.authService.isLogged();
      promise.then(res => {
        resolve(res);
      });
    });
  }

}// Fim do authguard
