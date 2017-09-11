import { AuthService } from './../../shared/services/auth.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { INota } from './../../shared/models/nota';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from "../dialogs/confirm-dialogs/dialogs.service";

@Component({
  selector: 'app-adiciona-notes',
  templateUrl: './adiciona-notes.component.html',
  styleUrls: ['./adiciona-notes.component.sass']
})
export class AdicionaNotesComponent implements OnInit {

  public texto: string;
  public result: any;

  constructor(private dialogsService: DialogsService, private fireBaseService: FirebaseService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  public salvarTexto(): void{
    this.openDialog();
  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirmação...', 'Qual é o título da nota?')
      .subscribe(res => {
        if(res == undefined || res == false || this.texto == null || this.texto == undefined){
          console.log('Erro, precisa de título e uma nota');
        }

        else{

          let nota: INota = {};
          this.authService.isLogged().then(dados => {
            nota.usuario = dados['email'].toString();
            nota.usuario = nota.usuario.substr(0, nota.usuario.indexOf('@'));
            nota.titulo = res;
            nota.nota = this.texto.toString();

            console.log(nota.titulo);
            console.log(nota.nota);

            let date = new Date();
            nota.data = date.toLocaleDateString();
            nota.hora = date.toLocaleTimeString();

            let promise = this.fireBaseService.addNota(nota);
            promise.then(res => {
              if(res == true){
                console.log('Nota - salva');
              }
              else{
                console.log('Nota - falha ao salvar nota');
              }

            });
          })// auth;

        }// else

      });
  }

}
