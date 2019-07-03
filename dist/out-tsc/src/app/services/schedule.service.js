import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NetworkService, ConnectionStatus } from './network.service';
import { LocaldataService } from './localdata.service';
import { Storage } from '@ionic/storage';
var API_STORAGE_KEY = 'specialkey';
var API_URL = 'https://sbpjor-server.herokuapp.com/api/'; // api url
var ScheduleService = /** @class */ (function () {
    function ScheduleService(http, networkService, localService, storage) {
        this.http = http;
        this.networkService = networkService;
        this.localService = localService;
        this.storage = storage;
        this.token = '';
    }
    // make user authetication, recieve a token that is used for futher requests
    ScheduleService.prototype.authetication = function (user, password) {
        var _this = this;
        return this.http.post(API_URL + "login/", { 'username': user, 'password': password }, {})
            .then(function (data) {
            var d = JSON.parse(data.data);
            console.log(d.token);
            _this.token = "JWT " + d.token;
            _this.setLocalData('token', _this.token);
        })
            .catch(function (error) {
        });
    };
    ScheduleService.prototype.registerUser = function (username, password) {
    };
    ScheduleService.prototype.registerAnon = function (imei) {
    };
    ScheduleService.prototype.reAuth = function () {
    };
    ScheduleService.prototype.getCronograma = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = true; }
        return new Promise(function (resolve, reject) {
            if (!forceRefresh) {
                _this.getLocalData('cronograma').then(function (data) {
                    _this.cronograma = data;
                    resolve(_this.cronograma);
                });
            }
            else {
                _this.http.get(API_URL + "cronograma/?format=json", {}, { 'Authorization': _this.token })
                    .then(function (res) {
                    _this.cronograma = res.data;
                    _this.setLocalData('cronograma', res.data);
                    resolve(_this.cronograma);
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        });
    };
    ScheduleService.prototype.getMesas = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        return new Promise(function (resolve, reject) {
            if (!forceRefresh) {
                _this.getLocalData('cronograma').then(function (data) {
                    _this.cronograma = data;
                    resolve(_this.cronograma);
                });
            }
            else {
                _this.http.get(API_URL + "cronograma/?format=json", {}, { 'Authorization': _this.token })
                    .then(function (res) {
                    _this.cronograma = res.data;
                    _this.setLocalData('cronograma', res.data);
                    resolve(_this.cronograma);
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        });
    };
    ScheduleService.prototype.getTrabalhos = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        return new Promise(function (resolve, reject) {
            if (!forceRefresh) {
                _this.getLocalData('cronograma').then(function (data) {
                    _this.cronograma = data;
                    resolve(_this.cronograma);
                });
            }
            else {
                _this.http.get(API_URL + "cronograma/?format=json", {}, { 'Authorization': _this.token })
                    .then(function (res) {
                    _this.cronograma = res.data;
                    _this.setLocalData('cronograma', res.data);
                    resolve(_this.cronograma);
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        });
    };
    ScheduleService.prototype.sendMessage = function (assunto, message) {
        var _this = this;
        var data = { 'assunto': assunto, 'mensagem': message };
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
            return false;
        }
        else {
            this.http.post(API_URL + "contato/", data, { 'Authorization': this.token })
                .then(function (data) {
                return true;
            })
                .catch(function (err) {
                _this.localService.storeRequest(API_URL + "contato/", data);
                return false;
            });
        }
    };
    ScheduleService.prototype.sendFavorito = function (trabalho) {
        var _this = this;
        var data = { 'user': this.user, 'trabalho': trabalho };
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
            this.localService.storeRequest(API_URL + "favorito/", data);
        }
        else {
            this.http.post(API_URL + "favorito/", data, { 'Authorization': this.token })
                .then(function (data) {
                return true;
            })
                .catch(function (err) {
                _this.localService.storeRequest(API_URL + "favorito/", data);
                return false;
            });
        }
    };
    ScheduleService.prototype.sendDownload = function (trabalho) {
        var _this = this;
        var data = { 'trabalho': trabalho };
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
            this.localService.storeRequest(API_URL + "download/", data);
        }
        else {
            this.http.post(API_URL + "download/", data, { 'Authorization': this.token })
                .then(function (data) {
                return true;
            })
                .catch(function (err) {
                _this.localService.storeRequest(API_URL + "download/", data);
                return false;
            });
        }
    };
    ScheduleService.prototype.setLocalData = function (key, data) {
        this.storage.set(key, data);
    };
    ScheduleService.prototype.getLocalData = function (key) {
        return this.storage.get(key);
    };
    ScheduleService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HTTP, NetworkService, LocaldataService, Storage])
    ], ScheduleService);
    return ScheduleService;
}());
export { ScheduleService };
//# sourceMappingURL=schedule.service.js.map