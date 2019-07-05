import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';

import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ScheduleService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    ) {
      this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let toast = this.toastController.create({
          message: 'Registrado! Agora é só logar!',
          duration: 3000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
      }
    });
    }
    usuario: any;
    password: any;
    loading: any;

  ngOnInit() {

  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: 'Entrando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  doLogin(){
    if(this.usuario != null && this.password != null){
      this.presentLoadingWithOptions();
      this.service.authetication(this.usuario, this.password).then(d => {
        this.loading.dismiss();
        this.router.navigateByUrl('/home');
      }).catch( d => {
        this.loading.dismiss();
        let toast = this.toastController.create({
          message: 'Não conseguimos logar, tente novamente!',
          duration: 3000,
          position: 'bottom',
        })
        toast.then(toast => toast.present());
      });
    }


    //fazer função aqui
  }





}
