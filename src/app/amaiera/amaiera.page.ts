import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Haptics } from '@capacitor/haptics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-amaiera',
  templateUrl: './amaiera.page.html',
  styleUrls: ['./amaiera.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AmaieraPage implements OnInit {
  audioBtn: any;
  private backButtonSubscription: Subscription = new Subscription();

  constructor(private router: Router, private platform: Platform) { }

  ngOnInit() {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Do nothing here to disable the back button
    });
  }

  navigateKredituak() {
    this.router.navigate(['/kredituak']);
  }

  async pushButton() {
    this.audioBtn.load();
    this.audioBtn.play();
    await Haptics.vibrate({duration: 10});
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({duration: 10});
  }




}
