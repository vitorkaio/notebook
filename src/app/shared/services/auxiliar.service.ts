import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';

// npm install crypto-js --save

/**
 * Classe que possue funções auxiliadoras.
 *
 * @export
 * @class AuxiliarService
 */
@Injectable()
export class AuxiliarService {

  private secret: string = 'minha-mv';

  constructor(private rota: Router, private authService: AuthService) { }

  /**
   * Método responsavél por encriptar uma mensagem.
   *
   * @param {string} msg
   * @returns {string}
   * @memberof AuxService
   */
  public encriptaMsg(msg: string): string {
    let ciphertext = crypto.AES.encrypt(msg, this.secret);
    return ciphertext.toString();
    // console.log(ciphertext.toString());
  }

  /**
   * Método que desencripta uma mensagem.
   *
   * @param {string} msg
   * @returns {string}
   * @memberof AuxService
   */
  public desencriptaMsg(msg: string): string {
    let bytes  = crypto.AES.decrypt(msg.toString(), this.secret);
    let plaintext = bytes.toString(crypto.enc.Utf8);
    // console.log(plaintext);
    return plaintext;
  }


  /**
   * Retira do email o nome do usuário para salvar no firebase.
   * Ex: vih@email.com -> vih.
   *
   * @param {string} email
   * @returns {string}
   * @memberof AuxService
   */
  public getUserFromEmail(email: string): string {
    let user = email.split('.').join('');
    user = user.split('@').join('');
    user = user.split('_').join('');
    user = user.split('-').join('');
    return user;
  }

  /**
   * Redireciona pra rota /notes.
   *
   * @memberof AuxiliarService
   */
  public goRouteNotes(){
    this.rota.navigate(['/notes']);
  }

  /**
   * Vai pra rota de login.
   *
   * @memberof AuxiliarService
   */
  public goRouteLogin(){
    this.rota.navigate(['/login']);
  }

  /**
   * Vai para rota deletar conta.
   *
   * @memberof AuxiliarService
   */
  public goRouteConta(){
    this.rota.navigate(['/notes/conta']);
  }

  /**
   * Retorna o usuário logado no sistema.
   *
   * @returns {Promise<string>}
   * @memberof AuxiliarService
   */
  public getUsuarioLogado(): Promise<string>{
    return new Promise(resolve => {
      this.authService.isLogged().then(res => {
        try{
          let email = res['email'];
          // Verifica se o email foi verificado.
          if(res['emailVerified'])
            resolve(res['email']);
          else
            resolve(null);
        // resolve(res['email']);
      }
      catch(err){
        resolve(null);
      }
      });
    });
  }

}
