import { AuxiliarService } from '../../shared/services/auxiliar.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MdMenuTrigger } from "@angular/material";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.sass']
})
export class BarrasComponent implements OnInit {

  @Input() user: string = '';
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

    someMethod() {
      this.trigger.openMenu();
    }

  constructor(private authService: AuthService, private auxiliarService: AuxiliarService) { }

  public ngOnInit() {
  }

  /**
   * Executa o logout do sistema.
   *
   * @memberof BarrasComponent
   */
  public logout(){
    this.authService.doLogout();
  }

  /**
   * Vai para a rota notes
   *
   * @memberof BarrasComponent
   */
  public notes(){
    this.auxiliarService.goRouteNotes();
  }

  /**
   * Executa a deleção da conta.
   *
   * @memberof BarrasComponent
   */
  public conta(){
    this.auxiliarService.goRouteConta();
  }

}
