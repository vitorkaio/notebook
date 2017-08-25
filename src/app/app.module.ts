import { FirebaseAccessService } from './shared/services/firebase-access.service';
import { AuthGuard } from './shared/guards/auth.guard.service';
import { HomeModule } from './home/home.module';
import { LoginService } from './shared/services/login.service';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpModule } from "@angular/http";

export const firebaseConfig = {
  apiKey: "AIzaSyDeTEG9fFJ1WU3pZoQD1vi4h7FfN_iIYzU",
    authDomain: "login-94c17.firebaseapp.com",
    databaseURL: "https://login-94c17.firebaseio.com",
    projectId: "login-94c17",
    storageBucket: "login-94c17.appspot.com",
    messagingSenderId: "3402779701"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    FormsModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule
  ],
  providers: [LoginService, AuthGuard, FirebaseAccessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
