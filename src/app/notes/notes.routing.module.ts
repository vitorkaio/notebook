import { AdicionaNotesComponent } from './adiciona-notes/adiciona-notes.component';
import { ListaNotesComponent } from './lista-notes/lista-notes.component';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { NotesComponent } from './notes.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

const LOGIN_ROUTES: Routes = [
    { path: 'notes', component: NotesComponent, canActivate: [AuthGuardService],
      children: [
        {path: 'lista', component: ListaNotesComponent},
        {path: 'adicionar', component: AdicionaNotesComponent},
        {path: ':titulo/editar', component: AdicionaNotesComponent},
        { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]},

];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})
export class NotesRoutingModule {

}
