import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormComponent } from '../../components/Form/form.component';
import { ButtonComponent } from '../../components/Button/button.component';
import { database } from '../../services/itemStorage.service';
import { getItems } from '../../helpers/getItems';
import { getDatabaseProducts } from '../../helpers/getDatabaseProducts';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-manage',
  imports: [FormComponent, ButtonComponent, NgIf],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  host: {
    style: 'width: 100%;',
  },
})
export class ManageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('databaseRef') databaseContainer!: ElementRef;
  database = database;
  availableItems = getItems().data;
  isOpen = false;
  successMsg: string = '';
  errorMsg: string = '';

  // Check DOM is ready and or loaded before initialising listener
  ngAfterViewInit(): void {
    window.addEventListener('click', this.onWindowClick);
  }

  // Remove/cleanup event listener when DOM is not using component
  ngOnDestroy(): void {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = (e: MouseEvent) => {
    if (!this.databaseContainer) return;

    const clickedOutside = !this.databaseContainer.nativeElement.contains(
      e.target as Node,
    );

    if (clickedOutside && this.isOpen) {
      this.toggleModal();
    }
  };

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  getProducts() {
    return getDatabaseProducts();
  }
}
