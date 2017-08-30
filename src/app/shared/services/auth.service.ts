import { AngularFireAuth } from 'angularfire2/auth';
import { IUsuario } from '../models/usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private af: AngularFireAuth, private rota: Router) {

  }

  // Cadastra um usuário no firebase.
  public cadastarUsuario(usuario: IUsuario){

    return new Promise(res =>{
      console.log(usuario);
      const promise = this.af.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);

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

  }// Fim do cadastarUsuario

  // Faz o login no sistema.
  public doLogin(usuario: IUsuario){

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

  // Verifica se um usuário está logado no sistema.
  public isLogged(){
    return new Promise(res => {
      this.af.auth.onAuthStateChanged(state => {
        res(state);
       });
    });
  }

  // Faz o logout do sistema.
  public doLogout(){
    this.af.auth.signOut();
    this.rota.navigate(['/login']);
  }


}// Fim do servico auth.
