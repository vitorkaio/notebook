import { BarrasModule } from './barras/barras.module';
import { MaterializeModule } from 'angular2-materialize';
import { NotesRoutingModule } from './notes.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { EditorModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ListaNotesComponent } from './lista-notes/lista-notes.component';
import { AdicionaNotesComponent } from './adiciona-notes/adiciona-notes.component';

import {MdTableModule} from '@angular/material';
import {MdPaginatorModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import { MdIconModule } from '@angular/material';
import {MdTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    NotesRoutingModule,
    EditorModule,
    FormsModule,
    BarrasModule,
    MdTableModule,
    MdPaginatorModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule
  ],
  declarations: [NotesComponent, ListaNotesComponent, AdicionaNotesComponent]

})
export class NotesModule { }
