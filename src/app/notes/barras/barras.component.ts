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

  public logout(){
    this.authService.doLogout();
  }

  public notes(){
    this.auxiliarService.goRouteNotes();
  }

}
