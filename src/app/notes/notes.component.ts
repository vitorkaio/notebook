import { AuxiliarService } from '../shared/services/auxiliar.service';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {

  public userLogged: string = '';

  constructor(private auxiliarService: AuxiliarService) { }

  public ngOnInit() {
    this.auxiliarService.getUsuarioLogado().then(res => {
      this.userLogged = res;
    });
  }


}
