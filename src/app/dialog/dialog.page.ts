import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, Platform } from '@ionic/angular';

import { DialogService } from '../services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Haptics } from '@capacitor/haptics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class DialogPage implements OnInit {
  audioBtnSecondary: any;
  i: number = 0;
  zone: number = 0;
  nextMap: boolean = true;

  private backButtonSubscription: Subscription = new Subscription();

  constructor(private dialogService: DialogService, private route: ActivatedRoute, private router: Router, private platform: Platform, private navi: NavController) {}

  ngOnInit(): void {
    this.audioBtnSecondary = new Audio();
    this.audioBtnSecondary.src = '../../assets/aud/btn_txikia.mp3';    
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Do nothing here to disable the back button
    });
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.i = params['i'];
    });

    console.log("kaixo:", this.i);
    this.fetchConversacion(this.i);
  }

  fetchConversacion(idx: number): void {
    fetch('assets/dialog/dialog.json')
      .then((response) => response.json())
      .then((conversacion) => {
        let val = this.dialogService.mostrarConversacion(conversacion, () => {}, idx);
        if(val > 900) {
          this.nextMap = true;
          switch (val) {
            case 901:
              val = 23;
              this.navi.navigateForward("/puzzlea");
              break;
            case 902:
              val = 44;
              this.navi.navigateForward("/laberintoa");
              break;
            case 903:
              val = 60;
              this.navi.navigateForward("/urkatua");
              break;
            case 904:
              val = 79;
              this.navi.navigateForward("/bingo-rola");
              break;
            case 905:
              val = 99;
              this.navi.navigateForward("/hitzak-lotu");
              break;
            case 906:
              val = 121;
              this.navi.navigateForward("/zenbakiak-lotu");
              break;
            case 907:
              val = 145;
              this.navi.navigateForward("/hizki-zopa");
              break;
            case 908:
              this.navi.navigateForward("/amaiera");
              break;
          }
        } else if(val > 800) {
          this.nextMap = false;
          const imgBtn = document.getElementById("dialogimgbtn");
          if(imgBtn) {
            imgBtn.classList.remove('button-disabled');
          }
          this.navi.navigateForward("/mapa", { queryParams: { i: val - 800 } });
          this.zone = val - 800;
          val = this.i;
        }
      })
      .catch((error) =>
        console.error('Error al cargar el archivo JSON:', error)
      );
  }

  skip() {
    if(this.nextMap) {
      this.nextMap = false;
      this.zone++;
      if (this.zone < 8) {
        this.router.navigate(['/mapa'], { queryParams: { i: this.zone } });
      }
    } else {
      this.nextMap = true;
      switch (this.zone) {
        case 1:
          this.navi.navigateForward("/puzzlea");
          break;
        case 2:
          this.navi.navigateForward("/laberintoa");
          break;
        case 3:
          this.navi.navigateForward("/urkatua");
          break;
        case 4:
          this.navi.navigateForward("/bingo-rola");
          break;
        case 5:
          this.navi.navigateForward("/hitzak-lotu");
          break;
        case 6:
          this.navi.navigateForward("/zenbakiak-lotu");
          break;
        case 7:
          this.navi.navigateForward("/hizki-zopa");
          break;
      }
    }
  }

  pasarMensaje(): void {
    this.fetchConversacion(this.i);
  }

  navigateImg() {
    this.router.navigate(['/argazkiak'], { queryParams: { zone: this.zone } });
  }

  async pushSecondaryButton() {
    this.audioBtnSecondary.load();
    this.audioBtnSecondary.play();
    await Haptics.vibrate({duration: 5});
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }  
}
