import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable, from } from 'rxjs';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { tap, map, catchError } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';

const API_STORAGE_KEY = 'specialkey';
const API_URL = 'https://sbpjor-server.herokuapp.com/api/'; // api url

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  atividades: any;
  trabalhos: any;
  favoritos: any;

  constructor(private http: HTTP, private networkService: NetworkService, private storage: Storage) { }

  getCronograma(forceRefresh: boolean = false){
    
  }
  //   if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
  //     this.getLocalData('cronograma').then(res => {
  //       this.atividades = res;
  //     });
  //     return from(this.getLocalData('cronograma'));
  //   } else {
  //     //var headers = new HttpHeaders();
      
      
  //     var to = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImNhcG1heWVyIiwiZXhwIjoxNTYwOTU2ODU5LCJlbWFpbCI6ImhlbnJpcW1heWVyQGdtYWlsLmNvbSJ9.QbNDriiP44M3F3fMivHqQmBnlvOqihbUu2R_LkhF_HI";
     
      
  //     return this.http.get(API_URL+'cronograma/?format=json', {}, {}).pipe(
  //       map(results => results[0].atividades),
  //       tap(results => {
          
  //         this.setLocalData('cronograma', results);
  //         this.atividades = results;
  //       })
  //     );
  //   }
  // }

  getAtividade(id: number){
    return this.atividades[id];
  }

  // getMesas(forceRefresh: boolean = false): Observable<any>{
  //   if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
  //     return from(this.getLocalData('mesas'));
  //   } else {
  //     return this.http.get(API_URL+'mesa/?format=json').pipe(
  //       map(results => results[0]),
  //       tap(results => {
  //         this.setLocalData('mesas', results);
  //       })
  //     );
  //   }
  // }

  getTrabalhos(forceRefresh: boolean = false){}
  //   if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
  //     console.log("entrou al");
  //     return from(this.getLocalData('trabalhos'));
  //   } else {
  //     return this.http.get(API_URL+'trabalho/?format=json').pipe(
  //       map(results => results),
  //       tap(results => {
  //         console.log(results);
  //         this.setLocalData('trabalhos', results);
  //       })
  //     );
  //   }
  // }

  markFavoritos(){

  }

  // se tiver pefil, add a token
  // getFavoritos(forceRefresh: boolean = false): Observable<any>{
  //   if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
  //     return from(this.getLocalData('favoritos'));
  //   } else {
  //     return this.http.get(API_URL+'favorito/?format=json').pipe(
  //       map(results => results),
  //       tap(results => {
  //         console.log(results);
  //         this.setLocalData('favoritos', results);
  //       })
  //     );
  //   }
  // }

  setFavoritos(data){
    this.setLocalData('favoritos', data);
  }


  // sendMessage(assunto, mensagem){
  //   // var headers = new Headers();
  //   // headers.append("Accept", 'application/json');
  //   // headers.append('Content-Type', 'application/json' );
  //   // const requestOptions = new RequestOptions({ headers: headers });
  //   var userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImNhcG1heWVyIiwiZXhwIjoxNTYwOTU4MzM3LCJlbWFpbCI6ImhlbnJpcW1heWVyQGdtYWlsLmNvbSJ9.M8YOAAGvHfBQ0SAAUX8RprRExJkFamH6O02yQLQZq_I";

  //   let postData = {
  //           "assunto": assunto,
  //           "mensagem": mensagem,
  //           "token": userToken
  //   }
  //   console.log(postData)

    

    
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json' );
  //   headers.append('Access-Control-Allow-Methods', 'POST' );
  //   headers.append('withCredentials', 'true');

  //   //const requestOptions = new HttpRequestOptions({ headers: headers });

  //   // this.http.post(API_URL+"/contato", postData).pipe(
  //   //   map(results => results),
  //   //   tap(results => {
  //   //     console.log(results);
  //   //   })
  //   // )
  //   this.http.post(API_URL+"contato/", {postData}, { headers: headers }
  //   ).subscribe(data => {
  //       console.log(data['_body']);
  //      }, error => {
  //       console.log(error);
  //     });
  //   console.log("chamou")
  // }

  getUserToken(){

    
    //headers.append("Accept", 'application/json');

    //const requestOptions = new HttpRequestOptions({ headers: headers });

    // this.http.post(API_URL+"/contato", postData).pipe(
    //   map(results => results),
    //   tap(results => {
    //     console.log(results);
    //   })
    // )

    this.http.post(API_URL+"login/", {'username':'capmayer', 'password':'sbFucks0cietY'}, { })
     .then(data => {
      console.log(data);
    })
    
    .catch(error => {
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
