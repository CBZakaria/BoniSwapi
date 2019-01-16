import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {async} from 'rxjs/internal/scheduler/async';
import {StarShip, StarShipsResponse} from './swapi-data/starShip';
import {People} from './swapi-data/people';


@Injectable({
  providedIn: 'root'
})
export class SwapiServiceService {

  /**
   * Stocker la réponse de la requete env
   */
  private starShipsResponse: StarShip[];

  constructor(private _http: HttpClient) {
  }

  async get<T>(url: string): Promise<HttpResponse<T>> {
    return this._http.get<T>(url, {observe: 'response'}).toPromise();
  }

  /**
   * Recuperer les vaisseaux en interogant l'api SWAPI
   * @param url
   */
  async getStarships(url: string): Promise<StarShip[]> {
    this.starShipsResponse = [];
    let rest = await this.get<StarShipsResponse>(url);
    rest.body.results.forEach((starship) => {
      this.starShipsResponse.push(starship);
    });
    while (rest.body.next) {
      rest = await this.get<StarShipsResponse>(rest.body.next);
      rest.body.results.forEach((starship) => {
        this.starShipsResponse.push(starship);
      });
    }
    return this.starShipsResponse;
  }

  /**
   * Recuperer le pilote en interogant l'api SWAPI
   * @param url
   */
  async getPeoples(url: string): Promise<People> {
    const res = await this.get<People>(url);
    return res.body;
  }

}




