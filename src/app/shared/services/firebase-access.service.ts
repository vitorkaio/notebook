import { IUsuario } from './../models/usuario';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseAccessService {

    private pathUsuariosRef: string = "/usuarios/";

    constructor(private af: AngularFireDatabase) { }

    // Adiciona um novo usuário no firebase.
    public addUsuario(usuario: IUsuario) {
        return new Promise(resolve => {
            this.getUsuario(usuario.nome).then(dados => {
                console.log('addUsuario');
                console.log(dados);
                if (dados == null) {
                    var usersRef = this.af.database.ref("/");
                    usersRef.child("/usuarios").update({
                        [usuario.nome]: {
                            "id": usuario.id,
                            "senha": usuario.senha,
                            "email": usuario.email,
                            "tipo": usuario.tipo
                        }
                    });
                    resolve(true);
                }

                else
                    resolve(false);
            });

        });

    }

    // Verifica se um usuário já está cadastrado no firebase.
    private getUsuario(nome: string) {
        let ref = this.af.database.ref(this.pathUsuariosRef + nome);
        return new Promise(resolve => {
            ref.on("value", ((snapshot) => {
                //console.log(snapshot.val());
                resolve(snapshot.val());
            }));
        });
    }

    /*
    // Acessa o firebase.
    public accessFireBase() {
        console.log('All alimentos');
        // pega todos os dados -> / , Pega todos os dados de kaio
        let ref = this.af.database.ref('/users/kaio');
        return new Promise(resolve => {
            ref.on("value", ((snapshot) => {
                //let key = snapshot.key;
                //let nome = snapshot.child('kaio').key;
                //console.log(nome);
                console.log(snapshot.val());
                resolve(snapshot.val());
            }));
        });

    }

    // add dados a tabela users.
    public salvaDadosFireBase(){
        var usersRef = this.af.database.ref("/");
        usersRef.child("/users").update({
            "malu":{
                "id": "11",
                "noz": {
                    "id_produto": "6",
                    "kcal": "30"
                },
                "uva": {
                    "id_produto": "2",
                    "kcal": "10"
                }
            
            },
        });
    }
*/

}
