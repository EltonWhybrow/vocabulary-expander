import { Routes } from '@angular/router';


import { FavouritesComponent } from './components/favourites/favourites.component';
import { WordListComponent } from './components/word-list/word-list.component';

export const routes: Routes = [
  { path: '', component: WordListComponent }, // Default route
  { path: 'favourites', component: FavouritesComponent }, // About page
  { path: '**', component: WordListComponent } // Catch-all (404) route
];
