import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
var DescriptionPage = /** @class */ (function () {
    function DescriptionPage(modalController) {
        this.modalController = modalController;
    }
    DescriptionPage.prototype.ngOnInit = function () {
        this.mesasMode = 'livres';
    };
    DescriptionPage.prototype.closeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var onClosedData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onClosedData = "Wrapped Up!";
                        return [4 /*yield*/, this.modalController.dismiss(onClosedData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DescriptionPage.prototype.hora = function (data) {
        return data.split('T')[1].split(":")[0];
    };
    DescriptionPage.prototype.min = function (data) {
        return data.split("T")[1].split(":")[1];
    };
    DescriptionPage.prototype.mesasFilter = function (b) {
        return this.atividade.mesas.filter(function (mesa) {
            return mesa.coordenada == b;
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DescriptionPage.prototype, "atividade", void 0);
    DescriptionPage = tslib_1.__decorate([
        Component({
            selector: 'app-description',
            templateUrl: './description.page.html',
            styleUrls: ['./description.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], DescriptionPage);
    return DescriptionPage;
}());
export { DescriptionPage };
//# sourceMappingURL=description.page.js.map