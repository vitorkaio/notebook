import { Component, OnInit } from '@angular/core';
import { DialogsService } from "../dialogs/confirm-dialogs/dialogs.service";

@Component({
  selector: 'app-adiciona-notes',
  templateUrl: './adiciona-notes.component.html',
  styleUrls: ['./adiciona-notes.component.sass']
})
export class AdicionaNotesComponent implements OnInit {

  public texto: string;
  public result: any;

  constructor(private dialogsService: DialogsService) { }

  ngOnInit() {
  }

  public salvarTexto(): void{
    this.openDialog();
  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirmação...', 'Qual é o título da nota?')
      .subscribe(res => {
        console.log(res);
        console.log(this.texto);
      });
  }

}
