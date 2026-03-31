import { Component } from '@angular/core';
import { FormComponent } from '../../components/Form/form.component';
import { ButtonComponent } from '../../components/Button/button.component';

@Component({
  standalone: true,
  selector: 'app-manage',
  imports: [FormComponent, ButtonComponent],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  host: {
    style: 'width: 100%;',
  },
})
export class ManageComponent {
  isOpen = false;

  toggleModal() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }
}
