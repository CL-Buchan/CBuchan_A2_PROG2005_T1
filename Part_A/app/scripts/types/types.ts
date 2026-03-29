export type Database = DatabaseItem[];

export interface DatabaseItem {
	sessionId: number;
	item: Product;
}

export interface StoredItem {
	id: number;
	name: string;
	quantity: string;
}

export interface Item {
	id: number;
	name: ProductNames;
	category: string;
	quantity: number;
	price: number;
	supplierName: string;
	status: string;
	isPopular: boolean;
	comment?: string;
}

// Using intersection types to ensure the following items have the type of 'Item'
export interface Chair extends Item {
	name: 'chair';
	material: string;
	colour: (string | number)[];
	height: string | number;
	chairType: string;
}

export interface Book extends Item {
	name: 'book';
	numberOfPages: number;
	author: string;
}

export interface Laptop extends Item {
	name: 'laptop';
	material: 'aluminium' | 'plastic';
	colour: string | number;
	batteryLife: string | number;
	screenSize: string | number;
}

export interface HairDryer extends Item {
	name: 'hair dryer';
	dryingSpeeds: number;
	colour: string | number;
}

export interface Bed extends Item {
	name: 'bed';
	width: number;
	height: number;
	depth: number;
}

export type ProductNames =
	| 'chair'
	| 'book'
	| 'laptop'
	| 'hair dryer'
	| 'bed';

export type Product =
	| Chair
	| Book
	| Laptop
	| HairDryer
	| Bed;
