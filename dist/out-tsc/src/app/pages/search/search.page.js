import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ScheduleService } from '../../services/schedule.service';
var SearchPage = /** @class */ (function () {
    function SearchPage(actionSheetController, scheduleService) {
        this.actionSheetController = actionSheetController;
        this.scheduleService = scheduleService;
        this.searchMode = "geral";
    }
    SearchPage.prototype.ngOnInit = function () {
        this.getTrabalhos(true);
    };
    SearchPage.prototype.getTrabalhos = function (refresh, refresher) {
        var _this = this;
        this.scheduleService.getTrabalhos(refresh).subscribe(function (res) {
            _this.trabalhos = res;
            _this.filteredTrabalhos = res;
            console.log(res);
            if (refresher) {
                refresher.target.complete();
            }
        });
    };
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
    SearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.page.html',
            styleUrls: ['./search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActionSheetController,
            ScheduleService])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//ddddd
var AlertExample = /** @class */ (function () {
    function AlertExample(alertController) {
        this.alertController = alertController;
    }
    AlertExample.prototype.presentAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Alert',
                            subHeader: 'Subtitle',
                            message: 'This is an alert message.',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertExample.prototype.presentAlertMultipleButtons = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Alert',
                            subHeader: 'Subtitle',
                            message: 'This is an alert message.',
                            buttons: ['Cancel', 'Open Modal', 'Delete']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertExample.prototype.presentAlertConfirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm!',
                            message: 'Message <strong>text</strong>!!!',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertExample.prototype.presentAlertPrompt = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Prompt!',
                            inputs: [
                                {
                                    name: 'name1',
                                    type: 'text',
                                    placeholder: 'Placeholder 1'
                                },
                                {
                                    name: 'name2',
                                    type: 'text',
                                    id: 'name2-id',
                                    value: 'hello',
                                    placeholder: 'Placeholder 2'
                                },
                                {
                                    name: 'name3',
                                    value: 'http://ionicframework.com',
                                    type: 'url',
                                    placeholder: 'Favorite site ever'
                                },
                                // input date with min & max
                                {
                                    name: 'name4',
                                    type: 'date',
                                    min: '2017-03-01',
                                    max: '2018-01-12'
                                },
                                // input date without min nor max
                                {
                                    name: 'name5',
                                    type: 'date'
                                },
                                {
                                    name: 'name6',
                                    type: 'number',
                                    min: -5,
                                    max: 10
                                },
                                {
                                    name: 'name7',
                                    type: 'number'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertExample.prototype.presentAlertRadio = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Radio',
                            inputs: [
                                {
                                    name: 'radio1',
                                    type: 'radio',
                                    label: 'Radio 1',
                                    value: 'value1',
                                    checked: true
                                },
                                {
                                    name: 'radio2',
                                    type: 'radio',
                                    label: 'Radio 2',
                                    value: 'value2'
                                },
                                {
                                    name: 'radio3',
                                    type: 'radio',
                                    label: 'Radio 3',
                                    value: 'value3'
                                },
                                {
                                    name: 'radio4',
                                    type: 'radio',
                                    label: 'Radio 4',
                                    value: 'value4'
                                },
                                {
                                    name: 'radio5',
                                    type: 'radio',
                                    label: 'Radio 5',
                                    value: 'value5'
                                },
                                {
                                    name: 'radio6',
                                    type: 'radio',
                                    label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
                                    value: 'value6'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertExample.prototype.presentAlertCheckbox = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Checkbox',
                            inputs: [
                                {
                                    name: 'checkbox1',
                                    type: 'checkbox',
                                    label: 'Checkbox 1',
                                    value: 'value1',
                                    checked: true
                                },
                                {
                                    name: 'checkbox2',
                                    type: 'checkbox',
                                    label: 'Checkbox 2',
                                    value: 'value2'
                                },
                                {
                                    name: 'checkbox3',
                                    type: 'checkbox',
                                    label: 'Checkbox 3',
                                    value: 'value3'
                                },
                                {
                                    name: 'checkbox4',
                                    type: 'checkbox',
                                    label: 'Checkbox 4',
                                    value: 'value4'
                                },
                                {
                                    name: 'checkbox5',
                                    type: 'checkbox',
                                    label: 'Checkbox 5',
                                    value: 'value5'
                                },
                                {
                                    name: 'checkbox6',
                                    type: 'checkbox',
                                    label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
                                    value: 'value6'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AlertExample;
}());
export { AlertExample };
//ddddd
//# sourceMappingURL=search.page.js.map