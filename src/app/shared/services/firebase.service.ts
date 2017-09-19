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
        //  nota.titulo = this.auxService.encriptaMsg(nota.titulo);
        //  nota.nota = this.auxService.encriptaMsg(nota.nota);
        //  nota.data = this.auxService.encriptaMsg(nota.data);
        //  nota.hora = this.auxService.encriptaMsg(nota.hora);
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
  public getAllNotes(email: string): Promise<[any]> {
    return new Promise(resolve => {
      let refs = this.af.database.ref('/notas/' + email);
      refs.on('value', (snapshot) => {
          resolve(snapshot.val());
          });
      });
  }

  public removeNota(user, titulo){
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

}// Fim da classe FirebaseService
