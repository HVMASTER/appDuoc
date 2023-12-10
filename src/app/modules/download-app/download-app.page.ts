import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.page.html',
  styleUrls: ['./download-app.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DownloadAppPage implements OnInit {

  constructor(private router: Router) { }

  volverPresentation() {
    this.router.navigate(['/presentation']);
  }

  ngOnInit() {
  }

}
