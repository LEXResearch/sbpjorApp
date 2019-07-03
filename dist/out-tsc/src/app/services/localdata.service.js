import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { from, of, forkJoin } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { switchMap, finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
var STORAGE_REQ_KEY = 'storedreq';
var LocaldataService = /** @class */ (function () {
    function LocaldataService(storage, http) {
        this.storage = storage;
        this.http = http;
    }
    LocaldataService.prototype.checkForEvents = function () {
        var _this = this;
        return from(this.storage.get(STORAGE_REQ_KEY)).pipe(switchMap(function (storedOperations) {
            var storedObj = JSON.parse(storedOperations);
            if (storedObj && storedObj.length > 0) {
                return _this.sendRequests(storedObj).pipe(finalize(function () {
                    _this.storage.remove(STORAGE_REQ_KEY);
                }));
            }
            else {
                console.log('no local events to sync');
                return of(false);
            }
        }));
    };
    LocaldataService.prototype.storeRequest = function (url, data) {
        var _this = this;
        var action = {
            url: url,
            data: data,
            time: new Date().getTime(),
            id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        };
        // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        return this.storage.get(STORAGE_REQ_KEY).then(function (storedOperations) {
            var storedObj = JSON.parse(storedOperations);
            if (storedObj) {
                storedObj.push(action);
            }
            else {
                storedObj = [action];
            }
            // Save old & new local transactions back to Storage
            return _this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
        });
    };
    LocaldataService.prototype.sendRequests = function (operations) {
        var obs = [];
        var _loop_1 = function (op) {
            console.log('Make one request: ', op);
            this_1.http.post(op.url, op.data, { 'Authorization': this_1.tolken })
                .then(function (res) {
                var oneObs = op;
                obs.push(oneObs);
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        var this_1 = this;
        for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
            var op = operations_1[_i];
            _loop_1(op);
        }
        // Send out all local events and return once they are finished
        return forkJoin(obs);
    };
    LocaldataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, HTTP])
    ], LocaldataService);
    return LocaldataService;
}());
export { LocaldataService };
//# sourceMappingURL=localdata.service.js.map