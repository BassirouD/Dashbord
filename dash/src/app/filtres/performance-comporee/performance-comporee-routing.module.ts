import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformanceComporeePage } from './performance-comporee.page';

const routes: Routes = [
  {
    path: '',
    component: PerformanceComporeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformanceComporeePageRoutingModule {}
