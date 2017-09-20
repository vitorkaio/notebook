import { VerificarEmailComponent } from './verificar-email/verificar-email.component';
import { LoginAuthGuardService } from '../shared/guards/login-auth-guard.service';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

const LOGIN_ROUTES: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuardService] },
    { path: 'cadastrar', component: CadastrarComponent, canActivate: [LoginAuthGuardService] },
    { path: 'verificaemail', component: VerificarEmailComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}
