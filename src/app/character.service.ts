import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Character } from './character';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private url = 'https://api.disneyapi.dev/characters';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //getCharacters Returns 50 first characters sorted by name
  getCharacters(page: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    return this.http
      .get<Character[]>(`${this.url}`, { params })
      .pipe(map((response) => response));
  }

  async getPaginatedCharacters(
    page: number,
    limit: number
  ): Promise<Character[]> {
    let characters: Character[] = [];
    if (limit <= 50) {
      let temp = this.getCharacters(Math.ceil((limit * page) / 50));
      let temp2 = await lastValueFrom(temp);
      characters = temp2.data;
      //special case limit 20 kai page 3 pou thelo teleftaia 10 protou page kai prota 10 deuterou page
      if (((page * limit - limit) % 50) + limit > 50) {
        let temp = this.getCharacters(Math.ceil(limit / 50) + 1);
        let temp2 = await lastValueFrom(temp);
        characters = characters.concat(temp2.data);
      }
      characters = characters.slice(
        (page * limit - limit) % 50,
        ((page * limit - limit) % 50) + limit
      );
    } else {
      //50 is the # of results per page
      for (
        let i = (limit / 50) * page - limit / 50 + 1;
        i <= (limit / 50) * page;
        i++
      ) {
        let temp = this.getCharacters(i);
        let temp2 = await lastValueFrom(temp);
        characters = characters.concat(temp2.data);
      }
    }
    return characters;
    // return this.http.get<Character[]>(this.url); //todo delete wrong
  }
}

//TODO
// TO API MOU DINEI 50 RESULTS ANA PAGE KAI EXEI STO TELOS NEXT PAGE GIA TA EPOMENA 50
// NA FTIAKSO FUNCTION POU NA PAIRNEI ME SOSTO PAGINATION
