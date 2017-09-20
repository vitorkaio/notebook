import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUsuario } from '../models/usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Classe responsável por consultar os dados do usuário no firebase, como estado de login, realizar o login,
 * logout e etc.
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {

  constructor(private af: AngularFireAuth, private rota: Router, private db: AngularFireDatabase) {

  }

  /**
   * Retorna uma promessa se o usuário foi cadastrado ou não. Em caso afirmativo retorna um objeto, caso
   * contrário retorna null.
   *
   * @param {IUsuario} usuario
   * @returns {Promise<{}>}
   * @memberof AuthService
   */
  public cadastarUsuario(usuario: IUsuario): Promise<{}>{

    return new Promise(res =>{
      console.log(usuario);
      const promise = this.af.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);

      promise.then(r => {
        //console.log(r);
        return new Promise(resolve => {
          this.af.auth.onAuthStateChanged(status =>{
            status.sendEmailVerification();
            res(r);
          });
        });
      }).catch(er => {
        //console.log(er);
        return new Promise(resolve => {
          res(er);
        });
      });

    });

  }// Fim do cadastarUsuario

  /**
   * Faz o login no sistema.
   *
   * @param {IUsuario} usuario
   * @returns {Promise<{}>}
   * @memberof AuthService
   */
  public doLogin(usuario: IUsuario): Promise<{}>{

    return new Promise(res => {
      const promise = this.af.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
      promise.then(r => {
        //console.log(r);
        return new Promise(resolve => {
          res(r);
        });
      }).catch(er => {
        //console.log(er);
        return new Promise(resolve => {
          res(er);
        });
      });

    });

  }// doLogin

  /**
   * Verifica se um usuário está logado no sistema.
   *
   * @returns {Promise<{}>}
   * @memberof AuthService
   */
  public isLogged(): Promise<{}>{

    return new Promise(res => {
      this.af.auth.onAuthStateChanged(state => {
        //console.log(state);
        res(state);
       });
    });
  }


  /**
   * Faz o logout do sistema
   *
   * @memberof AuthService
   */
  public doLogout(): void{
    this.af.auth.signOut();
    this.rota.navigate(['/login']);
  }

  /**
   * Remove um usuário do sistema.
   *
   * @returns {Promise<boolean}
   * @memberof AuthService
   */
  public removeConta(email: string): Promise<boolean>{
    return new Promise(resolve => {
      let usuario = this.af.auth.currentUser;
      usuario.delete().then(() => {
        // Deleta os dados do banco de dados tb.
        let usersRef = this.db.database.ref("/");
        usersRef.child("/notas/" + email).remove().then(res =>{
          resolve(true);
        }).catch(err => {
          resolve(false);
        });
      }, (error) => {
        resolve(false);
      });
    });
  }

}// Fim do servico auth.
/*let usersRef = this.af.database.ref("/");
      usersRef.child("/notas/" + email).remove().then(res => {
        resolve(true);
      }).catch(err => {
        resolve(false);
      });
    }); */
