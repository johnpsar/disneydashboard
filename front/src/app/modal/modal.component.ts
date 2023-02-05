import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() character: Character = new Character();
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.show = false;
    this.close.emit();
  }
}
