import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComptabilitePageRoutingModule } from './comptabilite-routing.module';

import { ComptabilitePage } from './comptabilite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComptabilitePageRoutingModule
  ],
  declarations: [ComptabilitePage]
})
export class ComptabilitePageModule {}
