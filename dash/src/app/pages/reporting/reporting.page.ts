import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ManagerService} from "../../services/manager.service";
import {LoadingController} from "@ionic/angular";

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.page.html',
    styleUrls: ['./reporting.page.scss'],
})
export class ReportingPage implements OnInit {


    constructor(private manageS: ManagerService, private router: Router, public loadingController: LoadingController) {
    }

    ngOnInit(): void {
        this.loadReports();
    }

    showLocationDetail = false;

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    goProfil() {
        this.router.navigateByUrl('/profil')
    }

    segmentModel = "all";
    data: any;


    segmentChanged(event) {
        //console.log(this.segmentModel);
        //console.log(event);
    }

    async loadReports() {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manageS.loadReporting()
            .subscribe(resp => {
                this.data = resp;
                loading.dismiss();
                //console.log(this.data);
            })
    }

    gotoLogin() {
        this.router.navigate(['/login']);
    }

    numStr(a, b) {
        a = '' + a;
        b = b || ' ';
        var c = '',
            d = 0;
        while (a.match(/^0[0-9]/)) {
            a = a.substr(1);
        }
        for (var i = a.length - 1; i >= 0; i--) {
            c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
            d++;
        }
        return c;
    }


}
