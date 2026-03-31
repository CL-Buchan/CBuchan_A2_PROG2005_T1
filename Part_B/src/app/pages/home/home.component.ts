import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    style: 'width: 100%;',
  },
})
export class HomeComponent {}
