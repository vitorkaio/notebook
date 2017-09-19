import { OkDialogsComponent } from './ok-dialogs.component';
import { Observable } from "rxjs/Rx";
import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class OkService {

  constructor(private dialog: MdDialog) {}

    public confirm(title: string, message: string): Observable<boolean> {
      // console.log('No confirmssss');
      let dialogRef: MdDialogRef<OkDialogsComponent>;

      dialogRef = this.dialog.open(OkDialogsComponent);
      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.message = message;

      return dialogRef.afterClosed();
    }

}
