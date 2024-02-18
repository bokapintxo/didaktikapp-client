import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, HttpClientModule],
})
export class HomePage {
  audioCorrect: any;
  audioWrong: any;
  audioBtn: any;
  audioBtnSecondary: any;

  constructor(private router: Router, private http:HttpClient) {}

  ngOnInit() {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';

    this.audioBtnSecondary = new Audio();
    this.audioBtnSecondary.src = '../../assets/aud/btn_txikia.mp3';

    //connect to API
    const link: string = 'http://bokapintxo.com:8000/api/dialogoak';
    fetch(link)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const loadingItem = document.getElementById('loading');
      if (loadingItem) {
        loadingItem.style.display = 'none';
      }
      const startButton = document.getElementById('startButton');
      if (startButton) {
        startButton.classList.remove('button-disabled');
      }
    })
    .catch(error => {
      const loadingItem = document.getElementById('loading');
      if (loadingItem) {
        loadingItem.innerText = 'Zerbitzaria ez dago erabilgarri :('
      }
      console.error('There has been a problem with your fetch operation:', error);
    });
  }

  navigateBingoRole(): void {
    this.router.navigate(['/bingo-rola']);
  }

  navigatePuzzle(): void {
    this.router.navigate(['/puzzlea']);
  }

  navigateHitzak(): void {
    this.router.navigate(['/hitzak-lotu']);
  }

  navigateHitzak2(): void {
    this.router.navigate(['/hitzak-lotu-bi']);
  }

  navigateHizkiZopa(): void {
    this.router.navigate(['/hizki-zopa']);
  }

  navigateDialog(): void {
    this.router.navigate(['/dialog'], { queryParams: { i: 0 } });
  }

  navigateHitzakLotu(): void {
    this.router.navigate(['/hitzak-lotu']);
  }

  navigateUrkatua(): void {
    this.router.navigate(['/urkatua']);
  }

  navigateLaberintoa(): void {
    this.router.navigate(['/laberintoa']);
  }

  navigateZenbakiakLotu(): void {
    this.router.navigate(['/zenbakiak-lotu']);
  }

  navigateTemplate(): void {
    this.router.navigate(['/template-page']);
  }

  navigateKredituak(): void {
    this.router.navigate(['/kredituak']);
  }

  async pushButton() {
    this.audioBtn.load();
    this.audioBtn.play();
    await Haptics.vibrate({duration: 10});
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({duration: 10});
  }

  async pushSecondaryButton() {
    this.audioBtnSecondary.load();
    this.audioBtnSecondary.play();
    await Haptics.vibrate({duration: 5});
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
}
