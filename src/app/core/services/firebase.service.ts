// firebase.service.ts
import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  public getHttpOptions() {
    const token = this.authService.getToken();
    // console.log('Token:', token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  firebaseLogin(idToken: string) {
    return this.http.post<any>(
      `https://localhost:7058/api/Authentication/firebase-login`,
      { idToken: idToken }
      // this.getHttpOptions()
    );
  }
}
