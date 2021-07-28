import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

    api=environment.api;
    constructor(private http: HttpClient) { }

    apii="http://orbuspoles.orbus.sn/testPhp/code1.php?filter=encours";

    loadReporting():Observable<any>{
        return this.http.get(this.apii);
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
