import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    //  { path: 'description', loadChildren: './pages/description/description.module#DescriptionPageModule' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
    { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
    { path: 'favorite', loadChildren: './pages/favorite/favorite.module#FavoritePageModule' },
    { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
    { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map