import { IUsuario } from './../../shared/models/usuario';
import { LoginService } from './../../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

@Component({
    selector: 'app-cadastrar',
    templateUrl: './cadastrar.component.html',
    styleUrls: ['./cadastrar.component.sass']
})
export class CadastrarComponent implements OnInit {

    private formulario: FormGroup;
    private nomeExiste: boolean = false;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

    public ngOnInit() {
        this.formulario = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(4)]],
            email: [null, [Validators.required, Validators.email]],
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
            usuario.email = this.formulario.value.email;
            usuario.senha = this.formulario.value.senha;
            this.loginService.cadastraUsuario(usuario).then(dados => {
                console.log("cadastrarComponente: ");
                if(dados == false)
                    this.nomeExiste = true;
                else
                    this.nomeExiste = false;
            });
        }
        else{
            alert('Formulário inválido');
        }
    }

}
