import { Component } from '@angular/core';
import { CommuneListComponent } from './components/commune-list/commune-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommuneListComponent],
  templateUrl: './app.html',
})
export class AppComponent {}
