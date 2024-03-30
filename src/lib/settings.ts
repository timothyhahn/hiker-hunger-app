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

export enum Trackable {
	energy = 'Energy',
	carbohydrates = 'Carbohydrates',
	protein = 'Protein',
	fat = 'Fat'
}

// Settings at the "global" level, dealing with how units will be displayed.
// Doesn't actually effect usage, just display.
export interface DisplaySettings {
	distanceUnit: DistanceUnit;
	energyUnit: EnergyUnit;
}
