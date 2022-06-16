import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loadData = {login: 'user', password: 'passer123'};

    constructor(public loadingController: LoadingController,
                public router: Router,
                private toastController: ToastController, public auths: AuthService,
                private alertCtrl: AlertController, public nav: NavController) {
    }

    ngOnInit() {
    }

    async login() {
        const loading = await this.loadingController.create({
            message: "Please wait !!!",
            duration: 3000
        });
        await loading.present()
        //console.log(this.loadData);
        const credential = this.auths.login(this.loadData);
        if (credential) {
            loading.dismiss();
            this.presentToast("Connexion réussie !");
            localStorage.setItem('loggedIn', 'true');
            this.router.navigate(['/tabs/home']);
        } else {
            loading.dismiss();
            this.presentToastError('Login ou mot de passe incorrect !');
        }
    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            message: mgs,
            buttons: ['OK']
        });

        await alert.present();

    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: "success"
        });
        toast.present();
    }

    async presentToastError(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: "danger"
        });
        toast.present();
    }
}
