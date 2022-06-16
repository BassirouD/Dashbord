import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TendanceEvolutionJournalierePageRoutingModule} from './tendance-evolution-journaliere-routing.module';

import {TendanceEvolutionJournalierePage} from './tendance-evolution-journaliere.page';
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
        TendanceEvolutionJournalierePageRoutingModule,
        MatFormFieldModule,
        OverlayModule,
        MatInputModule,
        MatTableModule,
        ChartModule
    ],
    declarations: [TendanceEvolutionJournalierePage]
})
export class TendanceEvolutionJournalierePageModule {
}
