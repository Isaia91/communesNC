import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapComponent } from '../map/map';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MapComponent],
  templateUrl: './home.html',
})
export class HomeComponent {}
