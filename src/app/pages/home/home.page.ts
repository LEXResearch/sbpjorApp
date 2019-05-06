import { Platform, MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cronograma: Array<any> = [];

  slideOpts = {
    speed: 1000,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 100
  };

  constructor(private scheduleService: ScheduleService, private plt: Platform, private menu: MenuController, private router: Router) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });
  }

  loadData(refresh = false, refresher?) {
    this.scheduleService.getCronograma(refresh).subscribe(res => {
      this.cronograma = res;
      console.log(this.cronograma);
      if (refresher) {
        refresher.target.complete();
      }
    });
  }

  cronogramaByDay(day){
    return this.cronograma.filter((item) => {
      if (item.data != null)
       return item.data.split('-')[2] == day;
    });
  }

  hora(item){
    return item.hora.split('T')[1].split(":")[0];
  }

  cor(atividade){
    return {'background': 'linear-gradient(90deg, '+ atividade.cor_hex +' 15px, #FFFFFF 15px)'};
  }

  expandItem(item){
        this.cronograma.map((listItem) => {
            if(item == listItem){
                listItem.open = !listItem.open;
            } else {
                listItem.open = false;
            }
            return listItem;
        });
  }

  goToDescription(event, atividade){
    this.router.navigate(['description', { id: atividade.id, data: atividade}]);
  }

}
