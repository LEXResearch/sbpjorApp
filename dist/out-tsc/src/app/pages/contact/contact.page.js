import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ScheduleService } from '../../services/schedule.service';
var ContactPage = /** @class */ (function () {
    function ContactPage(scheduleService, toastController) {
        this.scheduleService = scheduleService;
        this.toastController = toastController;
    }
    ContactPage.prototype.ngOnInit = function () {
    };
    ContactPage.prototype.sendMessage = function () {
        if (this.assunto != null && this.mensagem != null) {
            this.scheduleService.sendMessage(this.assunto, this.mensagem);
            this.presentToast("Mensagem enviada!");
        }
        else {
            this.presentToast("Ops! Informe todos os dados.");
        }
    };
    ContactPage.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 2000,
                            position: 'bottom',
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactPage = tslib_1.__decorate([
        Component({
            selector: 'app-contact',
            templateUrl: './contact.page.html',
            styleUrls: ['./contact.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ScheduleService,
            ToastController])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
//# sourceMappingURL=contact.page.js.map