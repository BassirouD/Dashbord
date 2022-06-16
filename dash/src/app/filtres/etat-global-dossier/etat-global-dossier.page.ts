import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ManagerService} from "../../services/manager.service";
import {LoadingController} from "@ionic/angular";
import {Chart} from "angular-highcharts";


@Component({
    selector: 'app-etat-global-dossier',
    templateUrl: './etat-global-dossier.page.html',
    styleUrls: ['./etat-global-dossier.page.scss'],
})
export class EtatGlobalDossierPage implements OnInit {
    dataSource;
    displayedColumns: string[] = ['annee', 'mois','volume', 'ca_j'];
    activeTab: string = 'volume';
    volumeOuCA: boolean = false;
    chartOptions: any;
    chartData: any = [];
    chartData1: any = [];
    data;
    anneeEnCours;

    constructor(private manageS: ManagerService, private loadingController: LoadingController) {
    }

    ngOnInit() {
        this.anneeEnCours = Number(Date().substr(11, 4));
        localStorage.setItem('anneeEnCours', this.anneeEnCours);
        this.loadReports(this.anneeEnCours);
    }

    segmentChange(event) {
        if (event.target.value === 'graph') {
            this.openGraph(this.data);
        }
        this.activeTab = event.target.value;
    }

    async loadReports(anne1) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manageS.getNombreDossierParMois(anne1)
            .subscribe(resp => {
                this.dataSource = resp;
                this.data = resp;
                this.openGraph(resp)
                loading.dismiss();
            })
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

    effacer() {
        this.chartData = [];
        this.chartData1 = [];
    }

    change() {
        this.volumeOuCA ? this.openGraphCA(this.data) : this.openGraph(this.data);
    }

    openGraph(data) {
        this.effacer();
        for (var i = 0; i < this.data.length; i++) {
            this.chartData.push(this.data[i].nommois);
            this.chartData1.push(this.data[i].nbdoss);
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
                name: 'Total demande',
                type: undefined,
                data: this.chartData1
            }]
        });
    }

    openGraphCA(data) {
        this.effacer();
        for (var i = 0; i < this.data.length; i++) {
            this.chartData.push(this.data[i].nommois);
            this.chartData1.push(this.data[i].nbdoss * 14000);
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
                name: 'CA journalier',
                type: undefined,
                data: this.chartData1
            }]
        });
    }

    checkannee1(event) {
        localStorage.removeItem('anneeEnCours');
        let annee = event.target.value;
        localStorage.setItem('anneeEnCours', annee);
        this.anneeEnCours = annee;
        if (annee.length === 4)
        {
            this.loadReports(this.anneeEnCours);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

}
