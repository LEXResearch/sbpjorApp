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
  atividade: any;
  day: any;
  color: any;


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
    this.presentLoadingWithOptions();
    this.plt.ready().then(() => {
      this.getCronograma()
    });
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
      this.cronograma = JSON.parse(data);
      console.log(data);
      // console.log("homepageCronogr");
    });
  }
  // getMethod(){
  //   this.scheduleService.getMethod("cronograma").then(data => {
  //     this.cronograma = JSON.parse(data);
  //
  //     console.log(data);
  //     console.log(this.cronograma);
  //     console.log("homepageMethod");
  //
  //     this.color = this.cronograma[0].dias[0].atividades[0].categoria;
  //     this.atividade = data[0].dias[0].atividades;
  //     console.log(this.atividade);
  //     this.day = data[0].dias;
  //     console.log(this.day);
  //     console.log(this.day[0].atividades[0].mesas);
  //     console.log(this.day[0].atividades[0].mesas.length);
  //     console.log(this.day[0].atividades[0].mesas['length']);
  //
  //
  //   });
  //}



  // cronogramaByDay(day){
  //   return this.cronograma.filter((item) => {
  //     if (item.data != null)
  //      return item.data.split('-')[2] == day;
  //   });
  // }
  cronogramaByDay(day){
    return this.cronograma.filter((day) => {
      if (day.dias[0] != null)
        console.log("passou mermao");
        return day.data.split('-')[2] == day;



    });
  }

  hora(item){
    return item.split('T')[1].split(":")[0];//item.data
  }

  cor(color){
 //   return {'background': 'linear-gradient(90deg, '+ color.cor_hex +' 15px, #FFFFFF 15px)'};
 // if( color == 2)
  return {'background': 'linear-gradient(90deg, 15px, #FFFFFF 15px)'};
  }

  expandItem(item){
        this.cronograma.map((listItem) => {
            if(item == listItem){
                listItem.open = !listItem.open;
            } else {
                listItem.open = false;
            }
            return listItem;
        });
  }

}
