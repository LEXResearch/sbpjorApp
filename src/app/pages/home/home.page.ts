import { Platform, MenuController, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { DescriptionPage } from '../../modals/description/description.page';

import { ScheduleService } from '../../services/schedule.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cronograma: any;
  atividade: any;
  mesas: any;


  loading: any;

  slideOpts = {
    speed: 1000,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 100
  };

  dataReturned:any;


  constructor(
    private scheduleService: ScheduleService,
    private plt: Platform,
    private menu: MenuController,
    private router: Router,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,

  ) { }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.plt.ready().then(() => {
      this.loadData(true);
    });
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }


  //loading
  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: 'Por favor espere...',
      duration: 10000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }



  async openModal(atividade) {
    var mesas = this.mesas.filter((m) => {
      if (atividade.mesas.includes(m.numero))
        return m;
    })
    const modal = await this.modalController.create({
      component: DescriptionPage,
      componentProps: {
        "atividade": atividade,
        "mesas": mesas
      },
      showBackdrop: false,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  loadData(refresh = false) {
    this.scheduleService.getCronograma(refresh)
    .then(res => {
      this.cronograma = JSON.parse(res);
      this.loading.dismiss();
    }).catch(error => {
        this.presentToast("Falha ao carregar informações");
        this.loading.dismiss();
      });
    this.scheduleService.getMesas(refresh)
    .then(info => {
      this.mesas = JSON.parse(info);
    });
  }


  goDescription(id){
    this.router.navigateByUrl('/description/{{ id }}/mesa-livre');
  }

  hora(item){
    return item.split('T')[1].split(":")[0];//item.data
  }

  backgroundColor(categoria){
    return {'background': 'linear-gradient(90deg, '+ categoria.cor_hex +' 15px, #FFFFFF 15px)'};
  }

  expandItem(item){
        item.open = !item.open;
  }

}
