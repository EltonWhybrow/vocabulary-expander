import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryService } from '../word-list/word-list.component.spec';
import { MatIconModule } from '@angular/material/icon';
import { DefinitionModalComponent } from '../definition-modal/definition-modal.component';

@Component({
  selector: 'app-favourites',
  standalone: true,  // ✅ Mark it as standalone
  imports: [CommonModule, MatIconModule, DefinitionModalComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {


  favouriteWords = signal<string[]>(this.loadFavWords());
  currentDefinitions = signal<any>(null);
  isModalOpen = false;

  closeModal() {
    this.isModalOpen = false;
  }

  constructor(private dictionaryService: DictionaryService) {

  }
  private loadFavWords(): string[] {
    return JSON.parse(localStorage.getItem('favWordList') || '[]');
  }

  private saveFavWords() {
    localStorage.setItem('favWordList', JSON.stringify(this.favouriteWords()));
  }

  removeFavWord(index: number) {
    const isConfirmed = confirm('Are you sure you want to delete one of you favs?')
    if (isConfirmed) {
      this.favouriteWords.update(favouriteWords => favouriteWords.filter((_, i) => i !== index));
      this.saveFavWords(); // Save updated list
    }
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
        // this.openSnackBar(`No word Found, try another!`);
      }
    );
  }

  retrieveWordInfo(word: string) {
    console.log('word >>>>>', word)
    this.dictionaryService.getWordDefinition(word.trim()).subscribe(
      (data) => {
        // this.wordList.push(data[0]); // Store only the first result
        // this.saveToLocalStorage();
        this.currentDefinitions.set(data);
        this.isModalOpen = true;
        console.log('Word added!', data);
      },
      (error) => {
        console.error('Word not found!', error);
        alert('cant find word - TODO!')
      }
    );
  }



}
