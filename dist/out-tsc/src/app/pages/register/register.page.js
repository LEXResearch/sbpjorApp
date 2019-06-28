import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(router) {
        this.router = router;
    }
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.goLoginPage = function () {
        this.router.navigateByUrl('/login');
    };
    RegisterPage.prototype.goAnonimateType = function () {
        this.router.navigateByUrl('/home');
        //fazer função aqui
    };
    RegisterPage.prototype.doRegistro = function () {
        this.router.navigateByUrl('/login');
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map