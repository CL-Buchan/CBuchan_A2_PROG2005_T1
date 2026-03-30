import { Component } from '@angular/core';
import { ButtonComponent } from '../Button/button.component';

@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ButtonComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {}
