import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Commune } from '../../models/commune.model';

@Component({
  selector: 'app-commune-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commune-list.html',
})
export class CommuneListComponent implements OnInit {
  communes: Commune[] = [];
  provinces: string[] = [];
  activeProvince: string = '';
  communeCountByProvince: { [province: string]: number } = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCommunes().subscribe((data) => {
      this.communes = data;

      // Récupération des provinces uniques
      this.provinces = [...new Set(data.map((c) => c.Province))];

      // Comptage des communes par province
      this.communeCountByProvince = this.provinces.reduce((acc, province) => {
        acc[province] = data.filter(c => c.Province === province).length;
        return acc;
      }, {} as { [province: string]: number });

      // Définir la première province active par défaut
      this.activeProvince = this.provinces[0];
    });
  }

  getCommunesByProvince(province: string): Commune[] {
    return this.communes.filter(c => c.Province === province);
  }

  setActiveProvince(province: string): void {
    this.activeProvince = province;
  }

}
