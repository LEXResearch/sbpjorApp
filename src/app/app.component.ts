import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';

export interface PageInterface {
  title: string;
  name: string;
  url: any;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  appPages: PageInterface[] = [
    { title: 'Início', name: 'HomePage', url: '/home', icon: '/assets/icon/home.svg', active: false },
    { title: 'Cronograma', name: 'HomePage', url: '/home', icon: '/assets/icon/cronograma.svg', active: false },
    { title: 'Pesquisa', name: 'SearchPage', url: '/search',   icon: '/assets/icon/pesquisa.svg', active: false },
    { title: 'Trabalhos Favoritos', name: 'Favorite', url: '/favorite',   icon: '/assets/icon/favoritos.svg', active: false },
    { title: 'Fale Conosco', name: 'TalkUs', url: '/contact',   icon: '/assets/icon/contato.svg', active: false },
    { title: 'Meus Dados', name: 'SearchPage', url: '/contact',   icon: '/assets/icon/configuracao.svg', active: true },
    { title: 'Sobre', name: 'About', url: '/contact',   icon: '/assets/icon/info.svg', active: false },
  ]

  openPage(page){
    this.menu.close();
    this.router.navigateByUrl(page.url);
  }

}
