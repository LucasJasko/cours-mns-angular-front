import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor() {
    // Quand on arrive sur l'appli et que l'utilisateur est connecté, on extrait les données du jwt
    const jwt = localStorage.getItem('token');

    if (jwt != null) {
      this.decodeJwt(jwt);
    }
  }

  decodeJwt(jwt: string) {
    localStorage.setItem('token', jwt);

    const jwtParts = jwt.split('.');
    const jwtBodyBase64 = jwtParts[1];
    const jwtBodyDecoded = atob(jwtBodyBase64); // Decode la base 64
    this.user = JSON.parse(jwtBodyDecoded);

    console.log(this.user);
  }

  deconnexion() {
    localStorage.removeItem('token');
    this.user = null;
  }
}
