interface Database {
	sessionId: number;
	storage: StoredItem[];
	isOnline: boolean;
}

interface StoredItem {
	id: number;
	name: string;
	quantity: string;
}

interface Item {
	id: number;
	name: string;
	category: string;
	quantity: number;
	price: number;
	supplierName: string;
	status: string;
	isPopular: boolean;
	comment?: string;
}

// Using intersection types to ensure the following items have the type of 'Item'
interface Chair extends Item {
	material: string;
	colour: string;
	height: string;
	chairType: string;
}

interface Book extends Item {
	numberOfPages: number;
	author: string;
}

interface Laptop extends Item {
	batteryLife: number;
	screenSize: string | number;
}

interface HairDryer extends Item {
	dryingSpeeds: number;
	colour: string | number;
}

interface Bed extends Item {
	width: number;
	height: number;
	depth: number;
}
