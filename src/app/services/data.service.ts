import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commune } from '../models/commune.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'assets/communes.json';

  constructor(private http: HttpClient) {}

  getCommunes(): Observable<Commune[]> {
    return this.http.get<Commune[]>(this.url);
  }
}
