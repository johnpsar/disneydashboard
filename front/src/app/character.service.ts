import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getCharacters(): Observable<any> {
    return this.http.get<Character[]>(this.url);
  }
  getPaginatedCharacters(page: number, limit: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.url}`, { params });
  }
}

//TODO
// TO API MOU DINEI 50 RESULTS ANA PAGE KAI EXEI STO TELOS NEXT PAGE GIA TA EPOMENA 50
// NA FTIAKSO FUNCTION POU NA PAIRNEI ME SOSTO PAGINATION
