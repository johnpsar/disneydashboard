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
  displayedCharacters: Character[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  nameAscending: boolean = false;
  showsAscending: boolean = true;
  gamesAscending: boolean = true;
  sortField: 'name' | 'shows' | 'games' = 'name';
  paginationOptions = [10, 20, 50, 100, 200, 500];
  limit = 50;
  currentPage = 1;
  isModalVisible = false;
  selectedCharacter: Character = new Character();
  constructor(private characterService: CharacterService) {}

  async ngOnInit() {
    this.loading = true;
    this.errorMessage = '';
    await this.characterService
      .getPaginatedCharacters(this.currentPage, this.limit)
      .then((response) => {
        console.log('response received', response);
        this.characters = response;
        this.loading = false;
      }),
      (error: any) => {
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      };
    this.onSortClick('name');
    this.displayedCharacters = this.characters;
    this.loading = false;
  }

  onSortClick(field: string) {
    switch (field) {
      case 'name': {
        this.sortField = 'name';
        this.nameAscending = !this.nameAscending;
        this.gamesAscending = true;
        this.showsAscending = true;
        let that = this;
        this.displayedCharacters.sort(function (a: Character, b: Character) {
          var keyA = a.name,
            keyB = b.name;
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
        this.displayedCharacters.sort(function (a: Character, b: Character) {
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
        this.displayedCharacters.sort(function (a: Character, b: Character) {
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
  onPrevClick() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.refetchData();
  }
  onNextClick() {
    if (this.currentPage * this.limit + this.limit < 7438) {
      this.currentPage++;
    }
    this.refetchData();
  }

  async refetchData() {
    this.loading = true;
    await this.characterService
      .getPaginatedCharacters(this.currentPage, this.limit)
      .then((response) => {
        console.log('response received', response);
        this.characters = response;
        this.loading = false;
      }),
      (error: any) => {
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      };
    this.onSortClick('name');
    this.displayedCharacters = this.characters;
    this.loading = false;
  }
  onSearch(event: any) {
    this.displayedCharacters = this.characters;
    this.displayedCharacters = this.displayedCharacters.filter((c) =>
      c.name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
  }
  onRowClick(index: number) {
    this.selectedCharacter = this.displayedCharacters[index];
    this.isModalVisible = true;
  }
}
