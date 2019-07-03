import { Platform, MenuController, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
    public loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.getCronograma()
    });
    this.presentLoadingWithOptions();
  }
  //loading 
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,   //1000
      message: 'Por favor espere...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }



  async openModal(atividade) {
    const modal = await this.modalController.create({
      component: DescriptionPage,
      componentProps: {
        "atividade": atividade
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

  // loadData(refresh = false, refresher?) {
  //   this.scheduleService.getCronograma(refresh).subscribe(res => {
  //     this.cronograma = res;
  //     console.log(res);
  //     if (refresher) {
  //       refresher.target.complete();
  //     }
  //   });
  // }

  goDescription(id){
    this.router.navigateByUrl('/description/{{ id }}/mesa-livre');
  }

  getCronograma(){
    this.scheduleService.getCronograma().then(data => {
      this.cronograma = data;
      console.log(data);
      console.log("homepage");
    });
  }



  // cronogramaByDay(day){
  //   return this.cronograma.filter((item) => {
  //     if (item.data != null)
  //      return item.data.split('-')[2] == day;
  //   });
  // }

  // hora(item){
  //   return item.hora.split('T')[1].split(":")[0];
  // }

  // cor(atividade){
  //   return {'background': 'linear-gradient(90deg, '+ atividade.cor_hex +' 15px, #FFFFFF 15px)'};
  // }

  // expandItem(item){
  //       this.cronograma.map((listItem) => {
  //           if(item == listItem){
  //               listItem.open = !listItem.open;
  //           } else {
  //               listItem.open = false;
  //           }
  //           return listItem;
  //       });
  // }

}
