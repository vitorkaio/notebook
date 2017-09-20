import { IUsuario } from '../../shared/models/usuario';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import {MaterializeAction} from 'angular2-materialize';

import { Router } from '@angular/router';

/**
 *
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;
  public userExist: boolean = false;
  public display: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private rota: Router) {}

  public ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]]
    });
  }


  /**
   * Faz o login no sistema.
   *
   * @memberof LoginComponent
   */
  public login(){
    //console.log(this.formulario);
    this.display = true;

    if(this.formulario.valid){
      let usuario: IUsuario = {};

      usuario.email = this.formulario.value.email;
      usuario.senha = this.formulario.value.senha;

      const promise = this.authService.doLogin(usuario)

      promise.then(res => {
        //console.log('login-componente')
        //console.log(res);

        // Verifica se o email já existe no sistema.
        if(res['code']){
          if(res['code'] == 'auth/wrong-password' || res['code'] == 'auth/user-not-found'){
            this.userExist = true;
          }
        }
        else{
          //console.log('redirect for notes');
          this.formulario.reset();
          this.userExist = false;
          this.rota.navigate(['/notes']);
        }

      this.display = false;

      }).catch(er => {
        //console.log('cadastrar-componente')
        //console.log(er);
      });

    }

  }// Fim do login

  // ************************************ Trata erros do form ************************************


  /**
   * Verifica se o campo está em branco
   *
   * @param {*} campo
   * @returns {boolean}
   * @memberof LoginComponent
   */
  public verificaRequired(campo: any): boolean{
    if(this.formulario.get(campo).errors != null)
      return this.formulario.get(campo).errors['required'] && this.formulario.get(campo).touched ? true : !true;
  }


  /**
   * Verifica se o email é válido.
   *
   * @param {*} email
   * @returns {boolean}
   * @memberof LoginComponent
   */
  public verificaEmail(email: any): boolean{
    if(this.formulario.get(email).errors != null)
      return this.formulario.get(email).errors['email'] && this.formulario.get(email).touched ? true : !true;
  }


  /**
   * Verifica se a senha possui 6 dígitos.
   *
   * @param {*} senha
   * @returns {boolean}
   * @memberof LoginComponent
   */
  public minSenhaRequired(senha: any): boolean{
    if(this.formulario.get(senha).errors != null)
      return this.formulario.get(senha).errors['minlength'] && this.formulario.get(senha).touched ? true : !true;
  }


  /**
   * limpa o erro de credencial existente.
   *
   * @memberof LoginComponent
   */
  public limpaErroCredencial(): void{
    this.userExist = false;
  }

}// Fim do login componente
