import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, router, menu) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.router = router;
        this.menu = menu;
        this.appPages = [
            { title: 'Início', name: 'HomePage', url: '/home', icon: '/assets/icon/home.svg', active: false },
            { title: 'Cronograma', name: 'HomePage', url: '/home', icon: '/assets/icon/cronograma.svg', active: false },
            { title: 'Pesquisa', name: 'SearchPage', url: '/search', icon: '/assets/icon/pesquisa.svg', active: false },
            { title: 'Trabalhos Favoritos', name: 'Favorite', url: '/favorite', icon: '/assets/icon/favoritos.svg', active: false },
            { title: 'Fale Conosco', name: 'TalkUs', url: '/contact', icon: '/assets/icon/contato.svg', active: false },
            { title: 'Meus Dados', name: 'SearchPage', url: '/contact', icon: '/assets/icon/configuracao.svg', active: true },
            { title: 'Sobre', name: 'About', url: '/contact', icon: '/assets/icon/info.svg', active: false },
            { title: 'Registro', name: 'RegisterPage', url: '/register', icon: '/assets/icon/info.svg', active: false },
        ];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.openPage = function (page) {
        this.menu.close();
        this.router.navigateByUrl(page.url);
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            Router,
            MenuController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map