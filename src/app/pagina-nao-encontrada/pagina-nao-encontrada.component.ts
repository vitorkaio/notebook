import { AuxiliarService } from '../shared/services/auxiliar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.sass']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private auxiliarService: AuxiliarService) { }

  ngOnInit() {
  }

  public voltarHome(){
    this.auxiliarService.goRouteNotes();
  }

}
