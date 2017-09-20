import { AuxiliarService } from './auxiliar.service';
import { INota } from './../models/nota';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * CLasse que fica responsável por gravar e carregar as notas do banco de dados firebase.
 *
 * @export
 * @class FirebaseService
 */
@Injectable()
export class FirebaseService {

  constructor(private af: AngularFireDatabase, private auxService: AuxiliarService) { }

  /**
   * Adiciona uma nota no firebase.
   *
   * @param {INota} nota
   * @returns {Promise<boolean>}
   * @memberof FirebaseService
   */
  public addNota(nota: INota): Promise<boolean>{
    //
    return new Promise(resolve => {
      if (nota != null) {
        console.log('Salvando nota');
        // Encripta dados.
        //nota.titulo = this.auxService.encriptaMsg(nota.titulo);
        nota.nota = this.auxService.encriptaMsg(nota.nota);
        nota.data = this.auxService.encriptaMsg(nota.data);
        nota.hora = this.auxService.encriptaMsg(nota.hora);

        nota.usuario = this.auxService.getUserFromEmail(nota.usuario);
        let usersRef = this.af.database.ref("/");
        usersRef.child("/notas/" + nota.usuario).update({
            [nota.titulo]: {
                "nota": nota.nota,
                "data": nota.data,
                "hora": nota.hora
            }

        }).catch(err=>{
          console.log(err);
        });
        resolve(true);
    }

    else
        resolve(false);
    });
  }

  /**
   * Retorna todas as notas do usuário logado.
   *
   * @param {string} email email do usuário que logou no sistema.
   * @returns {Promise<[any]>}
   * @memberof FirebaseService
   */
  public getAllNotes(email: string): Promise<any[]> {
    return new Promise(resolve => {
      let refs = this.af.database.ref('/notas/' + email);
      refs.on('value', (snapshot) => {
          //resolve(snapshot.val());
          let aux = snapshot.val();
          let lista: any[] = [];

          for (var key in aux) {
            if (aux.hasOwnProperty(key)) {
              lista.push({'titulo':  key, 'info': aux[key]});
               //console.log(key, res[key]);
            }
         }
         for(let i in lista){
           //console.log(lista[i].info);
          lista[i].info.data = this.auxService.desencriptaMsg(lista[i].info.data);
          lista[i].info.hora = this.auxService.desencriptaMsg(lista[i].info.hora);
          lista[i].info.nota = this.auxService.desencriptaMsg(lista[i].info.nota);
         }
         resolve(lista);
          });
      });
  }

  /**
   * Remove uma nota do banco de dados.
   *
   * @param {any} user - Usuário que terá a nota deletada.
   * @param {any} titulo - Título da nota que será deleteada.
   * @returns {Promise<boolean>} - Retorna uma promessa do tipo boolean
   * @memberof FirebaseService
   */
  public removeNota(user, titulo): Promise<boolean>{
    return new Promise(resolve => {
      let usersRef = this.af.database.ref("/");
      usersRef.child("/notas/" + user + "/" + titulo).remove().then(res => {
        console.log(res);
        resolve(true);
      }).catch(err => {
        resolve(false);
      });
    });

  }

  /**
   * Remove o usuário e suas notas do banco de dados.
   *
   * @param {string} email
   * @returns {Promise<boolean>}
   * @memberof FirebaseService
   */
  public removeNotasDoUsuarioDeletado(email: string): Promise<boolean>{
    return new Promise(resolve => {
      let usersRef = this.af.database.ref("/");
      usersRef.child("/notas/" + email).remove().then(res => {
        resolve(true);
      }).catch(err => {
        resolve(false);
      });
    });
  }

}// Fim da classe FirebaseService
