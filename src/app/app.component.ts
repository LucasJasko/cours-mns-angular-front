import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'projet-fil-rouge-ng-front';
  authService = inject(AuthService);
  notif = inject(NotificationService);

  onLogOut() {
    this.authService.deconnexion();
    this.notif.show('Vous êtes bien déconnecté', 'valid');
  }
}
