import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  nome: string;
  email: string;
  telefone: number;
  mensagem: string;

  constructor(private scheduleService: ScheduleService,
    public toastController: ToastController
  ) { }

  ngOnInit() {


  }
  sendMessage(){
    if(this.nome != null && this.email != null && this.mensagem != null && this.telefone != null){
      console.log(this.nome);
      //this.ScheduleService.sendMessage(this.name, this.emai, this.telefone, this.email);
      this.presentToast("Mensagem enviada!");
    } else {
      this.presentToast("Ops! Informe todos os dados.");
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'botton',
    });
    toast.present();
  }

}
