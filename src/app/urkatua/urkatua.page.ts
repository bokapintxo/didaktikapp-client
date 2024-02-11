import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-urkatua',
  templateUrl: './urkatua.page.html',
  styleUrls: ['./urkatua.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class UrkatuaPage implements OnInit {
  hitza: string = 'LANDAKOGUNEA';
  falloak: number = 0;
  aukeratutakoletrak: Set<string> = new Set<string>();
  momentukoletra: string = ''; // Nueva propiedad para almacenar la letra seleccionada
  abecedario: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  letraClase: { [letra: string]: string } = {};
  letraZuzenak: Set<string> = new Set<string>();
  letraOkerrak: Set<string> = new Set<string>();

  audioCorrect: any;
  audioWrong: any;
  audioBtn: any;
  audioBtnSecondary: any;
  
  private backButtonSubscription: Subscription = new Subscription();

  constructor(private router: Router, private platform: Platform) {}
  ngOnInit(): void {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';

    this.audioBtnSecondary = new Audio();
    this.audioBtnSecondary.src = '../../assets/aud/btn_txikia.mp3';

    this.audioCorrect = new Audio();
    this.audioCorrect.src = '../../assets/aud/correct.mp3';

    this.audioWrong = new Audio();
    this.audioWrong.src = '../../assets/aud/wrong.mp3';
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Do nothing here to disable the back button
    });
  }

  letraAukeratu(letra: string): void {
    this.pushSecondaryButton();

    if(this.hitzaAsmatuta()) {
      return;
    }
    // Aukeratutako botoi bat berriz aukeratzen bada, kolorea kenduko zaio
    if(this.letraClase[letra] === 'urkatuabtn-sakatu') {
      this.letraClase[letra] = '';
      this.momentukoletra = '';
    } else {
      // Beste botoi bat aukeratzean, aurreko botoiari .urkatubtn-sakatu klasea kenduko zaio
      if(this.momentukoletra !== '') {
        this.letraClase[this.momentukoletra] = this.letraZuzenak.has(this.momentukoletra) ? 'urkatuabtn-zuzen' : this.letraOkerrak.has(this.momentukoletra) ? 'urkatuabtn-oker' : '';
      }

      this.momentukoletra = letra;
      this.letraClase[letra] = 'urkatuabtn-sakatu';
      
      // Momentuan aukeratuta dagoen letra gordeko du
      this.momentukoletra = letra;
    }
  }

  aukeraKonfirmatu(): void {
    if(this.momentukoletra) {

      if(this.hitza.includes(this.momentukoletra)) {
        this.aukeratutakoletrak.add(this.momentukoletra);
        this.letraClase[this.momentukoletra] = 'urkatuabtn-zuzen';
        this.letraZuzenak.add(this.momentukoletra);
        this.correctHaptic();
      } else {
        this.falloak++;
        this.letraClase[this.momentukoletra] = 'urkatuabtn-oker';
        this.letraOkerrak.add(this.momentukoletra);
        this.incorrectHaptic();
      }
      this.momentukoletra = '';
    }

    if(this.falloak >= 8) {
      this.jokuaReseteatu();
      return;
    }
  }

  jokuaReseteatu(): void {
    this.hitza = 'LANDAKOGUNEA';
    this.falloak = 0;
    this.aukeratutakoletrak.clear();
    this.letraClase = {};
    this.letraZuzenak.clear();
    this.letraOkerrak.clear();
    this.momentukoletra = '';
  }

  hitzaAsmatuta(): boolean {
    for(const letra of this.hitza) {
      if(!this.aukeratutakoletrak.has(letra)) {
        return false;
      }
    }
    return true;
  }

  goBack() {
    this.pushButton();
    this.router.navigate(['/dialog'], { queryParams: { i: 58 } });
    this.backButtonSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
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