import { Component, OnInit } from '@angular/core';
import { getCheckNoChangesMode } from '@angular/core/src/render3/state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
    
  }
  doLogin(){
    this.router.navigateByUrl('/home');
    //fazer função aqui
  }
  
}
