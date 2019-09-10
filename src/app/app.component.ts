import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router, NavigationExtras } from '@angular/router';

import { MenuController } from '@ionic/angular';


import { ScheduleService } from './services/schedule.service';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';



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
    private menu: MenuController,
    private schedule: ScheduleService,
  ) {
    this.initializeApp();
  }

  userStatus: string;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();


      this.schedule.getState().then(d => {
        this.userStatus = d;
        if(d == 'anon' || d == 'logedin') {
          this.router.navigateByUrl('/home');
        } else if(d == 'logout') {
          this.router.navigateByUrl('/register');
        } else {
          this.userStatus = 'logout';
          this.router.navigateByUrl('/register');
        }

        this.splashScreen.hide();
      });
    });

  }
  refresh(){
    this.userStatus = this.schedule.getStateVar();
    console.log(this.userStatus);
  }

  openPage(link){
    this.menu.close();
    this.router.navigateByUrl(link);
  }
  goToRegister(){
    this.menu.close();
    this.router.navigateByUrl('/register');
  }
  doLogout(){
    this.schedule.logout().then(() => {
      this.menu.close();
      this.router.navigateByUrl('/register');
    });
  }

  icone(i){
    switch(i){
      case 'home':
        return "/assets/icon/cronograma.svg";
      case 'pesquisa':
        return "/assets/icon/pesquisa.svg";
      
      case 'favoritos':
        return "/assets/icon/favoritos.svg";
      
      case 'contato':
        return "/assets/icon/contato.svg";
    }
      
  }

  home(){
    this.menu.close();
    this.router.navigateByUrl('/home');
  }

  goFav(){
    let navExtra: NavigationExtras = {
      state: {
        mode: 1 // this say to login page to display a modal to login
      }
    }
    this.menu.close();
    this.router.navigate(['search'], navExtra);
  }

  goSearch(){
      let navExtra: NavigationExtras = {
        state: {
          mode: 0 // this say to login page to display a modal to login
        }
      }
      this.menu.close();
      this.router.navigate(['search'], navExtra);
  }

}
