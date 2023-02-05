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
    console.log('PAGE ', page);
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
    //thelo an paro page 6 limit 10 na exo page 2 limit 10
    if (limit <= 50) {
      let temp = this.getCharacters(Math.ceil(limit / 50));
      let temp2 = await lastValueFrom(temp);
      characters = temp2.data;
      characters = characters.slice(
        (page * limit - limit) % 50,
        ((page * limit - limit) % 50) + limit
      );
      //special case limit 20 kai page 3 pou thelo teleftaia 10 protou page kai prota 10 deuterou page
      //todo
    } else {
      //50 is the # of results per page
      for (
        let i = (limit / 50) * page - limit / 50 + 1;
        i <= (limit / 50) * page;
        i++
      ) {
        console.log('mpika me i : ', i);
        let temp = this.getCharacters(i);
        let temp2 = await lastValueFrom(temp);
        characters.push = temp2.data;
      }
    }
    console.log('CHARACTERS', characters);
    return characters;
    // return this.http.get<Character[]>(this.url); //todo delete wrong
  }
}

//TODO
// TO API MOU DINEI 50 RESULTS ANA PAGE KAI EXEI STO TELOS NEXT PAGE GIA TA EPOMENA 50
// NA FTIAKSO FUNCTION POU NA PAIRNEI ME SOSTO PAGINATION
