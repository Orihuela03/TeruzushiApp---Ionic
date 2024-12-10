import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "http://localhost:8080/teruzushiapi";

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any> {
    return this.http.get(this.baseUrl + '/restaurant');
  }

  getTables(): Observable<any> {
    return this.http.get(this.baseUrl + '/tables');
  }

  getBookings(): Observable<any> {
    return this.http.get(this.baseUrl + '/booking');
  }

  addRestaurant(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/restaurant', data);
  }
  
  addTable(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/tables', data);
  }

  addBooking(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/booking', data);
  }

  updateRestaurant(id: number, data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/restaurant/' + id, data);
  }

  updateTable(id: number, data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/tables/' + id, data);
  }

  updateBooking(id: number, data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/booking/' + id, data);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/restaurant/" + id);
  }

  deleteTable(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/tables/" + id);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/booking/" + id);
  }
}
