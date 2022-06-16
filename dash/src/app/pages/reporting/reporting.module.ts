import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReportingPageRoutingModule} from './reporting-routing.module';

import {ReportingPage} from './reporting.page';
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ChartModule} from 'angular-highcharts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReportingPageRoutingModule,
        MatFormFieldModule,
        OverlayModule,
        MatInputModule,
        MatTableModule,
        ChartModule
    ],
    declarations: [ReportingPage]
})
export class ReportingPageModule {
}
