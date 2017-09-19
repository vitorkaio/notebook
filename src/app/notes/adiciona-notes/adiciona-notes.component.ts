import { INoteCanDiactive } from './../../shared/models/deacativeNote';
import { OkService } from '../dialogs/ok-dialogs/ok.service';
import { NotasService } from '../../shared/services/notas.service';
import { AuxiliarService } from '../../shared/services/auxiliar.service';
import { AuthService } from './../../shared/services/auth.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { INota } from './../../shared/models/nota';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from "../dialogs/confirm-dialogs/dialogs.service";
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adiciona-notes',
  templateUrl: './adiciona-notes.component.html',
  styleUrls: ['./adiciona-notes.component.sass']
})
export class AdicionaNotesComponent implements OnInit, INoteCanDiactive  {

  public texto: string;
  public result: any;
  private subs: Subscription;

  private nota: string = '';

  constructor(private dialogsService: DialogsService, private fireBaseService: FirebaseService,
    private authService: AuthService, private auxiliarService: AuxiliarService, private route: ActivatedRoute,
    private notasServices: NotasService, private okDialogService: OkService) { }

  public ngOnInit() {
    /*this.subs = this.route.params.subscribe((params: any) => {
      let titulo = params['titulo'];
      if(titulo != undefined){
        let note = this.notasServices.getNotaListaWithChave(titulo)
        note.then(res => {
          console.log(res['info']);
          this.texto = res['info']['nota'];
          this.nota = res['titulo'];
        });
      }

  });*/
  this.subs = this.route.data.subscribe((info) => {
    for (var key in info) {
      if (info.hasOwnProperty(key)) {
        this.texto = info[key]['info']['nota']
        this.nota = info[key]['titulo']
      }
   }
    //this.texto = info.aluno;
  });
  }

  /**
   * Salva a nota.
   *
   * @memberof AdicionaNotesComponent
   */
  public salvarTexto(): void{
    this.openDialog();
  }

  /**
   * Abre o modal de inserção do título e chama o método que irá gravar a nota no firebase.
   *
   * @memberof AdicionaNotesComponent
   */
  public openDialog() {
    this.dialogsService
      .confirm('Confirmação...', 'Qual é o título da nota?', this.nota)
      .subscribe(res => {
        if(res == undefined || res == false || this.texto == null || this.texto == undefined){
          console.log('Erro, precisa de título e uma nota');
        }

        else{

          let nota: INota = {};
          this.authService.isLogged().then(dados => {
            nota.usuario = dados['email'].toString();
            nota.titulo = res;

            // Retirando a barra do título para evitar erro no firebase.
            if( nota.titulo.indexOf('/') != -1){
              console.log('Tem a -> /');
              nota.titulo =  nota.titulo.substr(0,  nota.titulo.indexOf('/'));
            }

            nota.nota = this.texto.toString();

            // console.log(nota.titulo);
            // console.log(nota.nota);

            let date = new Date();
            nota.data = date.toLocaleDateString();
            nota.hora = date.toLocaleTimeString();

            let promise = this.fireBaseService.addNota(nota);
            promise.then(res => {
              if(res == true){
                console.log('Nota - salva');
                this.texto = null;
                this.auxiliarService.goRouteNotes();
              }
              else{
                console.log('Nota - falha ao salvar nota');
              }

            });
          })// auth;

        }// else

      });
  }

  public limparTexto(){
    this.okDialogService
    .confirm('Confirmação...', 'Tem certeza que deseja limpar a nota?')
    .subscribe(res => {
      if(res == true){
        this.texto = null;
        this.nota = '';
      }
    });
  }

    public podeDesativar(): Promise<boolean> | boolean{
      console.log('Saindoooo do add');
      // Verifica se o campo está vazio, se estiver, sai.
      if(this.texto == null){
        return true;
      }

      return new Promise(resolve => {
        this.okDialogService
        .confirm('Confirmação...', 'Tem certeza que deseja sair?')
        .subscribe(res => {
          resolve(res);
        });
      });

    }

}
