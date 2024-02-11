import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { Haptics } from '@capacitor/haptics';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bingo-irakaslea',
  templateUrl: './bingo-irakaslea.page.html',
  styleUrls: ['./bingo-irakaslea.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class BingoIrakasleaPage implements OnInit {
  audioCorrect: any;
  audioWrong: any;
  audioButton: any;
  audioSecondaryButton: any;
  private backButtonSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private router: Router, private platform: Platform) { }

  ngOnInit() {
    this.loadData();
    this.audioButton = new Audio();
    this.audioButton.src = '../../assets/aud/btn_handia.mp3';

    this.audioSecondaryButton = new Audio();
    this.audioSecondaryButton.src = '../../assets/aud/btn_txikia.mp3';

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Do nothing here to disable the back button
    });
  }

  data: { name: string, index: number }[] = [];

  loadData() {
    this.http.get('../../assets/bingoa-irudiak/izenak.csv', {responseType: 'text'}).subscribe(
      data => {
        let csvToRowArray = data.split('\n');
        for (let index = 0; index < csvToRowArray.length; index++) {
          let row = csvToRowArray[index].split(';');
          this.data.push({name: row[0], index: Number(row[1])});
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getNewPerson() {
    if (this.data.length > 1) {
      let randomIndex = Math.floor(Math.random() * this.data.length);
      let selectedPerson = this.data[randomIndex];
      this.data.splice(randomIndex, 1);
      let rngTextElement = document.getElementById("rng-text");
      if (rngTextElement) {
        rngTextElement.textContent = selectedPerson.name;
      }
      let rngImageElement = document.getElementById("rng-img");
      if (rngImageElement) {
        rngImageElement.setAttribute("src", "../../assets/bingoa-irudiak/" + selectedPerson.index + ".jpg");
      }
      return null;
    } else {
      document.getElementById("rngjarraitu")?.classList.remove('button-disabled');
      document.getElementById("rnghurrengoa")?.classList.add('button-disabled');
      let rngTextElement = document.getElementById("rng-text");
      if(rngTextElement) {
        rngTextElement.textContent = this.data[0].name;
      }
      let rngImageElement = document.getElementById("rng-img");
      if (rngImageElement) {
        rngImageElement.setAttribute("src", "../../assets/bingoa-irudiak/" + this.data[0].index + ".jpg");
      }
      return null;
    }
  }


  async pushButton() {
    this.audioButton.load();
    this.audioButton.play();
    await Haptics.vibrate({duration: 10});
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({duration: 10});
  }

  async pushSecondaryButton() {
    this.audioSecondaryButton.load();
    this.audioSecondaryButton.play();
    await Haptics.vibrate({duration: 5});
  }

  goBack() {
    this.router.navigate(['/dialog'], { queryParams: { i: 77 } });
    this.backButtonSubscription.unsubscribe();
  }
  
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
