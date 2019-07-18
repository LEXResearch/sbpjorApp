import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';

import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private schedule: ScheduleService,
    public loadingController: LoadingController

  ) { }

  usuario: string;
  psw1: any;
  psw2: any;
  loading: any;

  ngOnInit() {

  }

  async presentLoadingWithOptions(message: string) {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: message,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  goLoginPage(){
    this.router.navigateByUrl('/login');
  }
  goAnonimateType(){
    this.presentLoadingWithOptions("Modo anônimo...");
    this.schedule.registerAnon().then(d => {
      if(d['username']){
        this.schedule.authetication(d['username'], d['username'], true).then(res =>{
          
          this.loading.dismiss();
          this.router.navigateByUrl('/home');
        });
      }
    });
  }
  doRegistro(){
    if(this.usuario != null && this.psw1 != null && this.psw2 != null && this.psw1 == this.psw2){
      this.presentLoadingWithOptions("Registrando...");

      this.schedule.registerUser(this.usuario, this.psw1).then((data) => {
        this.loading.dismiss();
        let navExtra: NavigationExtras = {
          state: {
            registred: 1 // this say to login page to display a modal to login
          }
        }
        this.router.navigate(['login'], navExtra);

      }).catch((err) => {
        console.log(err);
      });
    } else {
      console.log("algo esta errado");
    }


  }

}
