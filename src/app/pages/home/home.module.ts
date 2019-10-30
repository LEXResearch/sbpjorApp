import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { DescriptionPage } from '../description/description.page';
import { DescriptionPageModule } from '../description/description.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DescriptionPageModule
  ],
  declarations: [HomePage],
  entryComponents: [DescriptionPage]
})
export class HomePageModule {}
