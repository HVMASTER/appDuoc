import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['./presentation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PresentationPage implements OnInit {

  constructor(private router: Router) { }

  isMobile(): boolean {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  abrirDownloadApp() {
    if (this.isMobile()) {
      console.log("Es un dispositivo móvil");
      window.location.href = "https://drive.google.com/drive/u/1/folders/1i1SZ7MfA3F7ZlWUxuRC4TbiAuQT9ANb3"; 
    } else {
      this.router.navigate(['/download-app']);
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
