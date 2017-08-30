import { NotesComponent } from './notes.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

const LOGIN_ROUTES: Routes = [
    { path: 'notes', component: NotesComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})
export class NotesRoutingModule {

}
