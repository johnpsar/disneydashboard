import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { observable } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  characters: Character[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.loading = true;
    this.errorMessage = '';
    this.characterService.getCharacters().subscribe((response) => {
      console.log('response received');
      this.characters = response.data;
      console.log(this.characters.length);
      this.loading = false;
    }),
      (error: any) => {
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      };
  }
}
