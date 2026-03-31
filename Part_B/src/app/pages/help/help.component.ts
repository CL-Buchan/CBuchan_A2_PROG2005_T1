import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  host: {
    style: 'width: 100%;',
  },
})
export class HelpComponent {}
