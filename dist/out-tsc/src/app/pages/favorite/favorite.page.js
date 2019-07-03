import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
var FavoritePage = /** @class */ (function () {
    function FavoritePage(scheduleService) {
        this.scheduleService = scheduleService;
    }
    FavoritePage.prototype.ngOnInit = function () {
        this.getTrabalhos(true);
    };
    FavoritePage.prototype.getTrabalhos = function (refresh, refresher) {
        // this.scheduleService.getTrabalhos(refresh).subscribe(res => {
        //   this.trabalhos = res;
        //   this.trabalhos = this.trabalhos.filter((item) => {
        //      return item.favorito == true;
        //   });
        //   console.log(res);
        //   if (refresher) {
        //     refresher.target.complete();
        //   }
        // });
    };
    FavoritePage.prototype.favItem = function (item) {
        var index = this.trabalhos.indexOf(item, 0);
        if (index > -1) {
            this.trabalhos.splice(index, 1);
        }
        //this.storage.set('favoritos', this.trabalhos);
    };
    FavoritePage.prototype.favoritos = function () {
        return;
    };
    FavoritePage = tslib_1.__decorate([
        Component({
            selector: 'app-favorite',
            templateUrl: './favorite.page.html',
            styleUrls: ['./favorite.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ScheduleService])
    ], FavoritePage);
    return FavoritePage;
}());
export { FavoritePage };
//# sourceMappingURL=favorite.page.js.map