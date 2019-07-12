import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { ScheduleService } from '../services/schedule.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public scheduleService: ScheduleService
  ) { }

  
  canActivate(): boolean {
    var state = this.scheduleService.getStateVar()
    if (state == 'anon' || state == 'logedin'){
      return true;
    } else {
      return false;
    }
  }
}
