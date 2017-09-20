import { NotasService } from '../../shared/services/notas.service';
import { OkService } from '../dialogs/ok-dialogs/ok.service';
import { AuxiliarService } from '../../shared/services/auxiliar.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Component, OnInit, OnChanges, DoCheck, ViewChild } from '@angular/core';
import {MdPaginator} from '@angular/material';

@Component({
  selector: 'app-lista-notes',
  templateUrl: './lista-notes.component.html',
  styleUrls: ['./lista-notes.component.sass']
})
export class ListaNotesComponent implements OnInit, OnChanges, DoCheck {

  public listaNotas: any[] = [];
  public listaFiltro: any[] = [];
  public display: boolean = true;
  public usuario: string;

  public ordernacaoValue: string;
  public ordernacoes = [
    {value: '0', viewValue: 'Recentes'},
    {value: '1', viewValue: 'Antigas'},
    {value: '2', viewValue: 'Título'}
  ];

  public notasVazias: boolean = false;

  constructor(private firebaseService: FirebaseService, private auxiliarService: AuxiliarService,
  private okDialogService: OkService, private notasService: NotasService){}

  ngOnInit() {
    //console.log('init lista');
    this.auxiliarService.getUsuarioLogado().then(res => {
      this.usuario = this.auxiliarService.getUserFromEmail(res);
      this.firebaseService.getAllNotes(this.usuario).then(res => {
        if(res.length == 0)
          this.notasVazias = false;
        else
          this.notasVazias = true;

        this.listaNotas = res;
        /*for (var key in res) {
          if (res.hasOwnProperty(key)) {
            this.listaNotas.push({'titulo': key, 'info': res[key]});
             ////console.log(key, res[key]);
          }
       }*/
       this.display = false;
       this.notasService.initNotas(this.listaNotas);
       this.listaFiltro = this.listaNotas;
      });
    });
  }

  ngOnChanges(){
    //console.log('change component lista');
  }

  ngDoCheck(){
    ////console.log('check component lista');
  }

  /**
   * Deleta uma nota.
   *
   * @param {any} nota
   * @memberof ListaNotesComponent
   */
  public deletaNota(nota){
      this.openModalOkDialog(nota);
  }

  /**
   * Abre um modal para confirmação de ok.
   *
   * @param {any} nota
   * @memberof ListaNotesComponent
   */
  public openModalOkDialog(nota){
    this.okDialogService
    .confirm('Confirmação...', 'Tem certeza que deseja deletar a nota?')
    .subscribe(res => {
      if(res == true){
        this.firebaseService.removeNota(this.usuario, nota.titulo).then(res => {
          //console.log(res);
          if(res == true){
            this.listaNotas.forEach((item, key) => {
             if(item.titulo == nota.titulo){
               this.listaNotas.splice(key, 1);
               this.listaFiltro = this.listaNotas;
               // Verifica se a lista está vazia.
                //console.log(this.listaNotas.length);
                if(this.listaNotas.length == 0){
                  //console.log('Lista vazia');
                  this.notasVazias = false;
                }
                else
                  this.notasVazias = true;
             }
            });
          }
        });
      }
    });
  }

  /**
   * Filtra a lista de notas pelo título.
   *
   * @param {string} filtro
   * @memberof ListaNotesComponent
   */
  public filtraNotas(filtro: string){
    this.ordernacaoValue = null;
    this.listaNotas = [];
    this.listaFiltro.forEach((item, key) => {
      if(item.titulo.toLowerCase().startsWith(filtro.toLowerCase())){
        this.listaNotas.push(this.listaFiltro[key]);
      }
    });
    if(filtro == ''){
      this.ordernacaoValue = '2';
      this.ordenar();
      this.ordernacaoValue = null;
    }
  }

  /**
   * Ordena a lista de notas.
   *
   * @memberof ListaNotesComponent
   */
  public ordenar(){
    //console.log('Escolha: ' + this.ordernacaoValue);
    if(this.ordernacaoValue == '0'){
      //console.log('recentes');
      this.listaNotas.sort(this.comparaDataRecente);
    }
    else if(this.ordernacaoValue == '1'){
      //console.log('antigas');
      this.listaNotas.sort(this.comparaDataAntigas);
    }
    else{
      //console.log('titulo');
      this.listaNotas.sort(this.comparaTitulo);
    }

  }

  /**
   * Faz uma comparações de datas pelas mais antigas.
   *
   * @param {any} a
   * @param {any} b
   * @returns
   * @memberof ListaNotesComponent
   */
  public comparaDataAntigas(a, b){
    let dateA = new Date(a.info.data.split('/').reverse().join('/'));
    let dateB = new Date(b.info.data.split('/').reverse().join('/'));

    if (dateA < dateB)
      return -1;

    if (dateA > dateB)
      return 1;

      return 0;
  }

  /**
   * Faz uma comparações de datas pelas mais recentes.
   *
   * @param {any} a
   * @param {any} b
   * @returns
   * @memberof ListaNotesComponent
   */
  public comparaDataRecente(a, b){
    let dateA = new Date(a.info.data.split('/').reverse().join('/'));
    let dateB = new Date(b.info.data.split('/').reverse().join('/'));

    if (dateA > dateB)
      return -1;

    if (dateA < dateB)
      return 1;

      return 0;
  }

  /**
   * Faz uma comparações pelos títulos.
   *
   *
   * @param {any} a
   * @param {any} b
   * @returns
   * @memberof ListaNotesComponent
   */
  public comparaTitulo(a, b){
    if (a.titulo < b.titulo)
      return -1;

    if (a.titulo > b.titulo)
      return 1;

      return 0;
  }

}// Fim do componente
