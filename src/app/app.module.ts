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
    HomeModule
  ],
  providers: [LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
