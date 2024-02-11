import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-hitzak-lotu',
  templateUrl: './hitzak-lotu.page.html',
  styleUrls: ['./hitzak-lotu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class HitzakLotuPage implements OnInit {
  private backButtonSubscription: Subscription = new Subscription();

  audioCorrect: any;
  audioWrong: any;
  audioBtn: any;
  audioBtnSecondary: any;

  estilosBotones: { [key: string]: string } = {};
  parejasFormadas: { [key: string]: boolean } = {};
  botonesSeleccionados: { [key: string]: boolean } = {};

  estiloaAldatu(nombreBoton: string, claseEstilo: string) {
    if (this.tieneParejaYColor(nombreBoton)) {
      return;
    }
  
    // Si el botón ya está seleccionado, deselecciónalo
    if (this.botonesSeleccionados[nombreBoton]) {
      this.botonesSeleccionados = {};
      this.estilosBotones[nombreBoton] = '';
      return;
    }
  
    const esPrimerConjunto = nombreBoton === 'eguenzuri' || nombreBoton === 'bariku_argi' || nombreBoton === 'zapatu_erregularra' || nombreBoton === 'domeka_karnabala' || nombreBoton === 'ilen_karnabala' || nombreBoton === 'martitzen_karnabala' || nombreBoton === 'txitxiburduntxi';
  
    if (esPrimerConjunto || Object.keys(this.botonesSeleccionados).length > 0) {
      this.botonesSeleccionados[nombreBoton] = true;
      this.estilosBotones[nombreBoton] = claseEstilo;
  
      if (Object.keys(this.botonesSeleccionados).length === 2) {
        const botonesSeleccionadosArray = Object.keys(this.botonesSeleccionados);
        const primerBoton = botonesSeleccionadosArray[0];
        const segundoBoton = botonesSeleccionadosArray[1];
  
        if (this.sonPareja(primerBoton, segundoBoton)) {
          this.correctHaptic();
          this.parejasFormadas[primerBoton] = true;
          this.parejasFormadas[segundoBoton] = true;
          this.botonesSeleccionados = {};

          if (this.allSakatuta()) {
            document.getElementById("hitzaklotujarraitu")?.classList.remove('button-disabled');
          }
        } else {
          this.incorrectHaptic();
          this.estilosBotones[primerBoton] = this.parejasFormadas[primerBoton] ? claseEstilo : '';
          this.estilosBotones[segundoBoton] = this.parejasFormadas[segundoBoton] ? claseEstilo : '';
          this.botonesSeleccionados = {};
        }
      }
    }
  }
  
  sonPareja(boton1: string, boton2: string): boolean {
    return this.estilosBotones[boton1] === this.estilosBotones[boton2] && this.estilosBotones[boton1] !== '';
  }

  tieneParejaYColor(boton: string): boolean {
    return this.parejasFormadas[boton];
  }

  allSakatuta(): boolean {
    const botones = ['eguenzuri', 'bariku_argi', 'zapatu_erregularra', 'domeka_karnabala', 'ilen_karnabala', 'martitzen_karnabala', 'txitxiburduntxi'];
    return botones.every(boton => this.parejasFormadas[boton]);
  }

  navigateHitzakLotuBi(): void {
    this.backButtonSubscription.unsubscribe();
    this.router.navigate(['/hitzak-lotu-bi']);
  }
  
  constructor(private router: Router, private platform: Platform) { }

  ngOnInit() {
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
