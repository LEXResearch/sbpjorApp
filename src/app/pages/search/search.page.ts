import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { ScheduleService } from '../../services/schedule.service';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';





@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  filteredTrabalhos: any = [];
  filteredFav: any = [];

  trabalhos: any = [];
  favoritos: any = [];

  loading: any;

  atividade: any;

  mesa: any;

  switcher: number;
  searchInput: string;

  orderBy: string = 'Título (cresc)';
  orderByOptions: Array<string> = ['título (cresc)', 'título (descr)', 'número (cresc)', 'número (descr)', 'autor (cresc)', 'autor (descr)'];

  constructor(public actionSheetController: ActionSheetController,
              private scheduleService: ScheduleService,
              public alertController: AlertController,
              private router: Router,
              public loadingController: LoadingController,
              private route: ActivatedRoute,
  )
  {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.switcher = this.router.getCurrentNavigation().extras.state.mode;
      }
      if (this.router.getCurrentNavigation().extras.state.mesa){
        this.mesa = this.router.getCurrentNavigation().extras.state.mesa;
      }
    });
  }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.scheduleService.getTrabalhos(true).then(res => {
      this.trabalhos = JSON.parse(res);

      this.favoritos = this.trabalhos.filter((item) =>{
        if(item.favorito)
          return item;
      });

      this.filteredTrabalhos = this.trabalhos;
      this.filteredFav = this.favoritos;

      if(this.mesa){
        this.searchInput = "MESA " + this.mesa.numero;

        this.filteredTrabalhos = this.trabalhos.filter(t =>{
          if(this.mesa.contains(t.pk))
            return t;
        })
      }

      this.loading.dismiss();
    });
  }
  goHome() {
    this.router.navigateByUrl('/home');
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }


  reFav(){
    this.favoritos = this.trabalhos.filter((item) =>{
      if(item.favorito)
        return item;
    });
    this.filteredFav = this.favoritos;

    this.searchData(null);
  }

  favItem(item){
    const index = this.trabalhos.indexOf(item, 0);

    if (index > -1) {
      this.trabalhos[index].favorito = !this.trabalhos[index].favorito;
      this.scheduleService.sendFavorito(this.trabalhos[index].pk, this.trabalhos[index].favorito);
    }
  }

  download(items) {
    var browser;
    for(var x in items){
      //browser = this.iab.create(item.url, '_system');
    }
    //
  }

  async popAlert(item) {
    this.scheduleService.getCronograma().then((d)=>{
      this.atividade = JSON.parse(d).filter((a) => {
        return a.pk == item.pk;
      });


    })
    const alert = await this.alertController.create({
      header: this.atividade.titulo,
      message: "icone-loca" + this.atividade.local + "<br>ic-hora: " + this.atividade.hora,
      buttons: [
        {
          text: 'trabalhos relacionados',
          role: 'others',
          cssClass: 'popUpSearch buttonPopUp2',
          handler: (blah) => {
            console.log('Confirm Cancel: nah');
          }
        },
        {
          text: 'baixar este trabalho',
          role: 'others',
          cssClass: 'popUpSearch buttonPopUp3',
          handler: () => {
            this.download(item);
          }

        },
        {
          text: 'baixar todos trabalhos',
          role: 'others',
          cssClass: 'popUpSearch buttonPopUp3',
          handler: () => {

            this.download(this.filteredTrabalhos);
          }

        },
        {
          text: 'voltar',
          role: 'voltar',
          cssClass: 'popUpSearch buttonPopUp1',


          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  searchData($event) {
    this.filteredTrabalhos = this.trabalhos.filter((it) => {
      return it.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1 ||
      it.autores.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1
    })

    this.filteredFav = this.trabalhos.filter((it) => { 
      return (it.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1 ||
      it.autores.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1) && it.favorito
    })
  }

  async infoTrabalho(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Atividade',
      buttons: [
        {
          text: 'Trabalhos relacionados',
          icon: 'albums',
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Baixar trabalhos mesa',
          icon: 'document',
          handler: () => {
            console.log('Share clicked');
          }
        },
      {
        text: 'Baixar este trabalho',
        role: 'destructive',
        icon: 'download',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async infoSearch() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Configurações de busca',
      buttons: [
        {
          text: 'Ordenar por: ' + this.orderBy,
          icon: 'albums',
          handler: () => {
            let index = this.orderByOptions.indexOf(this.orderBy, 0);
            index++;
            if(index >= this.orderByOptions.length ){
              index = 0;
            }
            this.orderBy = this.orderByOptions[index];
            console.log(this.orderBy);
            this.infoSearch();
          }
        },
        {
          text: 'Baixar trabalhos mesa',
          icon: 'document',
          handler: () => {
            console.log('Share clicked');
          }
        },
      {
        text: 'Baixar este trabalho',
        role: 'destructive',
        icon: 'download',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
