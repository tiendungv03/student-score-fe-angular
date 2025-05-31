import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'https://localhost:7058/api/TaiKhoans';

  public getHttpOptions() {
    const token = this.authService.getToken();
    console.log('Token:', token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.getHttpOptions());
  }

  // getAccountById(id: string): Observable<Account> {
  //   return this.http.get<Account>(`${this.baseUrl}/${id}`);
  // }

  // createAccount(account: Account): Observable<Account> {
  //   return this.http.post<Account>(this.baseUrl, account);
  // }

  // updateAccount(id: string, account: Account): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`, account);
  // }

  // deleteAccount(id: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }
}
