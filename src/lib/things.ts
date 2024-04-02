import { Trackable } from '$lib/trackable';
import { v4 as uuidv4 } from 'uuid';

export enum Category {
	breakfast = 'Breakfast',
	lunch = 'Lunch',
	dinner = 'Dinner',
	snack = 'Snack',
	other = 'Other'
}

export interface Thing {
	id: string;
	name: string | null;
	[Trackable.energy]: number | null;
	[Trackable.protein]: number | null;
	[Trackable.carbohydrates]: number | null;
	[Trackable.fat]: number | null;
	quantity: number;
	category: Category | null;
}

export function newThing() {
	return {
		id: uuidv4(),
		name: null,
		quantity: 1,
		[Trackable.energy]: null,
		[Trackable.protein]: null,
		[Trackable.carbohydrates]: null,
		[Trackable.fat]: null,
		category: null
	};
}