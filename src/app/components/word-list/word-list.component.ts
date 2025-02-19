import { Component, signal } from '@angular/core';
import { DictionaryService } from './word-list.component.spec';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DefinitionModalComponent } from '../definition-modal/definition-modal.component';



@Component({
  selector: 'app-word-list',
  standalone: true,  // ✅ Mark it as standalone
  imports: [CommonModule, FormsModule, MatIconModule, MatSnackBarModule, DefinitionModalComponent],  // ✅ Add the necessary imports
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent {


  constructor(private dictionaryService: DictionaryService, private snackBar: MatSnackBar) { }

  words = signal<string[]>(this.loadWords()); // Load words from LocalStorage
  newWord = signal('');
  currentDefinitions = signal<any>(null);
  wordError: boolean = false;
  errorMessage: string = '';
  isModalOpen = false;
  firstAudio: string = '';

  favouriteWords = signal<string[]>(this.loadFavWords());

  closeModal() {
    this.isModalOpen = false;
  }

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

  resetError() {
    this.wordError = false;
    this.errorMessage = '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {  // Add the options object as the second argument
      duration: 3000, // Auto-close in 3 seconds
      horizontalPosition: 'end', // 'start' | 'center' | 'end'
      verticalPosition: 'bottom', // 'top' | 'bottom'
      panelClass: ['snackbar-error'], // Apply custom styles
    });
  }

  addWord() {
    this.resetError();

    if (this.newWord().trim() === '') {
      this.wordError = true;
      this.errorMessage = "You must enter a word!";
      this.openSnackBar(`You must enter a word!`);
      this.newWord.set('');
      setTimeout(() => {
        this.resetError();
      }, 7000)
      return
    }
    if (this.words().includes(this.newWord().trim().toLowerCase())) {
      this.wordError = true;
      this.errorMessage = `"${this.newWord().trim()}" is already in your words!`;
      this.openSnackBar(`"${this.newWord().trim()}" is already in your words!`);
      this.newWord.set('');
      setTimeout(() => {
        this.resetError();
      }, 7000)
      return
    }

    this.dictionaryService.getWordDefinition(this.newWord().trim()).subscribe(
      (data) => {
        this.words.update(words => [...words, this.newWord().trim()]);
        this.newWord.set('');
        this.saveWords(); // Save updated list to LocalStorage

      },
      (error) => {
        this.openSnackBar('Word not found!');

        this.wordError = true;
        this.errorMessage = error.error.message;
        this.newWord.set('');
        setTimeout(() => {
          this.resetError();
        }, 7000)
      }
    );

  }

  // TODO: Move to service
  playAudio(word: string, i: any) {
    this.dictionaryService.getWordDefinition(word.trim()).subscribe(
      (data) => {
        this.currentDefinitions.set(data);


        // Ensure phonetics exists and has an audio URL
        const phonetics = this.currentDefinitions()[0]?.phonetics;
        const songToPlay = phonetics?.find((p: { audio: any; }) => p.audio)?.audio;

        if (songToPlay) {
          new Audio(songToPlay).play();
        }

      },
      (error) => {
        this.openSnackBar(`No word Found, try another!`);
      }
    );
  }


  // playSound(word: string) {
  //   // console.log(index);
  //   console.log(this.currentDefinitions());
  //   console.log(this.words());
  //   this.dictionaryService.getWordDefinition(word.trim()).subscribe(
  //     (data) => {
  //       this.firstAudio = data[0].phonetics[0].audio
  //     },
  //     (error) => {
  //       this.openSnackBar(`Error getting sound!`);
  //     }
  //   );
  // }

  removeWord(index: number) {
    this.words.update(words => words.filter((_, i) => i !== index));
    this.saveWords(); // Save updated list
  }

  retrieveWordInfo(word: string) {
    this.dictionaryService.getWordDefinition(word.trim()).subscribe(
      (data) => {
        this.currentDefinitions.set(data);
        this.isModalOpen = true;
      },
      (error) => {
        this.openSnackBar(`No word Found, try another!`);
      }
    );
  }

  addToFavourite(word: string) {
    const trimmedWord = word.trim();

    // Check if the word already exists
    this.favouriteWords.update(favouriteWords => {

      if (favouriteWords.includes(trimmedWord)) {
        this.openSnackBar(`"${trimmedWord}" is already in your favourites!`);
        return favouriteWords; // No change
      }
      return [...favouriteWords, trimmedWord];
    });

    this.saveFavWords();
    console.log(this.favouriteWords());
  }

  checkInFavs(word: string) {
    if (this.favouriteWords().includes(word)) {
      return true; // No change
    }
    return false;
  }
}
