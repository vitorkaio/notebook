import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

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

  constructor() { }

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
    return email.substr(0, email.indexOf('@'));
  }

}