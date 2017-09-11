import { INota } from './../models/nota';
import { AuxService } from './aux.service';
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

  constructor(private af: AngularFireDatabase, private auxService: AuxService) { }

  /**
   * Adiciona uma nota no firebase
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
        // nota.titulo = this.auxService.encriptaMsg(nota.titulo);
        // nota.nota = this.auxService.encriptaMsg(nota.nota);
        // nota.data = this.auxService.encriptaMsg(nota.data);
        // nota.hora = this.auxService.encriptaMsg(nota.hora);

        let usersRef = this.af.database.ref("/");
        usersRef.child("/notas").update({
            [nota.usuario]: {
                "titulo": nota.titulo,
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

}// Fim da classe FirebaseService
