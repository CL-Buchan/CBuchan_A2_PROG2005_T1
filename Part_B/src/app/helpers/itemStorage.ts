import { Database, Product, ProductNames } from "../types/types";
import { generateId } from "./generateId";


export const productList: ProductNames[] = [
  'chair',
  'book',
  'laptop',
  'hair dryer',
  'bed',
];

export const avaliableProducts: Product[] = [
  {
    id: generateId(),
    name: 'chair',
    category: 'furnitue',
    quantity: 0,
    price: 200,
    supplierName: 'Furniture & Goods',
    status: 'available',
    isPopular: false,
    material: 'leather',
    colour: ['black', 'white'],
    height: '1 meter',
    chairType: 'bar stool',
  },
  {
    id: generateId(),
    name: 'book',
    category: 'book',
    quantity: 0,
    price: 20,
    supplierName: 'Penguin Books',
    status: 'available',
    isPopular: true,
    numberOfPages: 200,
    author: 'R L Stine',
  },
  {
    id: generateId(),
    name: 'laptop',
    category: 'technology',
    quantity: 0,
    price: 1000,
    supplierName: 'Apple',
    status: 'available',
    isPopular: true,
    material: 'aluminium',
    colour: 'silver',
    batteryLife: '40 hours',
    screenSize: '14 inch',
  },
  {
    id: generateId(),
    name: 'hair dryer',
    category: 'furnitue',
    quantity: 0,
    price: 200,
    supplierName: 'JB HI FI',
    status: 'available',
    isPopular: false,
    dryingSpeeds: 3,
    colour: 'black',
  },
  {
    id: generateId(),
    name: 'bed',
    category: 'furnitue',
    quantity: 0,
    price: 200,
    supplierName: 'Furniture & Goods',
    status: 'available',
    isPopular: true,
    width: 2,
    height: 1.5,
    depth: 2.5,
  },
];

export const database: Database = [];
