import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EtatGlobalDossierPageRoutingModule} from './etat-global-dossier-routing.module';

import {EtatGlobalDossierPage} from './etat-global-dossier.page';
import {MatFormFieldModule} from "@angular/material/form-field";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {ChartModule} from "angular-highcharts";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EtatGlobalDossierPageRoutingModule,
        MatFormFieldModule,
        OverlayModule,
        MatInputModule,
        MatTableModule,
        ChartModule
    ],
    declarations: [EtatGlobalDossierPage]
})
export class EtatGlobalDossierPageModule {
}
