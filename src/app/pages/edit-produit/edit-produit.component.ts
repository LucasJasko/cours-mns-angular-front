import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-produit',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(50)]],
  });

  produitEditer: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.http
          .get('http://localhost:5000/product/' + parameters['id'])
          .subscribe((produit) => {
            this.formulaire.patchValue(produit);
            this.produitEditer = produit;
          });
      }
    });
  }

  onAddProduct() {
    if (this.formulaire.valid) {
      if (this.produitEditer) {
        this.http
          .put(
            'http://localhost:5000/product/' + this.produitEditer.id,
            this.formulaire.value
          )
          .subscribe({
            next: (res) => {
              this.notification.show(
                'Le produit a bien été modifié ! ',
                'valid'
              );
              this.router.navigateByUrl('/accueil');
            },
            error: (err) => {
              if (err.status === 409) {
                this.notification.show('Un produit porte déjà ce nom', 'error');
              }
            },
          });
      } else {
        this.http
          .post('http://localhost:5000/product', this.formulaire.value)
          .subscribe({
            next: (res) => {
              this.notification.show(
                'Le produit a bien été ajouté ! ',
                'valid'
              );
              this.router.navigateByUrl('/accueil');
            },
            error: (err) => {
              if (err.status === 409) {
                this.notification.show('Un produit porte déjà ce nom', 'error');
              }
            },
          });
      }
    }
  }
}
