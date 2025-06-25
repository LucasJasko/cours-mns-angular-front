import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditProduitComponent } from './pages/edit-produit/edit-produit.component';
import { vendeurGuard } from './services/vendeur.guard';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'ajout-produit',
    component: EditProduitComponent,
    canActivate: [vendeurGuard],
  },
  {
    path: 'modifier-produit/:id',
    component: EditProduitComponent,
    canActivate: [vendeurGuard],
  },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
