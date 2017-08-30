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

import { Router } from '@angular/router';

@Component({
  selector: "app-cadastrar",
  templateUrl: "./cadastrar.component.html",
  styleUrls: ["./cadastrar.component.sass"]
})
export class CadastrarComponent implements OnInit {

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

  // Cadastra usuário no sistema.
  public cadastrar(){
    //console.log(this.formulario);

    this.display = true;

      setTimeout(function(){}, 6000);

    if(this.formulario.valid){
      let usuario: IUsuario = {};
      usuario.email = this.formulario.value.email;
      usuario.senha = this.formulario.value.senha;

      const promise = this.authService.cadastarUsuario(usuario)

      promise.then(res => {
        console.log('cadastrar-componente')
        console.log(res);

        // Verifica se o email já existe no sistema.
        if(res['code']){
          if(res['code'] == 'auth/email-already-in-use'){
            this.userExist = true;
          }

        }

        else{
          this.formulario.reset();
          this.userExist = false;
          this.rota.navigate(['/notes']);
        }

      this.display = false;


      }).catch(er => {
        console.log('cadastrar-componente')
        console.log(er);
      });


    }

  }// Fim do cadastrar

  // ************************************ Trata erros do form ************************************

  public verificaRequired(campo: any){
    if(this.formulario.get(campo).errors != null)
      return this.formulario.get(campo).errors['required'] && this.formulario.get(campo).touched ? true : !true;
  }

  public verificaEmail(email: any){
    if(this.formulario.get(email).errors != null)
      return this.formulario.get(email).errors['email'] && this.formulario.get(email).touched ? true : !true;
  }

  public minSenhaRequired(senha: any){
    if(this.formulario.get(senha).errors != null)
      return this.formulario.get(senha).errors['minlength'] && this.formulario.get(senha).touched ? true : !true;
  }

}// Fim do componente cadastrar.
