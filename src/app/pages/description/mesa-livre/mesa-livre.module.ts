import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MesaLivrePage } from './mesa-livre.page';

const routes: Routes = [
  {
    path: '',
    component: MesaLivrePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MesaLivrePage]
})
export class MesaLivrePageModule {}
