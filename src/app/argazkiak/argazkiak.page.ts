import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { Haptics } from '@capacitor/haptics';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-argazkiak',
  templateUrl: './argazkiak.page.html',
  styleUrls: ['./argazkiak.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ArgazkiakPage implements OnInit {
  audioBtn: any;  
  zone: any;
  zoneName: string = '';
  zones: string[] = ["Santa Anako Arkua", "Santa Ana Eliza", "Uribarriko Andra Mari basilika", "Landako Gunea", "Durangoko Aratusteak", "Surrandiak", "Ezkurdi plaza"];

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';
    this.route.queryParams.subscribe(params => {
      this.zone = params['zone'];
    });
    this.zoneName = this.zones[this.zone - 1];
  }

  async pushButton() {
    this.audioBtn.load();
    this.audioBtn.play();
    await Haptics.vibrate({duration: 10});
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({duration: 10});
  }

  goBack() {
    this.navCtrl.back();
  }
}
