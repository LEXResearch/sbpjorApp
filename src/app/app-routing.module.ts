import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'description', loadChildren: './pages/description/description.module#DescriptionPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'favorite', loadChildren: './pages/favorite/favorite.module#FavoritePageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'mesa-coordenada', loadChildren: './pages/description/mesa-coordenada/mesa-coordenada.module#MesaCoordenadaPageModule' },
  { path: 'mesa-livre', loadChildren: './pages/description/mesa-livre/mesa-livre.module#MesaLivrePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
