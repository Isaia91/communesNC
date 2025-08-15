import { Component, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Commune } from '../../models/commune.model';
import { take } from 'rxjs';

//import 'leaflet/dist/leaflet.css';

// Correction des chemins d'icônes (Angular ne les trouve pas tout seul)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/images/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/images/leaflet/marker-icon.png',
  shadowUrl: 'assets/images/leaflet/marker-shadow.png',
});

@Component({
  standalone: true,
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class MapComponent implements AfterViewInit {
  private dataService = inject(DataService);

  ngAfterViewInit(): void {
    const map = L.map('map');
    const bounds = L.latLngBounds([]);

    // Fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Récupération des données JSON
    this.dataService.getCommunes().pipe(take(1)).subscribe((communes: Commune[]) => {
      communes.forEach((commune) => {
        if (!commune.Coordonnees) return;

        const [lat, lng] = commune.Coordonnees.split(',').map(parseFloat);
        const marker = L.marker([lat, lng]).addTo(map)
          .bindPopup(`<b>${commune.Nom}</b><br>Population : ${commune.Population}`);

        bounds.extend(marker.getLatLng());
      });

      // Zoom automatique sur tous les points
      map.fitBounds(bounds);
    });
  }
}
