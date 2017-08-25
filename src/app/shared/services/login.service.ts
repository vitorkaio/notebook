import { FirebaseAccessService } from './firebase-access.service';
import { IUsuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LoginService {

    // Para testar antes de fazer o servidor.
    private usuarios: IUsuario[] = [];
    private user: IUsuario = {};

    private urlGetUsuariosLocal = 'http://localhost:5000/getusuario/';
    private urlGetUsuariosHeroku = 'https://mighty-chamber-92039.herokuapp.com/getusuario/';
    private urlDoLoginLocal = 'http://localhost:5000/doLogin';
    private urlDoLoginHeroku = 'https://mighty-chamber-92039.herokuapp.com/doLogin';

    constructor(private route: ActivatedRoute, private rota: Router, private fire: FirebaseAccessService,
        private http: Http) {
        this.user.id = '1';
        this.user.nome = 'vih';
        this.user.email = 'vih@gmail.com';
        this.user.senha = 'vih';
        this.user.tipo = 'a';

        this.usuarios.push(this.user);
    }

    // Cadastra o usuário no sistema.
    public cadastraUsuario(usuario: IUsuario) {
        return new Promise(resolve => {
            usuario.id = new Date().getTime() / 10 * Math.random() + '';
            usuario.tipo = 'c';
            //console.log(usuario);

            this.http.get(this.urlGetUsuariosHeroku + usuario.nome)
                .map(dados => dados.json())
                .subscribe((data) => {

                    // Se data for igual a null é pq já existe alguém com o nome.
                    if (data != null) {
                        resolve(false);
                        return false;
                    }

                    // Injeta o usuário na sessão.
                    sessionStorage.setItem('user', JSON.stringify(usuario));

                    // Redireciona pra página home.
                    this.rota.navigate(['/home']);

                    resolve(true);
                    return true;
                });
        });

    }

    // Faz o login do usuário.
    public doLogin(nome: string, senha: string) {

        let doVerify = { nome: nome, senha: senha };

        return new Promise((resolve) => {
            this.http.post(this.urlDoLoginHeroku, JSON.stringify(doVerify)).map(res => res)
                .subscribe((data) => {
                    console.log('doLogin: ');
                    let res = data.json()
                    if (res == null) {
                        resolve(false);
                        return false;
                    }

                    // Injeta o usuário na sessão.
                    sessionStorage.setItem('user', JSON.stringify(res));

                    // Redireciona pra página home.
                    this.rota.navigate(['/home']);

                    resolve(true);
                    return true;

                }, (error: any) => {
                    console.log('Erro');
                });

        });
    }

    // Retorna um usuário que está logado na sessão. Se não houver nehum, retorna null.
    public getUsuarioLogado(): IUsuario {
        let u = sessionStorage.getItem('user')

        if (u == null)
            return null;

        this.user.id = JSON.parse(u).id;
        this.user.nome = JSON.parse(u).nome;
        this.user.email = JSON.parse(u).email;
        this.user.senha = JSON.parse(u).senha;
        this.user.tipo = JSON.parse(u).tipo;

        return this.user;
    }

    // Verifica se o usuário está logado.
    public isLogged(): boolean {
        //this.accessFireBase();
        //this.salvaDadosFireBase();
        if (this.getUsuarioLogado() == null)
            return false;

        return true;
    }


}
