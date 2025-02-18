import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-definition-modal',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './definition-modal.component.html',
})
export class DefinitionModalComponent {
  @Input() isOpen = false;
  @Input() definition: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
