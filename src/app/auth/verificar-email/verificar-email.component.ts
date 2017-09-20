import { AuxiliarService } from '../../shared/services/auxiliar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.sass']
})
export class VerificarEmailComponent implements OnInit {

  constructor(private auxiliarService: AuxiliarService) { }

  ngOnInit() {
  }

  voltarHome(){
    this.auxiliarService.goRouteLogin();
  }

}
