import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ManagerService} from "../../services/manager.service";
import {LoadingController} from "@ionic/angular";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Chart} from 'angular-highcharts';

export interface PeriodicElement {
    volume: string;
    date: number;
    ca_j: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//     {position: 1, name: 'Hydrogen', weight: 1.0079},
//     {position: 2, name: 'Helium', weight: 4.0026},
//     {position: 3, name: 'Lithium', weight: 6.941},
//     {position: 4, name: 'Beryllium', weight: 9.0122},
//     {position: 5, name: 'Boron', weight: 10.811},
//     {position: 6, name: 'Carbon', weight: 12.0107},
//     {position: 7, name: 'Nitrogen', weight: 14.0067},
//     {position: 8, name: 'Oxygen', weight: 15.9994},
//     {position: 9, name: 'Fluorine', weight: 18.9984},
//     {position: 10, name: 'Neon', weight: 20.1797},
// ];


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
    displayedColumns: string[] = ['date','volume', 'ca_j'];
    dataSource;
    @ViewChild(MatSort) sort: MatSort;
    toDay;
    mouth;
    chartData: any = [];
    chartData1: any = [];
    chartOptions: any;
    // rest: boolean = true;
    activeTab: string = 'volume'

    count: number[] = [];
    volumeOuCA: boolean = false;

    constructor(private manageS: ManagerService,
                private router: Router,
                public loadingController: LoadingController, private _liveAnnouncer: LiveAnnouncer) {
    }

    ngOnInit(): void {
        this.loadReports();
        // this.getResult();
        // this.dataSource.sort = this.sort;
        let date = new Date();
        this.mouth = date.getMonth() + 1;
        this.toDay = Date().substr(11, 4);
        localStorage.setItem('annee', this.toDay);
        this.volumeOuCA = false;
    }

    choice

    openDetail(index) {
        if (this.mode == false) {
            this.mode = true;
            this.choice = index
        } else {
            this.mode = false;
        }
    }


    closeDetail() {
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
                this.dataSource = resp;
                this.openGraph(resp)
                loading.dismiss();
                for (let i = 0; i < resp.length - 1; i++) {
                    this.count[i] = i;
                    this.rest[i] = resp[i]['nbdoss'] - resp[i + 1]['nbdoss'];
                    // this.rest[i] = {'value': resp[i]['nbdoss'] - resp[i+1]['nbdoss'], 'open': false};
                    // this.rest[i].open = false;
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
        return c;
    }

    getResult() {
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

    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    checkcode(event) {
        let periode = event.target.value;
        localStorage.setItem('periode', periode);
        this.toDay = localStorage.getItem('annee')
        this.loadReports2(this.toDay, periode);
    }

    checkannee(event) {
        localStorage.removeItem('annee');
        let annee = event.target.value;
        localStorage.setItem('annee', annee);
        if (annee.length === 4 && annee!=='2022') {
            this.loadReports2(annee, this.mouth)
        }
        if (annee === '2022') {
            this.loadReports();
        }
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
            this.ngOnInit();
        }, 2000);
    }

    openGraph(data) {
        this.effacer();
        for (var i = 0; i < this.data.length; i++) {
            this.chartData.push(this.data[i].date);
            this.chartData1.push(this.data[i].nbdoss);
        }

        this.chartData.reverse();

        this.chartOptions = new Chart({
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Graphe sur le volume de dossiers traités par jour'
            },
            colors: [
                '#6495ED',
            ],
            xAxis: {
                categories: this.chartData
            },
            yAxis: {
                title: {
                    text: 'Volume moyen Traitement'
                }
            },
            series: [{
                name: 'suivi évolutif',
                type: undefined,
                data: this.chartData1
            }]
        });
    }

    segmentChange(event) {
        if (event.target.value === 'graph') {
            this.openGraph(this.data);
        }
        this.activeTab = event.target.value;
    }

    effacer() {
        this.chartData = [];
        this.chartData1 = [];
    }

    openGraphCA(data) {
        this.effacer();
        for (var i = 0; i < this.data.length; i++) {
            this.chartData.push(this.data[i].date);
            this.chartData1.push(this.data[i].nbdoss * 14000);
        }

        this.chartData.reverse();

        this.chartOptions = new Chart({
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Graphe sur le CA de dossiers traités par jour'
            },
            colors: [
                '#edd664',
            ],
            xAxis: {
                categories: this.chartData
            },
            yAxis: {
                title: {
                    text: 'CA journalier'
                }
            },
            series: [{
                name: 'suivi évolutif',
                type: undefined,
                data: this.chartData1
            }]
        });
    }

    change() {
        this.volumeOuCA ? this.openGraphCA(this.data) : this.openGraph(this.data);
    }

    async loadReports2(annee, mois) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manageS.getNombreDossierParJourDuMois(annee, mois)
            .subscribe(resp => {
                this.data = resp;
                this.dataSource = resp;
                this.openGraph(resp)
                loading.dismiss();
                for (let i = 0; i < resp.length - 1; i++) {
                    this.count[i] = i;
                    this.rest[i] = resp[i]['nbdoss'] - resp[i + 1]['nbdoss'];
                    // this.rest[i] = {'value': resp[i]['nbdoss'] - resp[i+1]['nbdoss'], 'open': false};
                    // this.rest[i].open = false;
                    // console.log('Mon reste: ' + this.rest[i])
                }
            })
    }

}
