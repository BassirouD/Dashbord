import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {LoadingController} from "@ionic/angular";
import {Chart} from "angular-highcharts";

@Component({
    selector: 'app-tendance-evolution',
    templateUrl: './tendance-evolution.page.html',
    styleUrls: ['./tendance-evolution.page.scss'],
})
export class TendanceEvolutionPage implements OnInit {

    activeTab: string = 'volume';
    data;
    displayedColumns: string[] = ['annee', 'mois','volume', 'ca_j'];
    dataSource;
    volumeOuCA: boolean = false;
    rest = [];
    chartOptions: any;
    chartData: any = [];
    chartData1: any = [];
    chartData2: any = [];
    chartData3: any = [];
    anne1;
    anne2;
    anne3;

    constructor(private manageS: ManagerService, private loadingController: LoadingController) {
    }

    ngOnInit() {
        this.anne1 = Number(Date().substr(11, 4)) - 1;
        this.anne2 = Number(Date().substr(11, 4)) - 2;
        this.anne3 = Number(Date().substr(11, 4)) - 3;
        localStorage.setItem('teannee1', this.anne1);
        localStorage.setItem('teannee2', this.anne2);
        localStorage.setItem('teannee3', this.anne3);
        this.loadReports(this.anne1, this.anne2, this.anne3);
    }

    async loadReports(anne1, anne2, annee3) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manageS.getNombreDossierPourTroisAnneesParMois(anne1, anne2, annee3)
            .subscribe(resp => {
                this.data = resp;
                this.dataSource = resp;
                // this.openGraph(resp)
                loading.dismiss();
            })
    }

    checkannee1(event) {
        localStorage.removeItem('teannee1');
        let annee = event.target.value;
        localStorage.setItem('teannee1', annee);
        this.anne1 = annee;
        if (annee.length === 4)
        {
            this.loadReports(this.anne1, this.anne2, this.anne3);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    checkannee2(event) {
        localStorage.removeItem('teannee2');
        let annee = event.target.value;
        this.anne2 = annee;
        localStorage.setItem('teannee2', annee);
        if (annee.length === 4) {
            this.loadReports(this.anne1, this.anne2, this.anne3);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    checkannee3(event) {
        localStorage.removeItem('teannee3');
        let annee = event.target.value;
        this.anne3 = annee;
        localStorage.setItem('teannee3', annee);
        if (annee.length === 4)
        {
            this.loadReports(this.anne1, this.anne2, this.anne3);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    segmentChange(event) {
        if (event.target.value === 'graph') {
            this.openGraph(this.data);
        }
        this.activeTab = event.target.value;
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

    effacer() {
        this.chartData = [];
        this.chartData1 = [];
        this.chartData2 = [];
        this.chartData3 = [];
    }

    change() {
        this.volumeOuCA ? this.openGraphCA(this.data) : this.openGraph(this.data);
    }

    openGraph(data) {
        this.effacer();
        for (var i = 0; i < this.data.length; i++) {
            this.chartData.push(this.data[i].nommois);
            if (this.data[i].annee === parseInt(this.anne1)) {
                this.chartData1.push(this.data[i].nbdoss);
            }
            if (this.data[i].annee === parseInt(this.anne2)) {
                this.chartData2.push(this.data[i].nbdoss);
            }
            if (this.data[i].annee === parseInt(this.anne3)) {
                this.chartData3.push(this.data[i].nbdoss);
            }
        }

        this.chartData.reverse();

        this.chartOptions = new Chart({
            chart: {
                type: 'spline'
            },
            title: {
                text: `Total demande`
            },
            colors: [
                '#6495ED',
                '#82ed64',
                '#c0592c',
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
                name: this.anne1,
                type: undefined,
                data: this.chartData1
            },
                {
                    name: this.anne2,
                    type: undefined,
                    data: this.chartData2
                },
                {
                    name: this.anne3,
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

            if (this.data[i].annee === parseInt(this.anne1)) {
                this.chartData1.push(this.data[i].nbdoss * 14000);
            }
            if (this.data[i].annee === parseInt(this.anne2)) {
                this.chartData2.push(this.data[i].nbdoss * 14000);
            }
            if (this.data[i].annee === parseInt(this.anne3)) {
                this.chartData3.push(this.data[i].nbdoss * 14000);
            }
        }

        this.chartData.reverse();

        this.chartOptions = new Chart({
            chart: {
                type: 'spline'
            },
            title: {
                text: `Total demande`
            },
            colors: [
                '#6495ED',
                '#82ed64',
                '#c0592c',
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
                name: this.anne1,
                type: undefined,
                data: this.chartData1
            },
                {
                    name: this.anne2,
                    type: undefined,
                    data: this.chartData2
                },
                {
                    name: this.anne3,
                    type: undefined,
                    data: this.chartData3
                }
            ]
        });
    }

}
