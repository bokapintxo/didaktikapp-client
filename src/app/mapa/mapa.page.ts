import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MapaPage implements OnInit {

  private backButtonSubscription: Subscription = new Subscription();
  audioBtn: any;
  i: number = 0;
  place: string = "";
  places: string[] = ["Santa Anako Arku", "Santa Ana Eliza", "Kurutziaga Ikastola", "Landako Gune", "Durangoko Aratusteeta", "Surrandieta", "Ezkurdi plaza"];

  constructor(private router: Router, private route: ActivatedRoute, private platform: Platform) { }

  ngOnInit() {
    this.audioBtn = new Audio();
    this.audioBtn.src = '../../assets/aud/btn_handia.mp3';
    this.route.queryParams.subscribe(params => {
      this.i = params['i'];
    });
    this.place = this.places[this.i - 1];
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

  goBack() {
    /*
    switch (this.i) {
      case 1:
        this.router.navigate(['/dialog'], { queryParams: { i: 8 } });
        break;
      case 2:
        this.router.navigate(['/dialog'], { queryParams: { i: 24 } });
        break;
      case 3:
        this.router.navigate(['/dialog'], { queryParams: { i: 45 } });
        break;
      case 4:
        this.router.navigate(['/dialog'], { queryParams: { i: 62 } });
        break;
      case 5:
        this.router.navigate(['/dialog'], { queryParams: { i: 81 } });
        break;
      case 6:
        this.router.navigate(['/dialog'], { queryParams: { i: 102 } });
        break;
      case 7:
        this.router.navigate(['/dialog'], { queryParams: { i: 124 } });
        break;
      default:
        console.log(this.i);
    }*/
    if(this.i == 1) {
      this.router.navigate(['/dialog'], { queryParams: { i: 8 } });
    } else if(this.i == 2) {
      this.router.navigate(['/dialog'], { queryParams: { i: 24 } });
    } else if(this.i == 3) {
      this.router.navigate(['/dialog'], { queryParams: { i: 45 } });
    } else if(this.i == 4) {
      this.router.navigate(['/dialog'], { queryParams: { i: 62 } });
    } else if(this.i == 5) {
      this.router.navigate(['/dialog'], { queryParams: { i: 81 } });
    } else if(this.i == 6) {
      this.router.navigate(['/dialog'], { queryParams: { i: 102 } });
    } else if(this.i == 7) {
      this.router.navigate(['/dialog'], { queryParams: { i: 124 } });
    }
    this.backButtonSubscription.unsubscribe();
  }

}
