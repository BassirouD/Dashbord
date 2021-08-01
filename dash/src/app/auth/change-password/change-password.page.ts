import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

    login=localStorage.getItem('login')
    loadData={login:this.login,password:'',confirmPassword:''};
    user:any;

    container = document.querySelector(".container")

    constructor(private authS:AuthService,public loadingController:LoadingController,
                public router:Router,
                private toastController: ToastController,public auths:AuthService,
                private alertCtrl: AlertController,public nav:NavController
    ) { }

    ngOnInit() {
    }

    async update(){
        const loading = await this.loadingController.create({
            message:"Please wait !!!",
            duration:3000
        });
        await loading.present()
        if(this.loadData.password===this.loadData.confirmPassword){
            // this.authS.changePassword(this.loadData)
            //     .subscribe(data=>{
            //         loading.dismiss()
            //         this.presentAlert("Mot de passe modifié !!");
            //         this.router.navigate(['login'])
            //     },err=>{
            //         console.log(err);
            //     })
        }else{
            this.presentAlert("Mot de passe non conforme !!");
        }

    }

    goToCompte(){
        this.router.navigateByUrl('/tabs/profile')
    }

    signIn(evt){
        this.container.classList.remove("sign-up-mode");
        document.querySelector("sign-in-mode");
    }

    signUp(evt){
        this.container.classList.add("sign-up-mode");
        document.querySelector("sign-up-mode");
    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Alerte',
            message: mgs,
            buttons: ['OK']
        });

        await alert.present();

    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    async changePassword(){
        // const loading = await this.loadingController.create({
        //     message:"Please wait !!!",
        //     duration:3000
        // });
        // await loading.present()
        // if(this.loadData.password===this.loadData.confirmpassword){
        //     let body = `login=${this.login}&password=${this.loadData.password}`;
        //     // alert(JSON.stringify(body))
        //     this.authS.changePwd(body)
        //         .subscribe(data=>{
        //             loading.dismiss();
        //             this.presentAlert("Mot de passe modifié !!");
        this.router.navigate(['/profile'])
        //         },err=>{
        //             console.log("error "+err);
        //         })
        // }else{
        //     this.presentAlert("Mot de passe non conforme !!");
        // }

    }

    getUser(){
        // this.authS.getUserbyLogin(this.login)
        //     .subscribe(data=>{
        //         this.user=data;
        //     })
    }


}
