import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Haptics } from '@capacitor/haptics';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bingoa',
  templateUrl: './bingoa.page.html',
  styleUrls: ['./bingoa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class BingoaPage implements OnInit {
  btnStates: boolean[] = new Array(9).fill(false);
  data: { name: string, index: number }[] = [];
  board: { name: string, index: number }[] = [];
  audioCorrect: any;
  audioButton: any;
  audioSecondaryButton: any;
  private backButtonSubscription: Subscription = new Subscription();
  
  constructor(private router: Router, private http: HttpClient, private platform: Platform) {
    
  }

  ngOnInit() {
    this.loadData();
    this.audioCorrect = new Audio();
    this.audioCorrect.src = '../../assets/aud/correct.mp3';
    this.audioButton = new Audio();
    this.audioButton.src = '../../assets/aud/btn_handia.mp3';
    this.audioSecondaryButton = new Audio();
    this.audioSecondaryButton.src = '../../assets/aud/btn_txikia.mp3';
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Do nothing here to disable the back button
    });
  }

  loadData() {
    this.http.get('../../assets/bingoa-irudiak/izenak.csv', {responseType: 'text'}).subscribe(
      data => {
        let csvToRowArray = data.split('\n');
        for (let index = 0; index < csvToRowArray.length; index++) {
          let row = csvToRowArray[index].split(';');
          this.data.push({name: row[0], index: Number(row[1])});
          console.log(this.data[index]);
        }
        this.generateBoard();
      },
      error => {
        console.log(error);
      }
    );
  }

  generateBoard() {
    for(let i = 0; i < 9; i++) {
      let randomIndex = Math.floor(Math.random() * this.data.length);
      let selectedPerson = this.data[randomIndex];
      this.data.splice(randomIndex, 1);
      this.board.push(selectedPerson);
      let imageElement = document.getElementById("bingobtn" + i);
      if (imageElement) {
        console.log("url(../../assets/bingoa-irudiak/" + selectedPerson.index + ".jpg)");
        imageElement.style.backgroundImage = "url(../../assets/bingoa-irudiak/" + selectedPerson.index + ".jpg)";
      }
      let textElement = document.getElementById("bingotext" + i);
      if (textElement) {
        textElement.textContent = selectedPerson.name;
      }
    }
  }
  
  toggleSakatuta(index:number, btn:any):void {
    this.btnStates[index] = !this.btnStates[index];
    btn.classList.toggle('bingosakatuta');
    document.getElementById("bingocheck" + index)?.classList.toggle("hidden");
    if (this.allSakatuta()) {
      document.getElementById("bingojarraitu")?.classList.remove('button-disabled');
    } else {
      document.getElementById("bingojarraitu")?.classList.add('button-disabled');
    }
    if (this.allSakatuta()) {
      this.correctHaptic();
    }
  }

  allSakatuta():boolean {
    return this.btnStates.every(state => state === true);
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  async pushButton() {
    this.audioButton.load();
    this.audioButton.play();
    await Haptics.vibrate({duration: 5});
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({duration: 5});
  }

  async pushSecondaryButton() {
    this.audioSecondaryButton.load();
    this.audioSecondaryButton.play();
    await Haptics.vibrate({duration: 5});
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
    this.router.navigate(['/dialog'], { queryParams: { i: 77 } });
    this.backButtonSubscription.unsubscribe();
  }
  
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
