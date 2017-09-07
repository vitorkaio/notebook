import { DialogsService } from './confirm-dialogs/dialogs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogsComponent } from './confirm-dialogs/confirm-dialogs.component';
import { MdDialogModule, MdButtonModule, MdIconModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule
  ],
  declarations: [ConfirmDialogsComponent],
  providers: [DialogsService],
  exports: [ConfirmDialogsComponent],
  entryComponents: [ConfirmDialogsComponent]
})
export class DialogsModule { }
