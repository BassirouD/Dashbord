import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendanceEvolutionPage } from './tendance-evolution.page';

const routes: Routes = [
  {
    path: '',
    component: TendanceEvolutionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TendanceEvolutionPageRoutingModule {}
