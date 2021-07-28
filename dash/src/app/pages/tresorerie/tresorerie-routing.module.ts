import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TresoreriePage } from './tresorerie.page';

const routes: Routes = [
  {
    path: '',
    component: TresoreriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TresoreriePageRoutingModule {}
