import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.page.html',
  styleUrls: ['./template-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TemplatePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
