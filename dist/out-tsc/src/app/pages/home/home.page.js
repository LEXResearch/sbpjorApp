import * as tslib_1 from "tslib";
import { Platform, MenuController, ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DescriptionPage } from '../../modals/description/description.page';
import { ScheduleService } from '../../services/schedule.service';
var HomePage = /** @class */ (function () {
    function HomePage(scheduleService, plt, menu, router, modalController) {
        this.scheduleService = scheduleService;
        this.plt = plt;
        this.menu = menu;
        this.router = router;
        this.modalController = modalController;
        this.cronograma = [];
        this.slideOpts = {
            speed: 1000,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 100
        };
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.plt.ready().then(function () {
            _this.loadData(true);
        });
    };
    HomePage.prototype.openModal = function (atividade) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: DescriptionPage,
                            componentProps: {
                                "atividade": atividade
                            },
                            showBackdrop: false,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (dataReturned) {
                            if (dataReturned !== null) {
                                _this.dataReturned = dataReturned.data;
                                //alert('Modal Sent Data :'+ dataReturned);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.loadData = function (refresh, refresher) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.scheduleService.getCronograma(refresh).subscribe(function (res) {
            _this.cronograma = res;
            console.log(res);
            if (refresher) {
                refresher.target.complete();
            }
        });
    };
    HomePage.prototype.goDescription = function (id) {
        this.router.navigateByUrl('/description/{{ id }}/mesa-livre');
    };
    HomePage.prototype.cronogramaByDay = function (day) {
        return this.cronograma.filter(function (item) {
            if (item.data != null)
                return item.data.split('-')[2] == day;
        });
    };
    HomePage.prototype.hora = function (item) {
        return item.hora.split('T')[1].split(":")[0];
    };
    HomePage.prototype.cor = function (atividade) {
        return { 'background': 'linear-gradient(90deg, ' + atividade.cor_hex + ' 15px, #FFFFFF 15px)' };
    };
    HomePage.prototype.expandItem = function (item) {
        this.cronograma.map(function (listItem) {
            if (item == listItem) {
                listItem.open = !listItem.open;
            }
            else {
                listItem.open = false;
            }
            return listItem;
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ScheduleService,
            Platform,
            MenuController,
            Router,
            ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map