import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { ScheduleService } from '../../services/schedule.service';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';





@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  
  trabalhos: any;

  filteredTrabalhos: any;

  favoritos: Array<number>;

  loading: any;

  searchMode: string = "geral";
  searchInput: string;

  mesa: any;

  constructor(public actionSheetController: ActionSheetController,
              private scheduleService: ScheduleService,
              public alertController: AlertController,
              private router: Router,
              public loadingController: LoadingController
  ) { }

  ngOnInit() {

    // this.getTrabalhos(true);
    //this.presentLoading();

  }
  goHome() {
    this.router.navigateByUrl('/home');
  }
  //loading
  // async presentLoading() {
  //   const 
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();

  //   console.log('Loading dismissed!');
  // }


  // async getTrabalhos(refresh, refresher?) {
  //   this.loading = await this.loadingController.create({
  //     message: 'Carregando...',
  //         //1500
  //     spinner: "crescent"
  //   });
  //   await this.loading.present();
  //   this.scheduleService.getTrabalhos(refresh).subscribe(res => {
  //     this.trabalhos = res;
  //     this.filteredTrabalhos = res;
  //     console.log(res);
  //     if (refresher) {
  //       refresher.target.complete();
  //     }
  //     this.loading.dismiss();

  //   });
  // }

  

  favItem(item){
    const index = this.trabalhos.indexOf(item, 0);
    //must fix favoritos.

    if (index > -1) {
      this.trabalhos[index].favorito = !this.trabalhos[index].favorito;
    } else {
  		if(this.mesa != null) {
  			const index = this.mesa.trabalhos.indexOf(item, 0);
  			if (index > -1) {
  				this.mesa.trabalhos[index].favorito = !this.mesa.trabalhos[index].favorito;
  				this.trabalhos.map((trab) => {
  					if(trab.numero == this.mesa.trabalhos[index].numero){
  						trab.favorito = this.mesa.trabalhos[index].favorito;
  					}
  				});
  			}
  		}

    }
  }

  download(item) {
    //var browser = this.iab.create(item.url, '_system');
  }
  

  async popAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      subHeader: 'Subtitle',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'oKay',
          cssClass: 'popUpSearch buttonPopUp1',
          
          
          handler: () => {
            console.log('Confirm Okay');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'popUpSearch buttonPopUp2',
         

          handler: (blah) => {
            console.log('Confirm Cancel: nah');
          }
        },
        {
          text: 'Outros Trabalhos',
          role: 'others',
          cssClass: 'popUpSearch buttonPopUp3',
          handler: () => {
            console.log('Other things');
          }
          
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  

 
  

  searchData($event) {
    switch (this.searchMode) {
      case "autor":{
        this.filteredTrabalhos = this.trabalhos.filter((item) => {
          console.log(item.searchInput);
          return item.autores.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "titulo":{
        this.filteredTrabalhos = this.trabalhos.filter((item) => {
          return item.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
      case "geral":{
        this.filteredTrabalhos = this.trabalhos.filter((item) => {
          return item.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1 ||
          item.autores.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1
        });
        break;
      }
      case "mesas":{
        this.filteredTrabalhos = this.trabalhos.filter((item) => {
          return item.titulo.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });
        break;
      }
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Configurações',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
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


// Infinity scroll 
items: Array <any>=[] ;  

loadData(event) {
  setTimeout(() => {
    console.log('Done');
    this.addMoreItems();

    event.target.complete();

    
  }, 800);
}

addMoreItems() {
  for (let i=0; i<3; i++)
    this.items.push(i);
}

// ends here


}



 


