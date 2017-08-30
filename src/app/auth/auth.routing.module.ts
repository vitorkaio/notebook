import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

const LOGIN_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cadastrar', component: CadastrarComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}
