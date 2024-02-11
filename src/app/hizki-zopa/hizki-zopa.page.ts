import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { Haptics } from '@capacitor/haptics';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hizki-zopa',
  templateUrl: './hizki-zopa.page.html',
  styleUrls: ['./hizki-zopa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HizkiZopaPage implements OnInit {
  board: string[][];
  selected: HTMLElement[] = [];
  predefinedBoard: string[][] = [
    ["F","R","O","T","O","I","E","S","A","E"],
    ["E","R","A","K","I","O","S","K","O","S"],
    ["S","K","P","A","R","K","E","R","I","K"],
    ["T","F","A","D","P","I","O","G","L","U"],
    ["A","T","R","E","N","O","N","E","R","L"],
    ["T","R","N","O","U","S","A","L","E","T"],
    ["U","E","R","M","N","K","O","T","X","U"],
    ["A","T","E","R","P","T","L","O","G","R"],
    ["K","O","P","A","R","I","O","K","M","A"],
    ["I","T","U","R","R","I","A","I","A","K"]
  ];
  coordinatePairs: string[][] = [
    ["01", "07"],
    ["09", "59"],
    ["13", "79"],
    ["14", "44"],
    ["22", "62"],
    ["31", "81"],
    ["73", "79"],
    ["90", "98"]
  ];
  currentSelection: string = '';
  completedWords: number = 0;
  audioCorrect: any;
  audioWrong: any;
  audioBtn: any;


  private backButtonSubscription: Subscription = new Subscription();

  constructor(private router: Router, private platform: Platform) { 
    this.board = [] = this.predefinedBoard;

    /*
    for (let i = 0; i < 10; i++) {
      const row: string[] = [];
      for (let j = 0; j < 10; j++) {
        const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        row.push(char);
      }
      this.board.push(row);
    }
    */
  }

  ngOnInit() {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';

    this.audioCorrect = new Audio();
    this.audioCorrect.src = '../../assets/aud/correct.mp3';

    this.audioWrong = new Audio();
    this.audioWrong.src = '../../assets/aud/wrong.mp3';

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Do nothing here to disable the back button
    });
  }

  /*
  generateBoard() {
    //generates a starting position for each word
    for(const word in this.words){
      const wordLength = this.words[word].length;
      let row: number = 0; //init to avoid error
      let col: number = 0;
      let isVertical: boolean = Math.random() > 0.5;
      let isOverlapping: boolean = true;
      //if the word is vertical, the row should be (10 - the length) to avoid overflow
      //and vice versa for horizontal with the column
      while(isOverlapping) {
        isVertical = Math.random() > 0.5;
        if(isVertical) {
          row = Math.floor(Math.random() * (10 - wordLength));
          col = Math.floor(Math.random() * 10);
        } else {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * (10 - wordLength));
        }
        for(const pos in this.wordPos) {
          const posSplit = pos.split('-');
          const posRow = parseInt(posSplit[0]);
          const posCol = parseInt(posSplit[1]);
          const posIsVertical = posSplit[2] === 'true';
          if(isVertical === posIsVertical) {
            if(isVertical) {
              if(row >= posRow && row < posRow + wordLength && col === posCol) {
                isOverlapping = true;
                break;
              }
            } else {
              if(col >= posCol && col < posCol + wordLength && row === posRow) {
                isOverlapping = true;
                break;
              }
            }
          }
          isOverlapping = false;
        }
      }
      this.wordPos.push(row + '-' + col + '-' + isVertical);
      console.log('Word:', this.words[word], 'Row:', row, 'Col:', col, 'Vertical:', isVertical);
    }
    drawBoard(this.wordPos);
  }
  */

  handleClick(id: string) {
    id = id.replace('zopainner', '');
    console.log('==NEW==')
    console.log('currentSelection:', this.currentSelection);
    console.log('Clicked div id:', id);
    console.log('Completed words:', this.completedWords)
    const element = document.getElementById('zopainner' + id) as HTMLElement;
    if (element) {
      //make current letter appear in red
      element.classList.add('zopaselected');
      this.selected.push(element);
    }
    if (this.currentSelection !== '') {
      //search for the clicked pair in the coordinates
      for(const pair of this.coordinatePairs) {
        if (pair[0] === this.currentSelection && pair[1] === id) {
          //delete the pair from the coordinates
          const index = this.coordinatePairs.indexOf(pair);
          if (index > -1) {
            this.coordinatePairs.splice(index, 1);
          }
          this.correctHaptic();
          this.completedWords += 1;
          this.currentSelection = '';
          this.handleReset();
          this.colorWord(pair[0], pair[1]);
          if(this.completedWords === 8) {
            console.log('==COMPLETED!==');
            const continueBtn = document.getElementById('zopaJarraituBtn') as HTMLElement;
            if (continueBtn) {
              continueBtn.classList.remove('button-disabled');
            }
          }
          return;
        }
      }
      //if the clicked pair isn't in the coordinates, incorrect + reset
      this.incorrectHaptic();
      console.log('INCORRECT!');
      this.currentSelection = '';
      this.handleReset();
    } else {
      this.currentSelection = id;
    }

  }
  colorWord(arg0: string, arg1: string) {
    const startxaxis = parseInt(arg0[0]);
    const startyaxis = parseInt(arg0[1]);
    const endxaxis = parseInt(arg1[0]);
    const endyaxis = parseInt(arg1[1]);

    if (startxaxis < endxaxis && startyaxis < endyaxis) {
      let j = startyaxis;
      for (let i = startxaxis; i <= endxaxis; i++) {
        const element = document.getElementById('zopainner' + i + j) as HTMLElement;
        element.classList.add('zopacorrect');
        j++;
      }
    } else if(startxaxis < endxaxis) {
      for (let i = startxaxis; i <= endxaxis; i++) {
        const element = document.getElementById('zopainner' + i + startyaxis) as HTMLElement;
        element.classList.add('zopacorrect');
      }
    } else if(startyaxis < endyaxis) {
      for (let i = startyaxis; i <= endyaxis; i++) {
        const element = document.getElementById('zopainner' + startxaxis + i) as HTMLElement;
        element.classList.add('zopacorrect');
      }
    }
  }

  handleReset() {
    this.selected.forEach(element => {
      element.classList.remove('zopaselected');
    });
    this.selected = [];
  }

  async pushButton() {
    this.audioBtn.load();
    this.audioBtn.play();
    await Haptics.vibrate({duration: 10});
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({duration: 10});
  }

  async incorrectHaptic() {
    this.audioWrong.load();
    this.audioWrong.play();
    await Haptics.vibrate({duration: 50});
    await new Promise(resolve => setTimeout(resolve, 100));
    await Haptics.vibrate({duration: 200});
  }

  async correctHaptic() {
    this.audioCorrect.load();
    this.audioCorrect.play();
    await Haptics.vibrate({duration: 20});
    await new Promise(resolve => setTimeout(resolve, 80));
    await Haptics.vibrate({duration: 20});
    await new Promise(resolve => setTimeout(resolve, 80));
    await Haptics.vibrate({duration: 20});
    await new Promise(resolve => setTimeout(resolve, 80));
    await Haptics.vibrate({duration: 20});
  }

  
  goBack() {
    this.router.navigate(['/dialog'], { queryParams: { i: 143 } });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
