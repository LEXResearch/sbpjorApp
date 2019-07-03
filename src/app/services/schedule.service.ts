import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable, from } from 'rxjs';
import { NetworkService, ConnectionStatus } from './network.service';
import { LocaldataService } from './localdata.service';
import { Storage } from '@ionic/storage';
import { tap, map, catchError } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';

const API_STORAGE_KEY = 'specialkey';
const API_URL = 'https://sbpjor-server.herokuapp.com/api/'; // api url

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  cronograma: any;
  trabalhos: any;
  mesas: any;

  user: any;
  token: string = '';


  constructor(private http: HTTP, private networkService: NetworkService, private localService: LocaldataService, private storage: Storage) { }

  // make user authetication, recieve a token that is used for futher requests
  authetication(user: string, password: any){
    return this.http.post(API_URL+"login/", {'username': user, 'password': password}, {})
     .then(data => {
      let d = JSON.parse(data.data);
      console.log(d.token);
      this.token = "JWT " + d.token;
      this.setLocalData('token', this.token);
    })

    .catch(error => {
        
    });
  }

  registerUser(username: string, password: string){

  }

  registerAnon(imei: number){

  }

  reAuth(){

  }

  getMethod(what: string, forceRefresh: boolean = false){
    return new Promise((resolve, reject) => {
      if(!forceRefresh){
        this.getLocalData(what).then(data => {
          resolve(this.cronograma);
        });
      }
      else {
        this.http.get(API_URL+what+"/?format=json", {}, {'Authorization': this.token })
         .then(res => {
           this.setLocalData(what, res.data);
           resolve(this.cronograma);
        })
        .catch(error => {
            console.log(error);
        });
      }
    })
  }

  getCronograma(forceRefresh: boolean = true){
    if(this.token != null){
      return new Promise((resolve, rjc) => {
        this.getMethod('cronograma', forceRefresh).then(data => {
          this.cronograma = data;
          resolve(this.cronograma);
        })
      })
    } else {
      this.getLocalData('token').then(data => {
        this.token = data;
        return new Promise((resolve, rjc) => {
          this.getMethod('crograma', forceRefresh).then(data=>{
            this.cronograma = data;
            resolve(data);
          })
        })
      })
    }
  }

  getMesas(forceRefresh: boolean = false){
    if(this.token != null){
      return new Promise((resolve, rjc) => {
        this.getMethod('mesa', forceRefresh).then(data => {
          this.mesas = data;
          resolve(this.mesas);
        })
      })
    } else {
      this.getLocalData('token').then(data => {
        this.token = data;
        return new Promise((resolve, rjc) => {
          this.getMethod('mesa', forceRefresh).then(data=>{
            this.mesas = data;
            resolve(data);
          })
        })
      })
    }
  }

  getTrabalhos(forceRefresh: boolean = false){
    if(this.token != null){
      return new Promise((resolve, rjc) => {
        this.getMethod('trabalho', forceRefresh).then(data => {
          this.trabalhos = data;
          resolve(this.mesas);
        })
      })
    } else {
      this.getLocalData('token').then(data => {
        this.token = data;
        return new Promise((resolve, rjc) => {
          this.getMethod('trabalho', forceRefresh).then(data=>{
            this.trabalhos = data;
            resolve(data);
          })
        })
      })
    }
  }

  sendMessage(assunto: string, message: string){
    let data = { 'assunto': assunto, 'mensagem': message };
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return false;
    }
    else {
      this.http.post(API_URL+"contato/", data, {'Authorization': this.token })
      .then(data => {
        return true;
      })
      .catch(err => {
        this.localService.storeRequest(API_URL+"contato/", data);
        return false;
      });
    }
  }

  sendFavorito(trabalho: number){
    let data = { 'user': this.user, 'trabalho': trabalho };
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      this.localService.storeRequest(API_URL+"favorito/", data);
    }
    else {
      this.http.post(API_URL+"favorito/", data, {'Authorization': this.token })
      .then(data => {
        return true;
      })
      .catch(err => {
        this.localService.storeRequest(API_URL+"favorito/", data);
        return false;
      });
    }
  }

  sendDownload(trabalho: number){
    let data = {'trabalho': trabalho }
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      this.localService.storeRequest(API_URL+"download/", data);
    }
    else {
      this.http.post(API_URL+"download/", data, {'Authorization': this.token })
      .then(data => {
        return true;
      })
      .catch(err => {
        this.localService.storeRequest(API_URL+"download/", data);
        return false;
      });
    }
  }

  private setLocalData(key, data) {
    this.storage.set(key, data);
  }

  private getLocalData(key) {
    return this.storage.get(key);
  }

}
