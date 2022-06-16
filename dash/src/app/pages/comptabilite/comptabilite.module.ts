import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ComptabilitePageRoutingModule} from './comptabilite-routing.module';

import {ComptabilitePage} from './comptabilite.page';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {ChartModule} from "angular-highcharts";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComptabilitePageRoutingModule,
        MatInputModule,
        MatTableModule,
        ChartModule
    ],
    declarations: [ComptabilitePage]
})
export class ComptabilitePageModule {
}
