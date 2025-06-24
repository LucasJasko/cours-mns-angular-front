import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connection',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss',
})
export class ConnectionComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  router = inject(Router);
  http = inject(HttpClient);
  authService = inject(AuthService);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });

  onConnection() {
    this.http
      .post('http://localhost:5000/connexion', this.formulaire.value, {
        responseType: 'text',
      })
      .subscribe((jwt) => {
        this.authService.decodeJwt(jwt);
        this.notification.show('Vous êtes connecté', 'valid');
        this.router.navigateByUrl('/accueil');
      });
  }
}
