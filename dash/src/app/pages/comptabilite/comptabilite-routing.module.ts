import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComptabilitePage } from './comptabilite.page';

const routes: Routes = [
  {
    path: '',
    component: ComptabilitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComptabilitePageRoutingModule {}
