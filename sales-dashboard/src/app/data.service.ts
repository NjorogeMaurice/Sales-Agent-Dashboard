import { Injectable } from '@angular/core';
import { HttpClient,provideHttpClient, withFetch } from '@angular/common/http';


@Injectable({
  providedIn: 'any',
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTopCard(){
    return this.http.get('https://66483d492bb946cf2f9ff300.mockapi.io/api/data/1');
  }

  getSignUpReviews(){
    return this.http.get('https://66483d492bb946cf2f9ff300.mockapi.io/api/data/2');
  }

  getTotalVisualizations(){
    return this.http.get('https://66483d492bb946cf2f9ff300.mockapi.io/api/data/3');
  }

  getSchools(){
    return this.http.get('https://66483d492bb946cf2f9ff300.mockapi.io/api/data/4');
  }

  async updateInvoice(data:any){
    fetch('https://66483d492bb946cf2f9ff300.mockapi.io/api/data/4', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  insertInvoice(id:any,data:any){

    fetch('https://66483d492bb946cf2f9ff300.mockapi.io/api/data/4', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  deleteInvoice(id:any,data:any){
    fetch('https://66483d492bb946cf2f9ff300.mockapi.io/api/data/4', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
  }
}
