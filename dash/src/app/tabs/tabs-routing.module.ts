import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
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
                path: '',
                redirectTo: '/reporting',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/reporting',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
