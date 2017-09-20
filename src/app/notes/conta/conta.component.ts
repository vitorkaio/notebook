import { OkService } from '../dialogs/ok-dialogs/ok.service';
import { AuxiliarService } from '../../shared/services/auxiliar.service';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.sass']
})
export class ContaComponent implements OnInit {

  private ok: any;
  public email: string = '';

  constructor(private authService: AuthService, private auxService: AuxiliarService, private okService: OkService) {
    this.auxService.getUsuarioLogado().then(res => {
      this.email = this.auxService.getUserFromEmail(res);
    });
  }

  ngOnInit() {
    this.ok = this.okService;
  }

  public deletarConta(){
    this.okService
    .confirm(this.email, 'Tem certeza que deseja deletar a conta?')
    .subscribe(res => {
      if(res == true){
        this.authService.removeConta(this.email).then(res => {
          if(res)
            this.auxService.goRouteLogin();
          else{
            // Se dar algum erro, avisa o usuário.
            this.ok
            .confirm('Aviso!', 'Não foi possível deletar a conta no momento')
            .subscribe(res => {
              ;
            });
          }
        });
      }
    });
  }

}
