import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() buttonType: string = '';
  @Input() width: number = 0;

  convertWidth() {
    return this.width ? `${this.width}%` : '100%';
  }
}