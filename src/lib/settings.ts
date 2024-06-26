import { PrimaryStat } from '$lib/resupply';

export enum DistanceUnit {
	mi = 'Miles',
	km = 'Kilometers'
}

export const DistanceUnitIterable = Object.values(DistanceUnit);

export enum EnergyUnit {
	kcal = 'Calories (Kcal)',
	kilojoules = 'Kilojoules'
}

export const EnergyUnitIterable = Object.values(EnergyUnit);

// Settings at the "global" level, dealing with how units will be displayed.
// Doesn't actually effect usage, just display.
export interface DisplaySettings {
	distanceUnit: DistanceUnit;
	energyUnit: EnergyUnit;
	primaryStat: PrimaryStat;
}

export const DEFAULT_DISPLAY_SETTINGS: DisplaySettings = {
	distanceUnit: DistanceUnit.mi,
	energyUnit: EnergyUnit.kcal,
	primaryStat: PrimaryStat.totalEnergy
};