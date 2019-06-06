import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { tap, map } from 'rxjs/operators';
var API_STORAGE_KEY = 'specialkey';
var API_URL = 'https://sbpjor-lex.herokuapp.com/'; // api url
var ScheduleService = /** @class */ (function () {
    function ScheduleService(http, networkService, storage) {
        this.http = http;
        this.networkService = networkService;
        this.storage = storage;
    }
    ScheduleService.prototype.getCronograma = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
            this.getLocalData('cronograma').then(function (res) {
                _this.atividades = res;
            });
            return from(this.getLocalData('cronograma'));
        }
        else {
            return this.http.get(API_URL + 'cronogramas/?format=json').pipe(map(function (results) { return results[0].atividades; }), tap(function (results) {
                results.sort(function (item1, item2) {
                    var h1 = item1.hora.split('T')[1].split(":")[0];
                    var h2 = item2.hora.split('T')[1].split(":")[0];
                    if (h1 > h2) {
                        return 1;
                    }
                    if (h1 < h2) {
                        return -1;
                    }
                    return 0;
                });
                _this.setLocalData('cronograma', results);
                _this.atividades = results;
            }));
        }
    };
    ScheduleService.prototype.getAtividade = function (id) {
        return this.atividades[id];
    };
    ScheduleService.prototype.getMesas = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
            return from(this.getLocalData('mesas'));
        }
        else {
            return this.http.get(API_URL + 'mesas/?format=json').pipe(map(function (results) { return results[0]; }), tap(function (results) {
                _this.setLocalData('mesas', results);
            }));
        }
    };
    ScheduleService.prototype.getTrabalhos = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
            console.log("entrou al");
            return from(this.getLocalData('trabalhos'));
        }
        else {
            return this.http.get(API_URL + 'trabalhos/?format=json').pipe(map(function (results) { return results; }), tap(function (results) {
                console.log(results);
                _this.setLocalData('trabalhos', results);
            }));
        }
    };
    ScheduleService.prototype.markFavoritos = function () {
    };
    // se tiver pefil, add a token
    ScheduleService.prototype.getFavoritos = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
            return from(this.getLocalData('favoritos'));
        }
        else {
            return this.http.get(API_URL + 'favoritos/?format=json').pipe(map(function (results) { return results; }), tap(function (results) {
                console.log(results);
                _this.setLocalData('favoritos', results);
            }));
        }
    };
    ScheduleService.prototype.setFavoritos = function (data) {
        this.setLocalData('favoritos', data);
    };
    ScheduleService.prototype.sendMessage = function (nome, email, tel, mensagem) {
        // var headers = new Headers();
        // headers.append("Accept", 'application/json');
        // headers.append('Content-Type', 'application/json' );
        // const requestOptions = new RequestOptions({ headers: headers });
        var postData = {
            "nome": nome,
            "email": email,
            "tel": tel,
            "mensagem": mensagem
        };
        console.log(postData);
        var headers = new HttpHeaders();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        //const requestOptions = new HttpRequestOptions({ headers: headers });
        // this.http.post(API_URL+"/contato", postData).pipe(
        //   map(results => results),
        //   tap(results => {
        //     console.log(results);
        //   })
        // )
        this.http.post(API_URL + "contato", postData, { headers: headers }).subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
        console.log("chamou");
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
        tslib_1.__metadata("design:paramtypes", [HttpClient, NetworkService, Storage])
    ], ScheduleService);
    return ScheduleService;
}());
export { ScheduleService };
//# sourceMappingURL=schedule.service.js.map