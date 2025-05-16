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

@Component({
  selector: 'app-edit-produit',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  formulaire = this.formBuilder.group({
    nom: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(50)]],
  });

  onAddProduct() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:5000/product', this.formulaire.value)
        .subscribe((res) => console.log(res));
    }
  }
}
