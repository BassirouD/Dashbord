import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tresorerie',
  templateUrl: './tresorerie.page.html',
  styleUrls: ['./tresorerie.page.scss'],
})
export class TresoreriePage implements OnInit {

    constructor(private router: Router) {
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

}
