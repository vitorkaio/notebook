import { LoginAuthGuardService } from './shared/guards/login-auth-guard.service';
import { NotasService } from './shared/services/notas.service';
import { AuxiliarService } from './shared/services/auxiliar.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './shared/services/firebase.service';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { AppRoutingModule } from './app.routing.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth} from 'angularfire2/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Para a navbar
import {FlexLayoutModule} from "@angular/flex-layout";
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCjFjCUzmxwolUpV_LtosCNh86-y9yjc8Y",
  authDomain: "notebook-66957.firebaseapp.com",
  databaseURL: "https://notebook-66957.firebaseio.com",
  projectId: "notebook-66957",
  storageBucket: "notebook-66957.appspot.com",
  messagingSenderId: "1040500111457"
};


@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AuthModule,
    NotesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [AuthService, AngularFireAuth, AuthGuardService, LoginAuthGuardService, AuxiliarService, FirebaseService, NotasService],
  exports: [MaterializeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
