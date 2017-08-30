import { NotesRoutingModule } from './notes.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule
  ],
  declarations: [NotesComponent]
})
export class NotesModule { }
