import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../Button/button.component';
import { submitForm } from '../../helpers/submitForm';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-form',
  imports: [ButtonComponent, FormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  host: {
    style: 'width: 100%;',
  },
})
export class FormComponent {
  action: string = 'add';
  productName: string = '';
  productManufacturer: string = '';
  productQuantity: number = 0;
  message: string = '';
  isError: boolean = false;
  @Input() placeholders: Record<string, string> = {
    productName: '',
    productManufacturer: '',
    productQuantity: '',
  };

  handleSubmit() {
    const result = submitForm(
      this.productName,
      this.productQuantity,
      this.action,
    );

    if (result?.error) {
      this.message = result.error;
      this.isError = true;
    } else if (result?.success) {
      this.message = result.success;
      this.isError = false;
    }

    console.log(result);
  }
}
