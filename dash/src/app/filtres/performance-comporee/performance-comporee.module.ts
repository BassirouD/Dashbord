import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PerformanceComporeePageRoutingModule} from './performance-comporee-routing.module';

import {PerformanceComporeePage} from './performance-comporee.page';
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
        PerformanceComporeePageRoutingModule,
        MatFormFieldModule,
        OverlayModule,
        MatInputModule,
        MatTableModule,
        ChartModule
    ],
    declarations: [PerformanceComporeePage]
})
export class PerformanceComporeePageModule {
}
