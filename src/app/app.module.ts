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
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AuthModule,
    NotesModule,
    AppRoutingModule,
  ],
  providers: [AuthService, AngularFireAuth, AuthGuardService],
  exports: [MaterializeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
