import { MaterializeModule } from 'angular2-materialize';
import { NotesRoutingModule } from './notes.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { BarrasComponent } from './barras/barras.component';
import {EditorModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    NotesRoutingModule,
    EditorModule,
    FormsModule
  ],
  declarations: [NotesComponent, BarrasComponent]
})
export class NotesModule { }
