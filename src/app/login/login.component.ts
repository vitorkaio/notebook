import { IUsuario } from './../shared/models/usuario';
import { LoginService } from './../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    private formulario: FormGroup;
    private loginFail: boolean = false;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

    public ngOnInit() {
        this.formulario = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(4)]],
            senha: [null, [Validators.required]]
        });
    }

    // ************************************ Trata erros do form ************************************
    
    // Verifica o erro relaciona ao required.
    public trataErroRequired(campo: any): boolean{
        if(this.formulario.get(campo).errors != null)
            return this.formulario.get(campo).errors['required'] && this.formulario.get(campo).touched ? true : false;
    }

    // Verifica o erro relacionador ao minLenght do nome.
    public trataErroMinLenght(campo: any): boolean{
        if(this.formulario.get(campo).errors != null)
            return this.formulario.get(campo).errors['minlength'] && this.formulario.get(campo).touched ? true : false;
    }

    // Verifica o erro relacionado ao email.
    public trataErroEmail(campo: any): boolean{
        if(this.formulario.get(campo).errors != null)
            return this.formulario.get(campo).errors['email'] && this.formulario.get(campo).touched ? true : false;
    }

    // ************************************ Submit ************************************
    public onFormSubmit() { 
        console.log(this.formulario);
        if(this.formulario.valid){
            let usuario: IUsuario = {};
            usuario.nome = this.formulario.value.nome;
            usuario.senha = this.formulario.value.senha;

            this.loginService.doLogin(usuario.nome, usuario.senha).then(dados => {
                console.log(dados);
                dados ? this.loginFail = false : this.loginFail = true;
            });
        }
        else{
            alert('Formulário inválido');
        }
    }

}
