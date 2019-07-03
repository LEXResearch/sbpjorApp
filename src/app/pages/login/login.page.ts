import { Component, OnInit } from '@angular/core';
import { getCheckNoChangesMode } from '@angular/core/src/render3/state';
import { Router } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( 
    private router: Router,
    private service: ScheduleService
    ) { }
    usuario: any;
    password: any;

  ngOnInit() {
    
  }
  doLogin(){
    
    if(this.usuario != null && this.password != null){
      this.service.authetication(this.usuario, this.password).then(d => {
        console.log("foii");
        this.router.navigateByUrl('/home');
      }).catch( d => {
        console.log("fodeu");
      });
    }

    
    //fazer função aqui
  }

  



}
