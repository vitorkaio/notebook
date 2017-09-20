import { AuxiliarService } from '../services/auxiliar.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

@Injectable()
export class LoginAuthGuardService implements CanActivate {

  constructor(private rota: Router, private auxiliarService: AuxiliarService) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean{

    let url: string = state.url;

    return new Promise(resolve => {
      this.auxiliarService.getUsuarioLogado().then(res => {

        // Se o usuario estiver logado não permite ele acessar a tela de login ou cadastro.
        // Só permite se o email ainda não foi verificado.
        //console.log("login.auth.guard");
        //console.log(res);
        if(res == null){
          resolve(true);
        }
        else{
          resolve(false);
          this.rota.navigate(["/notes"]);
        }
      });
    });
  }

}// Fim do serviço
