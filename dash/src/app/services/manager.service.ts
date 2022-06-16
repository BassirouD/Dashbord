import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    api = environment.api;

    constructor(private http: HttpClient) {
    }

    apii = 'http://orbuspoles.orbus.sn/testPhp/code1.php?filter=encours';
    // newApi = 'https://192.168.1.135:8083/apidashboard/';
    // newApi = 'http://192.168.2.135/apidashboard/';
    newApi = 'https://orbuspoles.orbus.sn/apidashboard/';
    // newApi = 'https://orbus-preprod.gainde2000.sn:8083/apidashboard/';

    loadReporting(): Observable<any> {
        return this.http.get(this.newApi+'GetNombreDossierParJourDuMoisEnCours');
    }

    getNombreDossierParJourDuMois(annee, mois): Observable<any> {
        return this.http.get(this.newApi + 'GetNombreDossierParJourDuMois/' + annee + '/' + mois);
    }

    getNombreDossierPourDeuxAnneesParMois(annee1, annee2): Observable<any> {
        return this.http.get(this.newApi + 'GetNombreDossierPourDeuxAnneesParMois/' + annee1 + '/' + annee2);
    }

    getNombreDossierParMois(annee) {
        return this.http.get(this.newApi + 'GetNombreDossierParMois/' + annee);
    }

    getNombreDossierPourTroisAnneesParMois(annee1, annee2, annee3) {
        return this.http.get(this.newApi + 'GetNombreDossierPourTroisAnneesParMois/' + annee1 + '/' + annee2 + '/' + annee3);
    }

    getStatRecapPourTroisAnnnee(annee1, annee2, annee3) {
        return this.http.get(this.newApi + 'GetStatRecapPourTroisAnnnee/' + annee1 + '/' + annee2 + '/' + annee3);
    }

    getNombreDossierParJourDePeriode(annee1, annee2) {
        return this.http.get(this.newApi + 'GetNombreDossierParJourDePeriode/' + annee1 + '/' + annee2);
    }


    //check code formulaire by id user

    // listcodeFormulaire(id): Observable<any> {
    //     var token=localStorage.getItem('token');
    //     //console.log('token '+token);
    //     var headers= new HttpHeaders({'Content-Type':'application/json','withCredentials': 'true',"Authorization":"Bearer "+token})
    //     //headers.append("Authorization", "Bearer " + token)
    //     return this.http.get(this.api+'GetListeFormulaireByIdUser/'+id,{headers:headers});
    // }
    //
    // listeDossiersTwoYears(code,annee1,annee2,idpole):Observable<any>{
    //     var token=localStorage.getItem('token');
    //     //console.log('token '+token);
    //     var headers= new HttpHeaders({'Content-Type':'application/json','withCredentials': 'true',"Authorization":"Bearer "+token})
    //     return this.http.get(this.api+'GetNombreDossierDocumentByYear/'+idpole+'/'+code+'/'+annee1+'/'+annee2,{headers:headers})
    // }
    //
    //
    // listdossiersBymonth(code,annee,idpole):Observable<any>{
    //     var token=localStorage.getItem('token');
    //     var headers= new HttpHeaders({'Content-Type':'application/json','withCredentials': 'true',"Authorization":"Bearer "+token})
    //     return this.http.get(this.api+'GetNombreDossierDocumentForYearByPeriode/'+idpole+'/'+code+'/'+'/'+annee,{headers:headers})
    //
    // }
    //
    // listedossierbymonthyear(code,annee,periode,idpole):Observable<any>{
    //     var token=localStorage.getItem('token');
    //     var headers= new HttpHeaders({'Content-Type':'application/json','withCredentials': 'true',"Authorization":"Bearer "+token})
    //     return this.http.get(this.api+'GetNombreDossierDocumentForYearForPeriode/'+idpole+'/'+code+'/'+'/'+annee+'/'+periode,{headers:headers})
    // }
    //
    // listedossiersbydaymonth(code,annee,periode,idpole):Observable<any>{
    //     var token=localStorage.getItem('token');
    //     var headers= new HttpHeaders({'Content-Type':'application/json','withCredentials': 'true',"Authorization":"Bearer "+token})
    //     return this.http.get(this.api+'GetNombreDossierDocumentForYearForPeriodeByDay/'+idpole+'/'+code+'/'+'/'+annee+'/'+periode,{headers:headers})
    // }

}
