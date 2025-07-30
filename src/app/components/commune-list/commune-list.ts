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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCommunes().subscribe((data) => {
      this.communes = data;
    });
  }
}
