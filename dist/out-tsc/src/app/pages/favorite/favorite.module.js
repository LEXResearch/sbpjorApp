import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FavoritePage } from './favorite.page';
var routes = [
    {
        path: '',
        component: FavoritePage
    }
];
var FavoritePageModule = /** @class */ (function () {
    function FavoritePageModule() {
    }
    FavoritePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FavoritePage]
        })
    ], FavoritePageModule);
    return FavoritePageModule;
}());
export { FavoritePageModule };
//# sourceMappingURL=favorite.module.js.map