import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Commune } from '../../models/commune.model';

@Component({
  selector: 'app-commune-population',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commune-population.html',
})
export class CommunePopulationComponent implements OnInit {
  communes: Commune[] = [];

  intervals = [
    { label: 'Moins de 2 500 habitants', min: 0, max: 2499 },
    { label: 'Entre 2500 et 10 000 habitants', min: 2500, max: 10000 },
    { label: 'Supérieur à 10 000 habitants', min: 10001, max: Infinity },
  ];

  activeIntervalIndex = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCommunes().subscribe((data) => {
      this.communes = data;
    });
  }

  getCommunesForInterval(min: number, max: number): Commune[] {
    return this.communes.filter(
      (commune) => commune.Population >= min && commune.Population <= max
    );
  }

  setActiveTab(index: number): void {
    this.activeIntervalIndex = index;
  }
}
