import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ScheduleService } from '../../services/schedule.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
//
import { IonInfiniteScroll } from '@ionic/angular';
var SearchPage = /** @class */ (function () {
    function SearchPage(actionSheetController, scheduleService, alertController, router, loadingController) {
        this.actionSheetController = actionSheetController;
        this.scheduleService = scheduleService;
        this.alertController = alertController;
        this.router = router;
        this.loadingController = loadingController;
        this.searchMode = "geral";
    }
    SearchPage.prototype.ngOnInit = function () {
        // this.getTrabalhos(true);
        //this.presentLoading();
    };
    SearchPage.prototype.goHome = function () {
        this.router.navigateByUrl('/home');
    };
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
    SearchPage.prototype.favItem = function (item) {
        var _this = this;
        var index = this.trabalhos.indexOf(item, 0);
        //must fix favoritos.
        if (index > -1) {
            this.trabalhos[index].favorito = !this.trabalhos[index].favorito;
        }
        else {
            if (this.mesa != null) {
                var index_1 = this.mesa.trabalhos.indexOf(item, 0);
                if (index_1 > -1) {
                    this.mesa.trabalhos[index_1].favorito = !this.mesa.trabalhos[index_1].favorito;
                    this.trabalhos.map(function (trab) {
                        if (trab.numero == _this.mesa.trabalhos[index_1].numero) {
                            trab.favorito = _this.mesa.trabalhos[index_1].favorito;
                        }
                    });
                }
            }
        }
    };
    SearchPage.prototype.download = function (item) {
        //var browser = this.iab.create(item.url, '_system');
    };
    SearchPage.prototype.popAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm!',
                            subHeader: 'Subtitle',
                            message: 'Message <strong>text</strong>!!!',
                            buttons: [
                                {
                                    text: 'Okay',
                                    role: 'oKay',
                                    cssClass: 'popUpSearch buttonPopUp1',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'popUpSearch buttonPopUp2',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: nah');
                                    }
                                },
                                {
                                    text: 'Outros Trabalhos',
                                    role: 'others',
                                    cssClass: 'popUpSearch buttonPopUp3',
                                    handler: function () {
                                        console.log('Other things');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, alert.onDidDismiss()];
                    case 3:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.searchData = function ($event) {
        var _this = this;
        switch (this.searchMode) {
            case "autor": {
                this.filteredTrabalhos = this.trabalhos.filter(function (item) {
                    console.log(item.searchInput);
                    return item.autores.toLowerCase().indexOf(_this.searchInput.toLowerCase()) > -1;
                });
                break;
            }
            case "titulo": {
                this.filteredTrabalhos = this.trabalhos.filter(function (item) {
                    return item.titulo.toLowerCase().indexOf(_this.searchInput.toLowerCase()) > -1;
                });
                break;
            }
            case "geral": {
                this.filteredTrabalhos = this.trabalhos.filter(function (item) {
                    return item.titulo.toLowerCase().indexOf(_this.searchInput.toLowerCase()) > -1 ||
                        item.autores.toLowerCase().indexOf(_this.searchInput.toLowerCase()) > -1;
                });
                break;
            }
            case "mesas": {
                this.filteredTrabalhos = this.trabalhos.filter(function (item) {
                    return item.titulo.toLowerCase().indexOf(_this.searchInput.toLowerCase()) > -1;
                });
                break;
            }
        }
    };
    SearchPage.prototype.presentActionSheet = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Configurações',
                            buttons: [{
                                    text: 'Delete',
                                    role: 'destructive',
                                    icon: 'trash',
                                    handler: function () {
                                        console.log('Delete clicked');
                                    }
                                }, {
                                    text: 'Share',
                                    icon: 'share',
                                    handler: function () {
                                        console.log('Share clicked');
                                    }
                                }, {
                                    text: 'Play (open modal)',
                                    icon: 'arrow-dropright-circle',
                                    handler: function () {
                                        console.log('Play clicked');
                                    }
                                }, {
                                    text: 'Favorite',
                                    icon: 'heart',
                                    handler: function () {
                                        console.log('Favorite clicked');
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.loadData = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.data.length == 1) {
                event.target.disabled = true;
            }
        }, 500);
    };
    SearchPage.prototype.toggleInfiniteScroll = function () {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    };
    tslib_1.__decorate([
        ViewChild(IonInfiniteScroll),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], SearchPage.prototype, "infiniteScroll", void 0);
    SearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.page.html',
            styleUrls: ['./search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActionSheetController,
            ScheduleService,
            AlertController,
            Router,
            LoadingController])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.page.js.map