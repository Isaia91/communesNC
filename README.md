# Disponible sur netlify

https://communesnc.netlify.app/

# Objectif

Ce projet Angular charge dynamiquement les données des **communes de Nouvelle-Calédonie** (nom, population, densité, coordonnées, etc.) depuis un fichier JSON grâce à un service Angular dédié (`DataService`).\
Ces données sont ensuite exploitées dans différents composants (ex. `ChartPopulationComponent`, `MapComponent`) pour générer des graphiques, des cartes interactives, etc.

---

# Structure du fichier JSON

Le fichier JSON contient un tableau d'objets, chacun représentant une commune avec les propriétés suivantes :

```json
[
  {
    "Nom": "Touho",
    "CodeInsee": 98830,
    "CodePostal": 98831,
    "Population": 2087,
    "Superficie": "289.57",
    "DensitePopulation": "7.21",
    "Coordonnees": "-20.688440,164.945610",
    "Province": "Nord"
  }
]
```

---

# Localisation du fichier JSON

Le fichier JSON est situé à l'emplacement suivant :

```
src/assets/data/communes.json
```

---

# Utilisation du service `DataService`

Le service `DataService` utilise `HttpClient` pour effectuer une requête HTTP GET vers le fichier JSON et retourne un `Observable<Commune[]>`.

### Exemple :

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commune } from '../models/commune.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dataUrl = 'assets/data/communes.json';

  constructor(private http: HttpClient) {}

  getCommunes(): Observable<Commune[]> {
    return this.http.get<Commune[]>(this.dataUrl);
  }
}
```

---

# Modèle `Commune`

Le modèle `Commune` est utilisé pour typer les objets chargés depuis le JSON.

```ts
export interface Commune {
  Nom: string;
  CodeInsee: number;
  CodePostal: number;
  Population: number;
  Superficie: string;
  DensitePopulation: string;
  Coordonnees: string;
  Province: string;
}
```

---

# Exemple d'utilisation dans un composant

```ts
this.dataService.getCommunes().subscribe((data) => {
  this.communes = data;

  // Données utilisées pour les graphiques, les cartes, etc.
});
```

---

# Prérequis techniques

- Le module `HttpClientModule` doit être importé dans  `AppModule` ou un composant standalone :

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule, ...],
})
export class AppModule {}
```

