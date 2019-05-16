import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {

  id: any;

  atividade: any;

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.scheduleService.getCronograma(false).subscribe(res => {
      this.atividade = this.showActiviety(this.id);
      console.log(this.atividade);
    });


  }

  showActiviety(id) {
    return this.scheduleService.getAtividade(id);
  }

  hora(data){
    return data.split('T')[1].split(":")[0];
  }

  min(data){
    return data.split("T")[1].split(":")[1];
  }

}
