import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor() { }

    login(data){
        if((data.login==="user")&&(data.motdepasse==="passer123")){
            return true;
        }else{
            return false;
        }
    }
}
