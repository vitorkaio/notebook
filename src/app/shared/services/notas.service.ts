import { Injectable } from '@angular/core';

@Injectable()
export class NotasService {

  private notas: any[] = [];

  constructor() { }

  /**
   * Inicia o array de notas.
   *
   * @param {any[]} lista
   * @memberof NotasService
   */
  public initNotas(lista: any[]){
    this.notas = lista;
  }

  public getNotaListaWithChave(titulo: string){
    return new Promise(resolve => {
      this.notas.forEach((item, key) => {
        if(item.titulo == titulo){
          resolve(this.notas[key]);
        }
      });
    });
  }

}
