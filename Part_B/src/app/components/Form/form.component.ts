import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../Button/button.component';
import { submitForm } from '../../helpers/submitForm';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { deleteProduct } from '../../helpers/deleteProduct';
import { updateItem } from '../../helpers/updateItem';
import { ProductNames } from '../../types/types';

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
  action: string = '';
  productName: ProductNames | null = null;
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
    if (!this.action) return;

    if (!this.productName) {
      this.isError = true;
      this.message = 'No product name provided!';
      return;
    }

    if (this.action === 'add') {
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
    } else if (this.action === 'remove') {
      const result = deleteProduct(this.productName);

      if (result?.error) {
        this.message = result.error;
        this.isError = true;
      }

      return;
    } else {
      updateItem(this.productName, {
        productName: this.productName,
        productQuantity: this.productQuantity,
      });
    }
  }
}
