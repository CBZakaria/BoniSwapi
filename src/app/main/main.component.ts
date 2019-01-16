import {Component, OnInit} from '@angular/core';
import {SwapiServiceService} from '../swapi-service.service';
import {StarShip} from '../swapi-data/starShip';
import {People} from '../swapi-data/people';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  /**
   *  Pour sauvgarder tous les vaissaux
   */
  starShips: StarShip[] = null;
  /**
   * Url pour faire la recherche sur les vaisseaux
   */
  searchUrl = 'https://swapi.co/api/starships/?search=';
  /**
   * mots-clé (nom/modele)
   */
  query = '';

  found =  true;

  /**
   *
   * @param swApi service
   */
  constructor(private swApi: SwapiServiceService) {
  }


  ngOnInit() {
  }

  /**
   * Utiliser le service pour chercher tous les vaissaux et les stockers dans le tableaux starShips
   */
  getStarShips(): void {
    this.starShips = [];
    this.swApi.getStarships(`${this.searchUrl}${this.query}`).then((starShipsResponse: StarShip[]) => {
      console.log('starShip Response', this.starShips = starShipsResponse);
      this.starShips.forEach(starShip => {
        this.getPeoples(starShip);
      });
      if (this.starShips.length > 0) {
        this.found = true;
      } else {
        this.found = false;
      }
    });
  }

  /**
   * Pour chaque vaisseaux on récupérere les pilotes en utilisant l'url stocker dans le vaisseaux
   * @param starShip
   */
  getPeoples(starShip: StarShip): void {
    starShip.pilots.forEach(urlPilote => {
      this.swApi.getPeoples(urlPilote).then((peopleResponse: People) => {
        console.log('people response', peopleResponse);
        starShip.pilots.push(peopleResponse);
        starShip.pilots.shift();
      });
    });
  }
}
