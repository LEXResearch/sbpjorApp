import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { ScheduleService } from '../../services/schedule.service';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';





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

  mesas: any;

  cronograma: any;

  switcher: number;
  searchInput: string;

  orderBy: string = 'Título (A-Z)';
  orderByOptions: Array<string> = ['Título (A-Z)', 'Título (Z-A)', 'Número (cresc)', 'Número (descr)', 'Autor (A-Z)', 'Autor (Z-A)'];

  constructor(public actionSheetController: ActionSheetController,
              private scheduleService: ScheduleService,
              public alertController: AlertController,
              private router: Router,
              public loadingController: LoadingController,
              private route: ActivatedRoute,
              private iab: InAppBrowser,
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
        this.searchInput = "Mesa " + this.mesa.numero;
      }
      
      this.loading.dismiss();

      this.scheduleService.getMesas(true).then(m => {
        this.mesas = JSON.parse(m);
      })

      this.scheduleService.getCronograma(true).then(m =>{
        this.cronograma = JSON.parse(m);
      })
    });
  }
  goHome() {
    this.router.navigateByUrl('/home');
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      duration: 5000,
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

  download(item) {
    const browser = this.iab.create("https://google.com", '_system');
    
    browser.close();
  }

  downloadAll(item){
    this.filteredTrabalhos.forEach(t => {
      console.log(t);
      const browser = this.iab.create(t.url, '_system');

      browser.close();
    });
  }

 
  searchData($event) {
    this.filteredTrabalhos = this.trabalhos.filter((it) => {
      return it.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1 ||
      it.autores.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1 || (this.searchInput.toLowerCase() == ("mesa " + it.mesa)) || (this.searchInput.toLowerCase() == (it.mesa)) 
    })

    this.filteredFav = this.filteredTrabalhos.filter((it) => { 
      return it.favorito
    })
  }

  getMesa(id: number){
    return this.mesas.filter(m => {
      if(m.numero == id)
        return m;
    })[0]
  }

  getAtividade(id: number){
    return this.cronograma[0].dias.filter(d => {
      d.atividades.forEach(at => {
        console.log(at)
        console.log(at.mesas.indexOf(id))
        if(at.mesas.indexOf(id) > -1)
          console.log("retornou ue");
          return at;
      });
    });
  }

  reOrder(order){
    switch(order){
      case 'Título (A-Z)':
        this.trabalhos.sort((a, b) => {
          return a.titulo.localeCompare(b.titulo)
        }
          
        );
        break;
      case 'Título (Z-A)':
          this.trabalhos.sort((a, b) => {
            return b.titulo.localeCompare(a.titulo)
          });
        break;
      case 'Número (cresc)':
         
          this.trabalhos.sort((a, b) =>
            a.numero - b.numero
          );
          console.log(this.trabalhos);
        break;
      case 'Número (descr)':
          this.trabalhos.sort((a, b) =>
            b.numero - a.numero
          );
          console.log(this.trabalhos);
        break;
      case 'Autor (A-Z)':
          this.trabalhos.sort((a, b) => {
            return a.autores.localeCompare(b.autores)
          });
        break;
      case 'Autor (Z-A)':
          this.trabalhos.sort((a, b) => {
            return b.autores.localeCompare(a.autores)
          });
        break;
    }
  }

  changeOrderBy(){
    let index = this.orderByOptions.indexOf(this.orderBy, 0);
    index++;
    if(index >= this.orderByOptions.length ){
      index = 0;
    }
    this.orderBy = this.orderByOptions[index];
    this.reOrder(this.orderBy);
    console.log(this.orderBy);
  }

  async infoTrabalho(item) {
    this.mesa = this.getMesa(item.mesa);
    console.log(this.mesa);
    this.atividade = this.getAtividade(this.mesa.numero);
    console.log(this.atividade);
    const actionSheet = await this.actionSheetController.create({
      header: 'Mesa ' + item.mesa + " às " + this.atividade.hora,
      buttons: [
        {
          text: 'Trabalhos relacionados',
          icon: 'albums',
          handler: () => {
            this.searchInput = "Mesa " + item.mesa;
          }
        },
        {
          text: 'Baixar trabalhos mesa',
          icon: 'document',
          handler: () => {
            this.searchInput = "Mesa " + item.mesa;
            console.log(this.filteredTrabalhos);
            this.downloadAll(item);
          }
        },
      {
        text: 'Baixar este trabalho',
        icon: 'download',
        handler: () => {
          this.download(item);
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
