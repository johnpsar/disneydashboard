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
  nameAscending: boolean = true;
  showsAscending: boolean = true;
  gamesAscending: boolean = true;
  sortField: 'name' | 'shows' | 'games' = 'name';
  paginationOptions = [10, 20, 50, 100, 200, 500];
  selectedPaginationCount = 50;
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

  onSortClick(field: string) {
    switch (field) {
      case 'name': {
        this.sortField = 'name';
        this.nameAscending = !this.nameAscending;
        this.gamesAscending = true;
        this.showsAscending = true;
        let that = this;
        this.characters.sort(function (a: Character, b: Character) {
          var keyA = a.name,
            keyB = b.name;
          console.log(keyA, keyB);
          if (that.nameAscending) {
            if (keyA < keyB) return -1;
            if (keyA >= keyB) return 1;
          } else {
            if (keyA < keyB) return 1;
            if (keyA >= keyB) return -1;
          }
          return 0;
        });
        break;
      }
      case 'shows': {
        this.sortField = 'shows';
        this.showsAscending = !this.showsAscending;
        this.nameAscending = true;
        this.gamesAscending = true;
        let that = this;
        this.characters.sort(function (a: Character, b: Character) {
          var keyA = a.tvShows.length,
            keyB = b.tvShows.length;
          if (that.showsAscending) {
            if (keyA < keyB) return -1;
            if (keyA >= keyB) return 1;
          } else {
            if (keyA < keyB) return 1;
            if (keyA >= keyB) return -1;
          }
          return 0;
        });
        break;
      }
      case 'games': {
        this.sortField = 'games';
        this.gamesAscending = !this.gamesAscending;
        this.nameAscending = true;
        this.showsAscending = true;
        let that = this;
        this.characters.sort(function (a: Character, b: Character) {
          var keyA = a.videoGames.length,
            keyB = b.videoGames.length;
          if (that.gamesAscending) {
            if (keyA < keyB) return -1;
            if (keyA >= keyB) return 1;
          } else {
            if (keyA < keyB) return 1;
            if (keyA >= keyB) return -1;
          }
          return 0;
        });
        break;
      }
    }
  }
}
