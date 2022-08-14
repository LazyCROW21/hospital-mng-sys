import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../common/api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.baseHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  createUser(data: any) {
    return this.http.post(baseURL+'/api/user', data, { headers: this.baseHeader });
  }
}
