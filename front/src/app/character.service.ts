import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Character } from './character';

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
    return this.http.get<Character[]>(`${this.url}`, { params });
  }
  getPaginatedCharacters(page: number, limit: number): Observable<any> {
    let characters: Character[] = [];
    if (limit <= 50) {
      this.getCharacters(page).subscribe((response) => {
        console.log('response received');
        characters = response.data;
      }),
        (error: any) => {
          console.error('Request failed with error');
        };
      characters = characters.slice(page * limit - limit, page * limit);
    } else {
      //50 is the # of results per page
      //thelo an exo page 2 limit 100 to for loop na einai apo 3 eos 4
      //thelo an exo page 3 limit 100 to for loop na einai apo 5 eos 6
      //thelo an exo page 4 limit 100 to for loop na einai apo 7 eos 8
      //thelo an exo page 2 limit 200 to for loop na einai apo 5 eos 8
      //thelo an exo page 3 limit 200 to for loop na einai apo 9 eos 12
      //thelo an exo page 4 limit 200 to for loop na einai apo 13 eos 16
      for (
        let i = (limit / 50) * page - limit / 50 + 1;
        (limit / 50) * page;
        i++
      ) {
        this.getCharacters(i).subscribe((response) => {
          console.log('response received');
          characters.push(response.data);
        }),
          (error: any) => {
            console.error('Request failed with error');
          };
      }
    }
    return of(characters);
  }
}

//TODO
// TO API MOU DINEI 50 RESULTS ANA PAGE KAI EXEI STO TELOS NEXT PAGE GIA TA EPOMENA 50
// NA FTIAKSO FUNCTION POU NA PAIRNEI ME SOSTO PAGINATION
