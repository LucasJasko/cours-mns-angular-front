import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  http = inject(HttpClient);
  userList: any = [];

  ngOnInit() {
    this.http
      .get('http://localhost:5000/product/list')
      .subscribe((users) => (this.userList = users));
  }
}
