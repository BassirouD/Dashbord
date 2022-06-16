import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'reporting',
                loadChildren: () => import('../../../../../Dashbord/dash/src/app/pages/reporting/reporting.module').then(m => m.ReportingPageModule)
            },
            {
                path: 'comptabilite',
                loadChildren: () => import('../../../../../Dashbord/dash/src/app/pages/comptabilite/comptabilite.module').then(m => m.ComptabilitePageModule)
            },
            {
                path: 'tresorerie',
                loadChildren: () => import('../../../../../Dashbord/dash/src/app/pages/tresorerie/tresorerie.module').then(m => m.TresoreriePageModule)
            },
            {
                path: 'profil',
                loadChildren: () => import('../../../../../Dashbord/dash/src/app/pages/profil/profil.module').then(m => m.ProfilPageModule)
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
