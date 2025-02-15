import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryService } from '../word-list/word-list.component.spec';

@Component({
  selector: 'app-favourites',
  standalone: true,  // ✅ Mark it as standalone
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {


  favouriteWords = signal<string[]>(this.loadFavWords());
  currentDefinitions = signal<any>(null);


  constructor(private dictionaryService: DictionaryService) {

  }
  private loadFavWords(): string[] {
    return JSON.parse(localStorage.getItem('favWordList') || '[]');
  }

  private saveFavWords() {
    localStorage.setItem('favWordList', JSON.stringify(this.favouriteWords()));
  }

  removeFavWord(index: number) {
    this.favouriteWords.update(favouriteWords => favouriteWords.filter((_, i) => i !== index));
    this.saveFavWords(); // Save updated list
  }

  retrieveWordInfo(word: string) {
    console.log('word >>>>>', word)
    this.dictionaryService.getWordDefinition(word.trim()).subscribe(
      (data) => {
        // this.wordList.push(data[0]); // Store only the first result
        // this.saveToLocalStorage();
        this.currentDefinitions.set(data);
        console.log('Word added!', data);
      },
      (error) => {
        console.error('Word not found!', error);
        alert('cant find word - TODO!')
      }
    );
  }



}
