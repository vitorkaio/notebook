import { OkService } from './ok-dialogs/ok.service';
import { DialogsService } from './confirm-dialogs/dialogs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogsComponent } from './confirm-dialogs/confirm-dialogs.component';
import { MdDialogModule, MdButtonModule, MdIconModule, MdInputModule } from '@angular/material';
import { OkDialogsComponent } from './ok-dialogs/ok-dialogs.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    FormsModule
  ],
  declarations: [ConfirmDialogsComponent, OkDialogsComponent],
  providers: [DialogsService, OkService],
  exports: [ConfirmDialogsComponent, OkDialogsComponent],
  entryComponents: [ConfirmDialogsComponent, OkDialogsComponent]
})
export class DialogsModule { }
