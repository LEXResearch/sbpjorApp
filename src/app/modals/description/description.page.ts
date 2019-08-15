import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {

  @Input() atividade: any;
  @Input() mesas: any;

  mesasMode: string;

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.mesasMode = 'livres';
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  hora(data){
    return data.split('T')[1].split(":")[0];
  }

  min(data){
    return data.split("T")[1].split(":")[1];
  }

  mesasFilter(b){
    return this.mesas.filter((mesa) => {
      return mesa.coordenada == b;
    });
  }

  goSearch(mesa){
    let navExtra: NavigationExtras = {
      state: {
        mode: 0, // 
        mesa: mesa,
      }
    }
    
    this.router.navigate(['search'], navExtra);
    this.closeModal();
  }

}
