import type { Resupply } from '$lib/resupply';

export const CURRENT_KEY = 'current';

export abstract class Persistence {
	abstract saveResupply(id: string, resupply: Resupply): void;

	abstract loadResupply(id: string): Resupply;

	abstract listResupplies(): Resupply[];

	abstract deleteResupply(id: string): void;
}

export class LocalStoragePersistence extends Persistence {
	saveResupply(id: string, resupply: Resupply) {
		localStorage.setItem(`resupply-${id}`, JSON.stringify(resupply));
	}

	loadResupply(id: string): Resupply {
		const resupply = localStorage.getItem(`resupply-${id}`);
		if (resupply === null) throw new Error(`No resupply with id ${id}`);
		return JSON.parse(resupply);
	}

	listResupplies(): Resupply[] {
		return Object.entries(localStorage)
			.filter(([key]) => key.startsWith(`resupply-`))
			.filter(([key]) => key !== `resupply-${CURRENT_KEY}`)
			.map(([_, value]) => JSON.parse(value));
	}

	deleteResupply(id: string) {
		localStorage.removeItem(`resupply-${id}`);
	}
}