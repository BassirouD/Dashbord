import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimationMoisPage } from './estimation-mois.page';

const routes: Routes = [
  {
    path: '',
    component: EstimationMoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimationMoisPageRoutingModule {}
