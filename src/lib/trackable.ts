import { PrimaryStat, type Resupply, statToTrackable } from '$lib/resupply';
import type { DisplaySettings } from '$lib/settings';

export const enum Trackable {
	energy = 'Energy',
	carbohydrates = 'Carbs',
	protein = 'Protein',
	fat = 'Fat'
}

export const iterableTrackables = [
	Trackable.energy,
	Trackable.protein,
	Trackable.carbohydrates,
	Trackable.fat
];

export function getPrimaryStatValue(
	resupply: Resupply,
	primaryStat: PrimaryStat,
	displaySettings: DisplaySettings
) {
	let total = resupply.things.length;
	if (primaryStat !== PrimaryStat.numItems) {
		const trackable = statToTrackable(primaryStat);
		total = resupply.things.reduce(
			(acc, thing) => acc + (thing[trackable] || 0) * thing.quantity,
			0
		);
	}

	switch (primaryStat) {
		case PrimaryStat.numItems:
			return `${total} items`;
		case PrimaryStat.totalEnergy:
			return `${total} ${displaySettings.energyUnit}`;
		case PrimaryStat.totalProtein:
		case PrimaryStat.totalFat:
		case PrimaryStat.totalCarbs:
			return `${total} mg`;
		case PrimaryStat.energyPerDay:
			if (resupply.daysToNextResupply === null) return 'Unknown number of days to next resupply';
			return `${total / resupply.daysToNextResupply} ${displaySettings.energyUnit}/day`;
		case PrimaryStat.proteinPerDay:
		case PrimaryStat.carbsPerDay:
		case PrimaryStat.fatPerDay:
			if (resupply.daysToNextResupply === null) return 'Unknown number of days to next resupply';
			return `${total / resupply.daysToNextResupply} mg/day`;
		case PrimaryStat.energyPerDistance:
			if (resupply.distanceToNextResupply === null) return 'Unknown distance to next resupply';
			return `${total / resupply.distanceToNextResupply} ${displaySettings.energyUnit}/${displaySettings.distanceUnit}`;
		case PrimaryStat.proteinPerDistance:
		case PrimaryStat.carbsPerDistance:
		case PrimaryStat.fatPerDistance:
			if (resupply.distanceToNextResupply === null) return 'Unknown distance to next resupply';
			return `${total / resupply.distanceToNextResupply} mg/${displaySettings.distanceUnit}`;
		default:
			console.error('Unknown primary stat: ', primaryStat);
	}
}
