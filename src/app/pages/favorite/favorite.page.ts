import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  trabalhos: any;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.getTrabalhos(true);
  }

  getTrabalhos(refresh, refresher?) {
    this.scheduleService.getTrabalhos(refresh).subscribe(res => {
      this.trabalhos = res;
      this.trabalhos = this.trabalhos.filter((item) => {
         return item.favorito == true;
      });
      console.log(res);
      if (refresher) {
        refresher.target.complete();
      }
    });
  }

  favItem(item){
    const index = this.trabalhos.indexOf(item, 0);
    if (index > -1) {
       this.trabalhos.splice(index, 1);
    }
    //this.storage.set('favoritos', this.trabalhos);
  }

  favoritos() {
    return
  }


}
