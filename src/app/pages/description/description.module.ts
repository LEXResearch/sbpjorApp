import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DescriptionPage } from './description.page';
import { MesaCoordenadaPage } from './mesa-coordenada/mesa-coordenada.page';
import { MesaLivrePage } from './mesa-livre/mesa-livre.page';

const routes: Routes = [
  {
    path: ':id',
    component: DescriptionPage,
    children: [
      {
        path: '',
        children: [
          {
            path: 'mesa-livre',
            component: MesaLivrePage
          },
          {
            path: 'mesa-coordenada',
            component: MesaCoordenadaPage
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/description/1/mesa-livre',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DescriptionPage, MesaCoordenadaPage, MesaLivrePage]
})
export class DescriptionPageModule {}
