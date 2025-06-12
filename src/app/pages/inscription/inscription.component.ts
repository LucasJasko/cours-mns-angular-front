import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  router = inject(Router);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });

  onInscription() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:5000/inscription', this.formulaire.value)
        .subscribe({
          next: (res) => {
            this.notification.show(
              'Vous etes inscrit, vous pouvez vous connecter !',
              'valid'
            );
            this.router.navigateByUrl('/connection');
          },
          error: (err) => {
            if (err.status === 409) {
              this.notification.show('Cet email est déjà utilisé', 'error');
            }
          },
        });
    }
  }
}
