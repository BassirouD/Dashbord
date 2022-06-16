import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ManagerService} from "../../services/manager.service";
import {LoadingController} from "@ionic/angular";
import {Chart} from "angular-highcharts";

@Component({
    selector: 'app-comptabilite',
    templateUrl: './comptabilite.page.html',
    styleUrls: ['./comptabilite.page.scss'],
})
export class ComptabilitePage implements OnInit {

    dataSource;
    displayedColumns: string[] = ['nombredossier', 'moyennemensuelle', 'moyennejournaliere'];
    activeTab: string = 'volume';
    volumeOuCA: boolean = false;
    chartOptions: any;
    chartData: any = [];
    chartData1: any = [];
    chartData2: any = [];
    chartData3: any = [];
    data;
    anneeEnCours;
    anne1;
    anne2;

    constructor(private router: Router,private manageS: ManagerService, private loadingController: LoadingController) {
    }

    ngOnInit() {
        this.anneeEnCours = Number(Date().substr(11, 4));
        this.anne1 = Number(Date().substr(11, 4)) - 2;
        this.anne2 = Number(Date().substr(11, 4)) - 1;
        localStorage.setItem('esannee', this.anneeEnCours);
        localStorage.setItem('esannee1', this.anneeEnCours);
        localStorage.setItem('esannee2', this.anneeEnCours);
        this.loadReports(this.anneeEnCours, this.anne1, this.anne2);
    }

    showLocationDetail = false;

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    goProfil() {
        this.router.navigateByUrl('/profil')
    }

    segmentChange(event) {
        if (event.target.value === 'graph') {
            this.openGraph(this.data);
        }
        this.activeTab = event.target.value;
    }

    async loadReports(anne1, anne2, anne3) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manageS.getStatRecapPourTroisAnnnee(anne1, anne2, anne3)
            .subscribe(resp => {
                this.dataSource = resp;
                this.data = resp;
                this.openGraph(resp)
                loading.dismiss();
            })
    }

    change() {
        this.volumeOuCA ? this.openGraphCA(this.data) : this.openGraph(this.data);
    }

    openGraph(data) {
        this.effacer();
        for (var i = 0; i < this.data.length; i++) {
            this.chartData.push(this.data[i].periode);
            if (parseInt(this.data[i].periode) === parseInt(this.anneeEnCours)) {
                this.chartData1.push(this.data[i].moyennejournaliere);
            }
            if (parseInt(this.data[i].periode) === parseInt(this.anne1)) {
                this.chartData2.push(this.data[i].moyennejournaliere);
            }
            if (parseInt(this.data[i].periode) === parseInt(this.anne2)) {
                this.chartData3.push(this.data[i].moyennejournaliere);
            }

        }


        this.chartOptions = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: `Total demande`
            },
            colors: [
                '#72ed64',
                '#0c3f9b',
                '#eecc28',
            ],
            xAxis: {
                categories: this.chartData
            },
            yAxis: {
                title: {
                    text: 'Moyenne Journalière'
                }
            },
            series: [{
                name: this.anneeEnCours,
                type: undefined,
                data: this.chartData1
            },
                {
                    name: this.anne1,
                    type: undefined,
                    data: this.chartData2
                },
                {
                    name: this.anne2,
                    type: undefined,
                    data: this.chartData3
                }
            ]
        });
    }

    openGraphCA(data) {
        this.effacer();
        for (var i = 0; i < this.data.length; i++) {
            this.chartData.push(this.data[i].nommois);
            if (parseInt(this.data[i].periode) === parseInt(this.anneeEnCours)) {
                this.chartData1.push(this.data[i].moyennemensuelle);
            }
            if (parseInt(this.data[i].periode) === parseInt(this.anne1)) {
                this.chartData2.push(this.data[i].moyennemensuelle);
            }
            if (parseInt(this.data[i].periode) === parseInt(this.anne2)) {
                this.chartData3.push(this.data[i].moyennemensuelle);
            }

        }

        this.chartOptions = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: `Total demande`
            },
            colors: [
                '#72ed64',
                '#0c3f9b',
                '#eecc28',
            ],
            xAxis: {
                categories: this.chartData
            },
            yAxis: {
                title: {
                    text: 'Moyenne mensuelle'
                }
            },
            series: [{
                name: this.anneeEnCours,
                type: undefined,
                data: this.chartData1
            },
                {
                    name: this.anne1,
                    type: undefined,
                    data: this.chartData2
                },
                {
                    name: this.anne2,
                    type: undefined,
                    data: this.chartData3
                }]
        });
    }

    effacer() {
        this.chartData = [];
        this.chartData1 = [];
        this.chartData2 = [];
        this.chartData3 = [];
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

    checkannee3(event) {
        localStorage.removeItem('esannee');
        let annee = event.target.value;
        localStorage.setItem('esannee', annee);
        this.anneeEnCours = annee;
        if (annee.length === 4) {
            this.loadReports(this.anneeEnCours, this.anne1, this.anne2);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    checkannee1(event) {
        localStorage.removeItem('esannee1');
        let annee = event.target.value;
        localStorage.setItem('esannee1', annee);
        this.anne1 = annee;
        if (annee.length === 4) {
            this.loadReports(this.anneeEnCours, this.anne1, this.anne2);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    checkannee2(event) {
        localStorage.removeItem('esannee2');
        let annee = event.target.value;
        localStorage.setItem('esannee2', annee);
        this.anne2 = annee;
        if (annee.length === 4) {
            this.loadReports(this.anneeEnCours, this.anne1, this.anne2);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

}
