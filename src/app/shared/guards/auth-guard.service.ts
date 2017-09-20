import { NotasService } from '../services/notas.service';
import { INoteCanDiactive } from "./../models/deacativeNote";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanDeactivate,
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<INoteCanDiactive>, Resolve<any> {

  constructor(private rota: Router, private authService: AuthService, private notasService: NotasService) {}

  /**
   * Verifica se o usuário pode acessar a rota /notes. É executado sempre que a rota é disparada.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Promise<boolean>}
   * @memberof AuthGuardService
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let url: string = state.url;

    console.log("auth.gaurd");
    console.log("De: " + this.rota.url);
    console.log("Para: " + state.url);

    return new Promise(resolve => {
      this.checkLogin().then(res => {

        // Verifica se o usuário está cadastrado e autentica o mesmo.
        if (res != null) {
          // Verifica se o usuário confirmou o email.
          console.log('Email - verify: ' + res['emailVerified']);
          if(res['emailVerified']){
            resolve(true);
            return true;
          }
          else{
            this.rota.navigate(['/verificaemail'])
            resolve(false);
            return false;
          }
        }
        this.rota.navigate(["/login"]);
        resolve(false);
        return false;
      });
    });
  }

  public canDeactivate(
    component: INoteCanDiactive,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("AlunoGuardsDeactivateService: canDeactivate");

    /*if(component.mudouCampo)
        return false;*/

    //return component.changeRouter ? component.changeRouter() : true;
    return component.podeDesativar ? component.podeDesativar() : true;
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {

        console.log('Editar nota: Resolve');

        let nota = route.params['titulo'];

        return this.notasService.getNotaListaWithChave(nota);
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
} // Fim do authguard
