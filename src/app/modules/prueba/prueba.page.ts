import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Alumno, DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [HttpClientModule]
})
export class PruebaPage implements OnInit {

  alumno: Alumno[] = [];

  constructor(private dataService: DataService, private http: HttpClient) { 
    
  }

  ngOnInit() {
    this.dataService.getAlumnos().subscribe( res => {
      this.alumno = [...res];
    })
  }
}


