import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adiciona-notes',
  templateUrl: './adiciona-notes.component.html',
  styleUrls: ['./adiciona-notes.component.sass']
})
export class AdicionaNotesComponent implements OnInit {

  public texto: string;

  constructor() { }

  ngOnInit() {
  }

  public salvarTexto(): void{
    console.log(this.texto);
  }

}
