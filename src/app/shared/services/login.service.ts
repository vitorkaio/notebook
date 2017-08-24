import { IUsuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class LoginService {

    // Para testar antes de fazer o servidor.
    private usuarios: IUsuario[] = [];
    private user: IUsuario = {};

    constructor(private route: ActivatedRoute, private rota: Router) { 
        this.user.id = 1;
        this.user.nome = 'vih';
        this.user.email = 'vih@gmail.com';
        this.user.senha = 'vih';
        this.user.tipo = 'a';

        this.usuarios.push(this.user);
    }

    // Cadastra o usuário no sistema.
    public cadastraUsuario(usuario: IUsuario): boolean{
        usuario.id = new Date().getTime() / 10 * Math.random();
        usuario.tipo = 'c';
        console.log(usuario);

        this.usuarios.push(usuario);

        // Injeta o usuário na sessão.
        sessionStorage.setItem('user', JSON.stringify(usuario));

        // Redireciona pra página home.
        this.rota.navigate(['/home']);

        return true;
    }

    // Retorna um usuário que está logado na sessão. Se não houver nehum, retorna null.
    public getUsuarioLogado(): IUsuario{
        let u = sessionStorage.getItem('user')
        
        if(u == null)
            return null;
        
        this.user.id = JSON.parse(u).id;
        this.user.nome = JSON.parse(u).nome;
        this.user.email = JSON.parse(u).email;
        this.user.senha = JSON.parse(u).senha;
        this.user.tipo = JSON.parse(u).tipo;

        return this.user;
    }

    // Verifica se o usuário está logado.
    public isLogged(): boolean{
        if(this.getUsuarioLogado() == null)
            return false;

        return true;
    }

}
