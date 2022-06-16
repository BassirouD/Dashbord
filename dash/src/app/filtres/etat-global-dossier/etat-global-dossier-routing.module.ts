import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtatGlobalDossierPage } from './etat-global-dossier.page';

const routes: Routes = [
  {
    path: '',
    component: EtatGlobalDossierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtatGlobalDossierPageRoutingModule {}
