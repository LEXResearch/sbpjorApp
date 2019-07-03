import { Injectable } from '@angular/core';
import { Observable, from, of, forkJoin } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { switchMap, finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


interface StoredRequest {
  url: string,
  data: any,
  time: number,
  id: string
}

const STORAGE_REQ_KEY = 'storedreq';

@Injectable({
  providedIn: 'root'
})
export class LocaldataService {

  constructor(private storage: Storage, private http: HTTP) { }

  tolken: any;

  checkForEvents(): Observable<any> {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        let storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
              this.storage.remove(STORAGE_REQ_KEY);
            })
          );
        } else {
          console.log('no local events to sync');
          return of(false);
        }
      })
    )
  }

  storeRequest(url, data) {
    let action: StoredRequest = {
      url: url,
      data: data,
      time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);

      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]) {
    let obs = [];

    for (let op of operations) {
      console.log('Make one request: ', op);
      this.http.post(op.url, op.data, { 'Authorization': this.tolken })
      .then(res => {
          let oneObs = op;
          obs.push(oneObs);
      })
      .catch(error => {
          console.log(error);
      });
    }

    // Send out all local events and return once they are finished
    return forkJoin(obs);
  }

}
