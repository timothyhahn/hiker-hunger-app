import { Trackable } from './settings';
import type { Thing } from '$lib/things';

export interface Resupply {
	[Trackable.energy]: boolean;
	[Trackable.carbohydrates]: boolean;
	[Trackable.protein]: boolean;
	[Trackable.fat]: boolean;
	things: Thing[];
	distanceToNextResupply: number | null;
	daysToNextResupply: number | null;
}

export enum PrimaryStat {
	numItems = 'Number of items in resupply',
	totalCalories = 'Total energy',
	totalProtein = 'Total protein',
	totalCarbs = 'Total carbs',
	totalFat = 'Total fat',
	caloriesPerDay = 'Energy per day',
	proteinPerDay = 'Protein per day',
	carbsPerDay = 'Carbs per day',
	fatPerDay = 'Fat per day',
	caloriesPerMile = 'Energy per mile',
	proteinPerMile = 'Protein per mile',
	carbsPerMile = 'Carbs per mile',
	fatPerMile = 'Fat per mile'
}
