import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getCharacters(): Observable<any> {
    return this.http.get<Character[]>(this.url);
  }
}

//TODO
// TO API MOU DINEI 50 RESULTS ANA PAGE KAI EXEI STO TELOS NEXT PAGE GIA TA EPOMENA 50
// NA FTIAKSO FUNCTION POU NA PAIRNEI ME SOSTO PAGINATION
