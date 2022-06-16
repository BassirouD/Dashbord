import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendanceEvolutionJournalierePage } from './tendance-evolution-journaliere.page';

const routes: Routes = [
  {
    path: '',
    component: TendanceEvolutionJournalierePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TendanceEvolutionJournalierePageRoutingModule {}
