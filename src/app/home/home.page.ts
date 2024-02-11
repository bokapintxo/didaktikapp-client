import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
//import { Media } from '@ionic-native/media/ngx';
//import { AudioService } from '../audio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  audioCorrect: any;
  audioWrong: any;
  audioBtn: any;
  audioBtnSecondary: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';

    this.audioBtnSecondary = new Audio();
    this.audioBtnSecondary.src = '../../assets/aud/btn_txikia.mp3';

    this.audioCorrect = new Audio();
    this.audioCorrect.src = '../../assets/aud/correct.mp3';

    this.audioWrong = new Audio();
    this.audioWrong.src = '../../assets/aud/wrong.mp3';
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
