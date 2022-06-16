import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: '',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'change-profil',
        loadChildren: () => import('./auth/change-profil/change-profil.module').then(m => m.ChangeProfilPageModule)
    },
    {
        path: 'change-password',
        loadChildren: () => import('./auth/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
    },
    {
        path: 'performance-comporee',
        loadChildren: () => import('./filtres/performance-comporee/performance-comporee.module').then(m => m.PerformanceComporeePageModule)
    },
    {
        path: 'tendance-evolution',
        loadChildren: () => import('./filtres/tendance-evolution/tendance-evolution.module').then(m => m.TendanceEvolutionPageModule)
    },
    {
        path: 'estimation-mois',
        loadChildren: () => import('./filtres/estimation-mois/estimation-mois.module').then(m => m.EstimationMoisPageModule)
    },
  {
    path: 'etat-global-dossier',
    loadChildren: () => import('./filtres/etat-global-dossier/etat-global-dossier.module').then( m => m.EtatGlobalDossierPageModule)
  },
  {
    path: 'tendance-evolution-journaliere',
    loadChildren: () => import('./filtres/tendance-evolution-journaliere/tendance-evolution-journaliere.module').then( m => m.TendanceEvolutionJournalierePageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
