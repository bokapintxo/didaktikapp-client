import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-zenbakiak-lotu',
  templateUrl: './zenbakiak-lotu.page.html',
  styleUrls: ['./zenbakiak-lotu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ZenbakiakLotuPage implements OnInit {
  audioCorrect: any;
  audioWrong: any;

  galderak: string[] = [
    "Durangoko azokak 20 edizio besterik ez du.", 
    "Txitxiburduntxia, txorizoa sutan erreta jateari deitzen zaio.", 
    "Durangon, guztira, 12 arku zeuden, baina gaur egun Santa Anakoa bakarrik dago zutik.",
    "Santa Anako eliza ez da inoiz berreraikia izan.", 
    "Uribarriko Andra Mari basilikak Euskadiko arkupe handiena du.", 
    "Durangoko azoka, lehendabiziz, Santa Mariaren arkupeetan antolatzen zen.", 
    "Aitzinean, Durango, harresiz inguratutako herri bat zen.", 
    "Durangoko Aratusteak hilabete oso bat irauten dute.",
    "Surrandiek '¡Mascarita ya te conozco, por tu cara de... Morrosco!' kantatzen irtetzen dira kalera.", 
    "Zuen lehenengo geralekua Uribarriko Andra Mari basilika izan da", 
    "Tiliño dantza taldeak Surrandien kalejira sortu zuen orain dela 23 urte.", 
    "Durangoko azoka Gerediaga Elkarteak antolautako jarduera bat da.",
    "Durangoko azokan janaria bakarrik saltzen da.", 
  ]
  erantzunak: boolean[] = [false, true, false, false, true, true, true, false, false, false, false, true, false]
  erantzunZuzenak: number = 0;
  galderaIndizea: number = 0;
  falloak: number = 0;
  argazkiAldaketa: number = 0;

  erantzunaBalidatu(aukera: boolean): void {
    const erantzunZuzena = this.erantzunak[this.galderaIndizea];
    if(aukera == erantzunZuzena){
      this.correctHaptic();
      if(this.erantzunZuzenak == 8){
        this.animazioaGehitu();
        this.argazkiaAldatu();
        const momentukoGaldera = document.getElementById("momentukoGaldera") as HTMLParagraphElement;
        momentukoGaldera.textContent = "ZORIONAK JOKUA IRABAZI DUZU!";
        this.botoiaAktibatu();
        return;
      }
      this.argazkiaAldatu();
      this.galderaAldatu();
      ++this.erantzunZuzenak;
    }else {
      this.incorrectHaptic();
      ++this.falloak;
      this.galderaAldatu();
    }

    if(this.falloak > 3) {
      this.zenbakiakLotuReset();
    }

    console.log("Erantzun zuzenak: " + this.erantzunZuzenak);
    console.log("Galdera indizea: " + this.galderaIndizea);
  }

  galderaAldatu(): void {
    ++this.galderaIndizea;
    const momentukoGaldera = document.getElementById("momentukoGaldera") as HTMLParagraphElement;
    momentukoGaldera.textContent = this.galderak[this.galderaIndizea];
  }

  argazkiaAldatu(): void {
    ++this.argazkiAldaketa;
    const argazkia = document.getElementById("argazkia") as HTMLImageElement;
    const srcBerria = "../../assets/zenbakiak-lotu/img/M" + this.argazkiAldaketa + ".png";
    argazkia.src = srcBerria;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.audioCorrect = new Audio();
    this.audioCorrect.src = '../../assets/aud/correct.mp3';
    this.audioWrong = new Audio();
    this.audioWrong.src = '../../assets/aud/wrong.mp3';

    const momentukoGaldera = document.getElementById("momentukoGaldera") as HTMLParagraphElement;
    momentukoGaldera.textContent = this.galderak[0];
  }

  animazioaGehitu(): void {
    const argazkiaElements = document.getElementsByClassName("zenbakiak-lotu-argazkia");
        if (argazkiaElements.length > 0) {
          const argazkia = argazkiaElements[0] as HTMLElement;
          argazkia.classList.add("irabaziAnim");
        }
  }

  animazioaKendu(): void {
    const argazkiaElements = document.getElementsByClassName("zenbakiak-lotu-argazkia");
    if (argazkiaElements.length > 0) {
      const argazkia = argazkiaElements[0] as HTMLElement;
      argazkia.classList.remove("irabaziAnim");
    }
  }

  botoiaAktibatu(): void {
    document.getElementById('zenbakiaklotujarraitu')?.classList.remove('button-disabled');
    const galderabotoiakElements = document.getElementsByClassName('galderabotoiak') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < galderabotoiakElements.length; i++) {
      galderabotoiakElements[i]?.classList.add('button-disabled');
    }
  }

  zenbakiakLotuReset(): void {
    this.galderaIndizea = 0;
    this.falloak = 0;
    this.argazkiAldaketa = 0;
    this.erantzunZuzenak = 0;

    const argazkia = document.getElementById("argazkia") as HTMLImageElement;
    const srcBerria = "../../assets/zenbakiak-lotu/img/M0.png";
    argazkia.src = srcBerria;

    document.getElementById('zenbakiaklotujarraitu')?.classList.add('button-disabled');
    const galderabotoiakElements = document.getElementsByClassName('galderabotoiak') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < galderabotoiakElements.length; i++) {
      galderabotoiakElements[i]?.classList.remove('button-disabled');
    }

    this.animazioaKendu();

    this.ngOnInit();
  } 
  
  navigateHome(): void {
    this.zenbakiakLotuReset();
    this.router.navigate(['/dialog'], { queryParams: { i: 119 } });
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
