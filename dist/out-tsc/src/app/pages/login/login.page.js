import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(router, service) {
        this.router = router;
        this.service = service;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        if (this.usuario != null && this.password != null) {
            this.service.authetication(this.usuario, this.password).then(function (d) {
                console.log("foii");
                _this.router.navigateByUrl('/home');
            }).catch(function (d) {
                console.log("fodeu");
            });
        }
        //fazer função aqui
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ScheduleService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map