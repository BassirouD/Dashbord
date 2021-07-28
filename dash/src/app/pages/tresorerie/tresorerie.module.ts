import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TresoreriePageRoutingModule } from './tresorerie-routing.module';

import { TresoreriePage } from './tresorerie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TresoreriePageRoutingModule
  ],
  declarations: [TresoreriePage]
})
export class TresoreriePageModule {}
