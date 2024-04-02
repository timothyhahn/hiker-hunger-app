import { Trackable } from '$lib/trackable';
import type { Thing } from '$lib/things';
import { v4 as uuidv4 } from 'uuid';

export interface Resupply {
	id: string;
	name: string | null,
	[Trackable.energy]: boolean;
	[Trackable.carbohydrates]: boolean;
	[Trackable.protein]: boolean;
	[Trackable.fat]: boolean;
	things: Thing[];
	distanceToNextResupply: number | null;
	daysToNextResupply: number | null;
}

export function newResupply(): Resupply{
	return {
		id: uuidv4(),
		name: null,
		[Trackable.energy]: true,
		[Trackable.protein]: false,
		[Trackable.carbohydrates]: false,
		[Trackable.fat]: false,
		things: [],
		distanceToNextResupply: null,
		daysToNextResupply: null
	};
}

export enum PrimaryStat {
	numItems = 'Number of items in resupply',
	totalEnergy = 'Total energy',
	totalProtein = 'Total protein',
	totalCarbs = 'Total carbs',
	totalFat = 'Total fat',
	energyPerDay = 'Energy per day',
	proteinPerDay = 'Protein per day',
	carbsPerDay = 'Carbs per day',
	fatPerDay = 'Fat per day',
	energyPerDistance = 'Energy per distance',
	proteinPerDistance = 'Protein per distance',
	carbsPerDistance = 'Carbs per distance',
	fatPerDistance = 'Fat per distance'
}

export const statToTrackable = (stat: PrimaryStat): Trackable => {
	switch (stat) {
		case PrimaryStat.totalEnergy:
		case PrimaryStat.energyPerDay:
		case PrimaryStat.energyPerDistance:
			return Trackable.energy;
		case PrimaryStat.totalProtein:
		case PrimaryStat.proteinPerDay:
		case PrimaryStat.proteinPerDistance:
			return Trackable.protein;
		case PrimaryStat.totalCarbs:
		case PrimaryStat.carbsPerDay:
		case PrimaryStat.carbsPerDistance:
			return Trackable.carbohydrates;
		case PrimaryStat.totalFat:
		case PrimaryStat.fatPerDay:
		case PrimaryStat.fatPerDistance:
			return Trackable.fat;
		default:
			throw new Error(`Unknown primary stat: ${stat}`);
	}
};
