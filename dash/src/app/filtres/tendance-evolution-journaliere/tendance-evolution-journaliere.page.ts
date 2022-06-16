import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {LoadingController} from "@ionic/angular";
import {Chart} from "angular-highcharts";

@Component({
    selector: 'app-tendance-evolution-journaliere',
    templateUrl: './tendance-evolution-journaliere.page.html',
    styleUrls: ['./tendance-evolution-journaliere.page.scss'],
})
export class TendanceEvolutionJournalierePage implements OnInit {

    anne1;
    anne2;
    date1;
    date2;
    data;
    dataSource;
    displayedColumns: string[] = ['date', 'volume'];
    activeTab: string = 'volume';
    chartOptions: any;
    chartData: any = [];
    chartData1: any = [];
    chartData2: any = [];
    volumeOuCA: boolean = false;

    constructor(private manageS: ManagerService, private loadingController: LoadingController) {
    }

    ngOnInit() {
        let myDate = new Date();
        this.anne1 = myDate.toLocaleString().substr(0, 10);
        this.date1 = this.getNetDate(this.anne1);
        let date1Str = this.date1.toString();
        let subDate = this.date1.substring(0, 2);
        let newsubDate = date1Str.replace(subDate, '01');

        this.loadReports(newsubDate, this.date1);
    }

    getNetDate(date) {
        let subdate = date.substr(0, 10);
        let array = subdate.split('/', subdate.length);
        let newStr = array.join('');
        return newStr;
    }

    checkannee1(event) {
        localStorage.removeItem('tejannee1');
        const annee = event.target.value;
        if (annee.length === 10) {
            let array = annee.split('-', annee.length);
            let newStr = array.join('');
            // console.log(newStr);

            let yyyy = newStr.substr(0, 4);
            let mm = newStr.substr(4, 2);
            let dd = newStr.substr(6, 2);
            // console.log('yyyy: ' + yyyy);
            // console.log('mm: ' + mm);
            // console.log('dd: ' + dd);
            let newDate = dd + mm + yyyy;
            // console.log('newDate: ', newDate);

            localStorage.setItem('tejannee1', newDate);
            this.anne1 = annee;
            this.date1 = newDate;
            this.loadReports(this.date1, this.date2);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }

    }

    checkannee2(event) {
        localStorage.removeItem('tejannee2');
        const annee = event.target.value;
        if (annee.length === 10) {
            let array = annee.split('-', annee.length);
            let newStr = array.join('');
            // console.log(newStr);

            let yyyy = newStr.substr(0, 4);
            let mm = newStr.substr(4, 2);
            let dd = newStr.substr(6, 2);
            // console.log('yyyy: ' + yyyy);
            // console.log('mm: ' + mm);
            // console.log('dd: ' + dd);
            let newDate = dd + mm + yyyy;
            // console.log('newDate: ', newDate);

            this.anne2 = annee;
            this.date2 = newDate;
            localStorage.setItem('tejannee2', annee);
            this.loadReports(this.date1, this.date2);
            this.openGraph(this.data);
            this.openGraphCA(this.data);
        }
    }

    async loadReports(annee1, annee2) {
        // console.log('date1: ', annee1, 'date2: ', annee2)
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manageS.getNombreDossierParJourDePeriode(annee1, annee2)
            .subscribe(resp => {
                this.data = resp;
                this.dataSource = resp;
                this.openGraph(resp)
                loading.dismiss();
            })
    }

    effacer() {
        this.chartData = [];
        this.chartData1 = [];
        this.chartData2 = [];
    }

    change() {
        this.volumeOuCA ? this.openGraphCA(this.data) : this.openGraph(this.data);
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
                name: this.anne1,
                type: undefined,
                data: this.chartData1
            }]
        });
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
                text: `Total demande`
            },
            colors: [
                '#82ed64',
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
            }]
        });
    }


    segmentChange(event) {
        if (event.target.value === 'graph') {
            this.openGraph(this.data);
        }
        this.activeTab = event.target.value;
    }

}
