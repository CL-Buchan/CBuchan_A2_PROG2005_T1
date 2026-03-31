import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/Button/button.component';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [ButtonComponent],
  host: {
    style: 'width: 100%;',
  },
})
export class SearchComponent {}
