import { Component, signal } from '@angular/core';
import { DictionaryService } from './word-list.component.spec';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-word-list',
  standalone: true,  // ✅ Mark it as standalone
  imports: [CommonModule, FormsModule, MatIconModule],  // ✅ Add the necessary imports
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent {


  constructor(private dictionaryService: DictionaryService) { }

  words = signal<string[]>(this.loadWords()); // Load words from LocalStorage
  newWord = signal('');
  currentDefinitions = signal<any>(null);
  wordError: boolean = false;
  errorMessage: string = '';

  favouriteWords = signal<string[]>(this.loadFavWords());


  private saveWords() {
    localStorage.setItem('wordList', JSON.stringify(this.words()));
  }

  private saveFavWords() {
    localStorage.setItem('favWordList', JSON.stringify(this.favouriteWords()));
  }

  private loadWords(): string[] {
    return JSON.parse(localStorage.getItem('wordList') || '[]');
  }


  private loadFavWords(): string[] {
    return JSON.parse(localStorage.getItem('favWordList') || '[]');
  }

  clearInput() {
    this.newWord.set('');
    this.resetError();
  }

  resetError() {
    this.wordError = false;
    this.errorMessage = '';
  }

  addWord() {
    this.resetError();

    if (this.newWord().trim() === '') {
      this.wordError = true;
      this.errorMessage = "You must enter a word!!!!!";
      return
    }
    if (this.words().includes(this.newWord().trim())) {
      this.wordError = true;
      this.errorMessage = `"${this.newWord().trim()}" is already in your words!!!!!`;
      return
    }

    this.dictionaryService.getWordDefinition(this.newWord().trim()).subscribe(
      (data) => {
        this.words.update(words => [...words, this.newWord().trim()]);
        this.newWord.set('');
        this.saveWords(); // Save updated list to LocalStorage
        // this.wordList.push(data[0]); // Store only the first result
        // this.saveToLocalStorage();

        console.log('Word added!', data);
      },
      (error) => {
        console.error('Word not found!', error);
        this.wordError = true;

        this.errorMessage = error.error.message;
        // alert('cant find word - TODO!')
      }
    );

  }

  removeWord(index: number) {
    this.words.update(words => words.filter((_, i) => i !== index));
    this.saveWords(); // Save updated list
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

  addToFavourite(word: string) {
    console.log('word favourited >>>>>', word);

    const trimmedWord = word.trim();

    // Check if the word already exists
    this.favouriteWords.update(favouriteWords => {

      if (favouriteWords.includes(trimmedWord)) {
        alert(`"${trimmedWord}" is already in your favourites!`);
        return favouriteWords; // No change
      }
      return [...favouriteWords, trimmedWord];
    }
    );
    this.saveFavWords();
    console.log(this.favouriteWords());
  }
}
