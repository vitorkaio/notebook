import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-cadastrar",
  templateUrl: "./cadastrar.component.html",
  styleUrls: ["./cadastrar.component.sass"]
})
export class CadastrarComponent implements OnInit {
  public formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  // Cadastra usuário no sistema.
  public cadastrar(){

  }

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
