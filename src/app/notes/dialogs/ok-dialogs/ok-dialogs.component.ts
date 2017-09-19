import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-ok-dialogs',
  templateUrl: './ok-dialogs.component.html',
  styleUrls: ['./ok-dialogs.component.sass']
})
export class OkDialogsComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<OkDialogsComponent>) { }

  ngOnInit() {
  }

}
