import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'any'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTopCard(){
    return this.http.get('http://localhost:3000/top_card_metrics');
  }

  getSignUpReviews(){
    return this.http.get('http://localhost:3000/signup_reviews');
  }

  getTotalVisualizations(){
    return this.http.get('http://localhost:3000/total_visualizations');
  }

  getSchools(){
    return this.http.get('http://localhost:3000/schools');
  }

  updateInvoice(id:any,data:any){
    fetch('http://localhost:3000/schools/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  insertInvoice(id:any,data:any){
    fetch('http://localhost:3000/schools/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
  }

  deleteInvoice(id:any,data:any){
    fetch('http://localhost:3000/schools/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
  }
}
