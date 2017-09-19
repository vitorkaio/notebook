import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialogs',
  templateUrl: './confirm-dialogs.component.html',
  styleUrls: ['./confirm-dialogs.component.sass']
})
export class ConfirmDialogsComponent implements OnInit {

  public title: string;
  public message: string;

  public nota: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialogsComponent>) {

  }

  ngOnInit() {
  }

}
