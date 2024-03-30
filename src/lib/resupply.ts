import { type Trackable } from './settings';

export interface Resupply {
	totals: Record<Trackable, number>;
	tracked: Set<Trackable>;
	distanceToNextResupply: number | null;
	daysToNextResupply: number | null;
}
