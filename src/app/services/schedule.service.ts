import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { tap, map, catchError } from 'rxjs/operators';

const API_STORAGE_KEY = 'specialkey';
const API_URL = 'https://sbpjor-lex.herokuapp.com/'; // api url

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient, private networkService: NetworkService, private storage: Storage) { }

  getCronograma(forceRefresh: boolean = false): Observable<any>{
    if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
      return from(this.getLocalData('cronograma'));
    } else {
      return this.http.get(API_URL+'cronogramas/?format=json').pipe(
        map(results => results[0].atividades),
        tap(results => {
          results.sort((item1, item2) => {
            var h1 = item1.hora.split('T')[1].split(":")[0];
            var h2 = item2.hora.split('T')[1].split(":")[0];
            if (h1 > h2) {
                return 1;
            }
            if (h1 < h2) {
                return -1;
            }
            return 0;
          });
          this.setLocalData('cronograma', results);
        })
      );
    }
  }

  getAtividade(forceRefresh: boolean = false): Observable<any>{
    if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
      return from(this.getLocalData('atividades'));
    } else {
      return this.http.get(API_URL+'atividades/?format=json').pipe(
        map(results => results[0]),
        tap(results => {
          this.setLocalData('atividades', results);
        })
      );
    }
  }

  getMesas(forceRefresh: boolean = false): Observable<any>{
    if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
      return from(this.getLocalData('mesas'));
    } else {
      return this.http.get(API_URL+'mesas/?format=json').pipe(
        map(results => results[0]),
        tap(results => {
          this.setLocalData('mesas', results);
        })
      );
    }
  }

  getTrabalhos(forceRefresh: boolean = false): Observable<any>{
    if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
      return from(this.getLocalData('trabalhos'));
    } else {
      return this.http.get(API_URL+'trabalhos/?format=json').pipe(
        map(results => results[0]),
        tap(results => {
          this.setLocalData('trabalhos', results);
        })
      );
    }
  }

  private setLocalData(key, data) {
    this.storage.set('${API_STORAGE_KEY}-${key}', data);
  }

  private getLocalData(key) {
    return this.storage.get('${API_STORAGE_KEY}-${key}');
  }

}
