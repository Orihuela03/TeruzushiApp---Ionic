import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // --- RESTAURANT SERVICES ---
  getRestaurants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/restaurants`);
  }

  addRestaurant(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/restaurants`, data);
  }

  updateRestaurant(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/restaurants/${id}`, data);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/restaurants/${id}`);
  }

  // --- TABLE SERVICES ---
  getTables(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tables`);
  }

  addTable(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tables`, data);
  }

  updateTable(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tables/${id}`, data);
  }

  deleteTable(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tables/${id}`);
  }

  // --- BOOKING SERVICES ---
  getBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings`);
  }

  addBooking(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings`, data);
  }

  updateBooking(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/bookings/${id}`, data);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bookings/${id}`);
  }
}