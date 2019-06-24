import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DescriptionPage } from './description.page';
var routes = [
    {
        path: '',
        component: DescriptionPage,
    }
];
var DescriptionPageModule = /** @class */ (function () {
    function DescriptionPageModule() {
    }
    DescriptionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DescriptionPage],
            exports: [DescriptionPage]
        })
    ], DescriptionPageModule);
    return DescriptionPageModule;
}());
export { DescriptionPageModule };
//# sourceMappingURL=description.module.js.map