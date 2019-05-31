import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  atividades: any;
  trabalhos: any;
  favoritos: any;

  constructor(private http: HttpClient, private networkService: NetworkService, private storage: Storage) { }

  getCronograma(forceRefresh: boolean = false): Observable<any>{
    if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
      this.getLocalData('cronograma').then(res => {
        this.atividades = res;
      });
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
          this.atividades = results;
        })
      );
    }
  }

  getAtividade(id: number){
    return this.atividades[id];
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
      console.log("entrou al");
      return from(this.getLocalData('trabalhos'));
    } else {
      return this.http.get(API_URL+'trabalhos/?format=json').pipe(
        map(results => results),
        tap(results => {
          console.log(results);
          this.setLocalData('trabalhos', results);
        })
      );
    }
  }

  markFavoritos(){

  }

  // se tiver pefil, add a token
  getFavoritos(forceRefresh: boolean = false): Observable<any>{
    if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
      return from(this.getLocalData('favoritos'));
    } else {
      return this.http.get(API_URL+'favoritos/?format=json').pipe(
        map(results => results),
        tap(results => {
          console.log(results);
          this.setLocalData('favoritos', results);
        })
      );
    }
  }

  setFavoritos(data){
    this.setLocalData('favoritos', data);
  }


  sendMessage(nome, email, tel, mensagem){
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
    // const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
            "nome": nome,
            "email": email,
            "tel": tel,
            "mensagem": mensagem
    }
    console.log(postData)

    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    //const requestOptions = new HttpRequestOptions({ headers: headers });

    // this.http.post(API_URL+"/contato", postData).pipe(
    //   map(results => results),
    //   tap(results => {
    //     console.log(results);
    //   })
    // )

    this.http.post(API_URL+"contato", postData, { headers: headers }
    ).subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
    console.log("chamou")
  }

  private setLocalData(key, data) {
    this.storage.set(key, data);
  }

  private getLocalData(key) {
    return this.storage.get(key);
  }

}
