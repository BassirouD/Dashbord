import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeProfilPage } from './change-profil.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeProfilPageRoutingModule {}
