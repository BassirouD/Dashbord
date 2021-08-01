import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChangeProfilPageRoutingModule} from './change-profil-routing.module';

import {ChangeProfilPage} from './change-profil.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChangeProfilPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ChangeProfilPage]
})
export class ChangeProfilPageModule {
}
