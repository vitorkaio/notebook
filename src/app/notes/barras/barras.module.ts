import { BarrasComponent } from './barras.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdToolbarModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule
  ],
  declarations: [BarrasComponent, FooterComponent],
  exports: [BarrasComponent, FooterComponent]

})
export class BarrasModule { }
