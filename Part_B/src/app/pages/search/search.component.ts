import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../components/Button/button.component';
import { database, productList } from '../../services/itemStorage.service';
import { Database, DatabaseItem, Product } from '../../types/types';
import { getDatabaseProducts } from '../../helpers/getDatabaseProducts';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [ButtonComponent, FormsModule, NgIf],
  host: {
    style: 'width: 100%;',
  },
})
export class SearchComponent {
  @ViewChild('databaseRef') databaseContainer!: ElementRef;
  @ViewChild('searchRef') searchButton!: ElementRef;
  @ViewChild('filterRef') filterButton!: ElementRef;
  @Input() productSearchedName: string = '';
  selectValue: string = '';
  database: Database = database;
  isOpen: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';
  searchClicked: boolean = false;
  filterClicked: boolean = false;
  searchResult: DatabaseItem | null = null;
  filterResult: DatabaseItem[] = [];
  isTogglingFilters: boolean = false;
  isFiltersOn: boolean = false;

  // Check DOM is ready and or loaded before initialising listener
  ngAfterViewInit(): void {
    window.addEventListener('click', this.onWindowClick);
  }

  // Remove/cleanup event listener when DOM is not using component
  ngOnDestroy(): void {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = (e: MouseEvent) => {
    const target = e.target as Node;

    if (this.isOpen) {
      // Returns a boolean for if a click occurs outside of the target modal div
      const clickedOutside =
        !this.databaseContainer?.nativeElement?.contains(target);

      if (clickedOutside && this.isOpen) {
        this.toggleModal();
      }
    }

    return;
  };

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  searchDatabase() {
    console.log(this.selectValue);
    console.log(
      'added to window local storage:',
      JSON.parse(window.localStorage.getItem('stored items') || ''),
    );

    if (!this.database)
      return (this.errorMsg = 'Database was not found or is undefined.');

    if (this.isTogglingFilters && this.selectValue != '') {
      this.successMsg = 'Filters are being applied!';
      if (this.selectValue === 'ascending') {
        this.filterResult = getDatabaseProducts().data.sort(
          (a: DatabaseItem, b: DatabaseItem) =>
            a.item.name.localeCompare(a.item.name),
        );
      } else if (this.selectValue === 'descending') {
        this.filterResult = getDatabaseProducts().data.sort(
          (a: DatabaseItem, b: DatabaseItem) =>
            b.item.name.localeCompare(a.item.name),
        );
      } else {
        this.filterResult = getDatabaseProducts().data.filter(
          (product) => product.item.isPopular === true,
        );
      }
    }

    // Get product from database
    const foundItem = this.database.find(
      (product) => product.item?.name === this.productSearchedName,
    );

    if (!foundItem && !window.localStorage.getItem('stored items')) {
      return (this.errorMsg = 'No product or products in the database.');
    }

    if (foundItem)
      return {
        data: foundItem,
      };

    const result: Database | DatabaseItem = getDatabaseProducts().data;

    if (!result)
      return (this.errorMsg = 'No product or products in the database.');

    const matchedProduct = result.find(
      (product) => product.item.name === this.productSearchedName,
    );

    // To assist with testing
    console.log('Matched product:', matchedProduct);

    if (!matchedProduct)
      this.errorMsg =
        '(HINT: I like playing games... console?) Product was not matched, please try again!';

    this.successMsg = `Success! ${matchedProduct?.item.name} was found!`;

    // Update search result if matched product exists
    matchedProduct ? (this.searchResult = matchedProduct) : '';

    console.log('finished submitting');
    return {
      data: matchedProduct,
    };
  }

  toggleFilters() {
    // Toggles the opposite of what the current value is
    this.isTogglingFilters = !this.isTogglingFilters;

    if ((this.isTogglingFilters = true)) {
      this.isFiltersOn = true;
    }

    this.isFiltersOn = false;
  }

  getProducts() {
    return getDatabaseProducts();
  }
}
