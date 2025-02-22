import { Routes } from '@angular/router';


import { FavouritesComponent } from './components/favourites/favourites.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { InfoComponent } from './components/info/info.component';
import { CloudComponent } from './components/cloud/cloud.component';

export const routes: Routes = [
  { path: '', component: WordListComponent }, // Default route
  { path: 'favourites', component: FavouritesComponent },
  { path: 'info', component: InfoComponent },
  { path: 'cloud', component: CloudComponent },
  { path: '**', component: WordListComponent } // Catch-all (404) route
];
