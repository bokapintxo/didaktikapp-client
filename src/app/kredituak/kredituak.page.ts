import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Haptics } from '@capacitor/haptics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kredituak',
  templateUrl: './kredituak.page.html',
  styleUrls: ['./kredituak.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class KredituakPage implements OnInit {
  audioBtn: any;
  audioBtnSecondary: any;

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';

    this.audioBtnSecondary = new Audio();
    this.audioBtnSecondary.src = '../../assets/aud/btn_txikia.mp3';
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

  goBack() {
    this.navCtrl.back();
  }

  navigateAttribution() {
    this.router.navigate(['/atribuzioak']);
  }
}
