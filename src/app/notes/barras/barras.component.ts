import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.sass']
})
export class BarrasComponent implements OnInit {

  @Input() user: string = '';

  constructor(private authService: AuthService) { }

  public ngOnInit() {
  }

  public logout(){
    this.authService.doLogout();
  }

}
