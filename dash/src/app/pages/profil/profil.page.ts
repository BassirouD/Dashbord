import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    showLocationDetail = false;

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    logOut(){
        localStorage.removeItem('periode');
        localStorage.removeItem('annee');
        //this.router.navigate(['login']);
        this.router.navigateByUrl('/');
    }

    goToChangePassword(){
        this.router.navigateByUrl('/change-password');
    }

    goToChangeProfil(){
        this.router.navigateByUrl('/change-profil');
    }


}
