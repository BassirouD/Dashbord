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

    mode: boolean = false;
    showLocationDetail = false;
    segmentModel = "all";
    data: any;
    dateActuelle: any;
    datePrecedente: any;
    dates: any[] = [];
    rest = [];

    constructor(private manageS: ManagerService, private router: Router, public loadingController: LoadingController) {
    }

    ngOnInit(): void {
        this.loadReports();
        this.getResult();
        console.log(this.dates);
    }

    openDetail(){
        // this.rest[i].open = !this.rest[i].open;
        // console.log(i)
        this.mode = true;
    }


    closeDetail(){
        // console.log(i)
        this.mode = false;
    }

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    goProfil() {
        this.router.navigateByUrl('/profil')
    }

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
                // console.log(this.data);
                // console.log('les dates ' + resp[1].date);
                for (let i = 0; i < resp.length - 1; i++){
                    this.count[i] = i;
                    this.rest[i].value = resp[i]['nbdoss'] - resp[i+1]['nbdoss'];
                    // this.rest[i] = {'value': resp[i]['nbdoss'] - resp[i+1]['nbdoss'], 'open': false};
                    this.rest[i].open = false;
                    console.log('Mon reste: ' + this.rest[i])
                }
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
        // console.log('monC '+ c)
        return c;
    }

    // rest: boolean = true;

    count: number[] = [];
    getResult(){
        // this.manageS.loadReporting()
        //     .subscribe(resp => {
        //         this.data = resp;
        //         console.log(this.data);
        //         for (let i = 1; i < resp.length; i++){
        //             this.count[i] = i;
        //             // console.log('Les counts:------------------ ' + this.count[i])
        //             // i += 1;
        //             // this.dates.push(resp[i].date)
        //             this.rest[i] = resp[i-1]['nbdoss'] - resp[i]['nbdoss'];
        //             console.log('Mon reste: ' + this.rest[i])
        //             // console.log('res1 '+resp[i-1]['nbdoss']+' res2 '+resp[i]['nbdoss'])
        //             if (this.rest[i] > 0){
        //                 this.boolRest = true;
        //                 console.log('tres bon:' + resp[i]['nbdoss'])
        //             }if (this.rest[i] < 0) {
        //                 console.log('Pas bon')
        //                 this.boolRest = false;
        //             }
        //         }
        //     })
    }

}
