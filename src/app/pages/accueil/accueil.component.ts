import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-accueil',
  imports: [MatCardModule, MatButtonModule, DatePipe, RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  http = inject(HttpClient);
  produits: any = [];
  notification = inject(NotificationService);
  authService = inject(AuthService);

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.http
      .get('http://localhost:5000/product/list')
      .subscribe((users) => (this.produits = users));
  }

  onDelete(item: any) {
    if (confirm('Voulez vous vraiment supprimer ce produit ?'))
      this.http
        .delete('http://localhost:5000/product/' + item.id)
        .subscribe((res) => {
          this.refresh();
          this.notification.show('Le produit a bien été supprimé', 'valid');
        });
  }
}
