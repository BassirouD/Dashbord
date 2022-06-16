import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {LoadingController} from "@ionic/angular";
import {Chart} from "angular-highcharts";
import {MatTableDataSource} from "@angular/material/table";


@Component({
    selector: 'app-performance-comporee',
    templateUrl: './performance-comporee.page.html',
    styleUrls: ['./performance-comporee.page.scss'],
})
export class PerformanceComporeePage implements OnInit {

    activeTab: string = 'volume';
    data;
    displayedColumns: string[] = ['annee','mois','volume', 'ca_j'];
    dataSource;
    count: number[] = [];
    volumeOuCA: boolean = false;
    rest = [];
    chartOptions: any;
    chartData: any = [];
    chartData1: any = [];
    chartData2: any = [];
    anne1;
    anne2;

    constructor(private manageS: ManagerService, private loadingController: LoadingController) {
    }

    ngOnInit() {
        this.anne1 = Number(Date().substr(11, 4)) - 1;
        this.anne2 = Number(Date().substr(11, 4)) - 2;
        this.loadReports(this.anne1, this.anne2);
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
        // console.log('monC '+ c)
        return c;
    }


    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
            this.ngOnInit();
        }, 2000);
    }

    async loadReports(anne1, anne2) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manageS.getNombreDossierPourDeuxAnneesParMois(anne1, anne2)
            .subscribe(resp => {
                this.data = resp;
                this.dataSource = resp;
                this.openGraph(resp)
                loading.dismiss();
                // console.log(this.data);
                // console.log('les dates ' + resp[1].date);
                for (let i = 0; i < resp.length - 1; i++) {
                    this.count[i] = i;
                    this.rest[i] = resp[i]['nbdoss'] - resp[i + 1]['nbdoss'];
                    // this.rest[i] = {'value': resp[i]['nbdoss'] - resp[i+1]['nbdoss'], 'open': false};
                    // this.rest[i].open = false;
                    // console.log('Mon reste: ' + this.rest[i])
                }
            })
    }

    effacer() {
        this.chartData = [];
        this.chartData1 = [];
        this.chartData2 = [];
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
        }

        this.chartData.reverse();

        this.chartOptions = new Chart({
            chart: {
                type: 'spline'
            },
            title: {
                text: `Graphe sur Performance comparée des années ${this.anne1} et ${this.anne2}`
            },
            colors: [
                '#6495ED',
                '#FFA500'
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
                }
            ]
        });
    }

    checkannee1(event) {
        localStorage.removeItem('annee1');
        let annee = event.target.value;
        localStorage.setItem('annee1', annee);
        this.anne1 = annee;
        if (annee.length === 4)
        {
            this.loadReports(this.anne1, this.anne2);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    checkannee2(event) {
        localStorage.removeItem('annee2');
        let annee = event.target.value;
        this.anne2 = annee;
        localStorage.setItem('annee2', annee);
        if (annee.length === 4)
        {
            this.loadReports(this.anne1, this.anne2);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    change() {
        this.volumeOuCA ? this.openGraphCA(this.data) : this.openGraph(this.data);
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
        }

        this.chartData.reverse();

        this.chartOptions = new Chart({
            chart: {
                type: 'spline'
            },
            title: {
                text: `Graphe sur Performance comparée des années ${this.anne1} et ${this.anne2}`
            },
            colors: [
                '#6495ED',
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
                name: this.anne1,
                type: undefined,
                data: this.chartData1
            },
                {
                    name: this.anne2,
                    type: undefined,
                    data: this.chartData2
                }
            ]
        });
    }


}
