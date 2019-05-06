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

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("idActiviety");

    console.log(this.showActiviety(this.id));
  }

  showActiviety(id) {
    return this.scheduleService.getAtividade(id);
  }

}
