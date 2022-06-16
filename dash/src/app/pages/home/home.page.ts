import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    toDay;
    mouth;

    constructor(private router: Router) {
        let date = new Date();
        this.mouth = date.getMonth() + 1;
        this.toDay = Date().substr(11, 4);
        localStorage.setItem('annee', this.toDay);
    }

    ngOnInit() {
    }

    showLocationDetail = false;

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    goProfil() {
        this.router.navigateByUrl('/profil')
    }

    checkcode(event) {
        let periode = event.target.value;
        localStorage.setItem('periode', periode);
    }

    checkannee(event) {
        localStorage.removeItem('annee');
        let annee = event.target.value;
        localStorage.setItem('annee', annee);
    }

    gotoPC() {
        this.router.navigateByUrl('performance-comporee')
    }

    gotoRT(){
        this.router.navigateByUrl('tabs/reporting')
    }

    gotoEG() {
        this.router.navigate(['/etat-global-dossier']);
    }

    gotoTE() {
        this.router.navigate(['/tendance-evolution']);
    }

    gotoPT(){
        this.router.navigate(['/tabs/comptabilite']);
    }

    gotoTEJ(){
        this.router.navigate(['/tendance-evolution-journaliere']);
    }
}
