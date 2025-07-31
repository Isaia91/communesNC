import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../../services/data.service';
import { Commune } from '../../models/commune.model';

@Component({
  selector: 'app-chart-population',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './charts-population.html',
})
export class ChartPopulationComponent implements OnInit {
  communes: Commune[] = [];
  activeTabIndex = 0;

  populationChartPage = 0;
  populationPageSize = 10;


  // Données des 3 graphes
  barChartData: any;
  pieChartData: any;
  scatterChartData: any;
  chartOptions: any;
  densityChartData: any;


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCommunes().subscribe((data) => {
      this.communes = data;



      // Histogramme population
      this.barChartData = {
        labels: data.map(c => c.Nom),
        datasets: [
          {
            label: 'Population',
            backgroundColor: '#42A5F5',
            data: data.map(c => c.Population),
          },
        ],
      };

      // Camembert répartition par province
      const provinces = [...new Set(data.map(c => c.Province))];
      const provinceCounts = provinces.map(p => data.filter(c => c.Province === p).length);

      this.pieChartData = {
        labels: provinces,
        datasets: [
          {
            data: provinceCounts,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          },
        ],
      };

      // Histogramme des densités
      this.densityChartData = {
        labels: data.map(c => c.Nom),
        datasets: [
          {
            label: 'Densité (hab/km²)',
            backgroundColor: '#FF7043',
            data: data.map(c => parseFloat(c.DensitePopulation)),
          },
        ],
      };


      // Options communes
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#495057' },
          },
        },
        scales: {
          x: {
            ticks: { color: '#495057' },
            grid: { color: '#ebedef' },
            title: { display: true, text: 'Superficie (km²)' }
          },
          y: {
            ticks: { color: '#495057' },
            grid: { color: '#ebedef' },
            title: { display: true, text: 'Population' }
          },
        },
      };
    });
  }

  get paginatedPopulationData() {
    const start = this.populationChartPage * this.populationPageSize;
    const end = start + this.populationPageSize;
    const communesSlice = this.communes.slice(start, end);

    return {
      labels: communesSlice.map(c => c.Nom),
      datasets: [
        {
          label: 'Population',
          backgroundColor: '#42A5F5',
          data: communesSlice.map(c => c.Population),
        },
      ],
    };
  }

  nextPopulationPage() {
    const maxPage = Math.floor(this.communes.length / this.populationPageSize);
    if (this.populationChartPage < maxPage) {
      this.populationChartPage++;
    }
  }

  prevPopulationPage() {
    if (this.populationChartPage > 0) {
      this.populationChartPage--;
    }
  }


  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  densityChartPage = 0;
  densityPageSize = 10;

  get paginatedDensityData() {
    const start = this.densityChartPage * this.densityPageSize;
    const end = start + this.densityPageSize;
    const communesSlice = this.communes.slice(start, end);

    return {
      labels: communesSlice.map(c => c.Nom),
      datasets: [
        {
          label: 'Densité (hab/km²)',
          backgroundColor: '#FF7043',
          data: communesSlice.map(c => parseFloat(c.DensitePopulation)),
        },
      ],
    };
  }

  nextDensityPage() {
    const maxPage = Math.floor(this.communes.length / this.densityPageSize);
    if (this.densityChartPage < maxPage) {
      this.densityChartPage++;
    }
  }

  prevDensityPage() {
    if (this.densityChartPage > 0) {
      this.densityChartPage--;
    }
  }

}
