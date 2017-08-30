import { IUsuario } from '../models/usuario';
import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(private af: AngularFireAuth) {

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

  }

}// Fim do servico auth.
