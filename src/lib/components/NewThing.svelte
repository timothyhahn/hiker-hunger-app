<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Thing } from '$lib/things';
	import { derived, type Writable, writable } from 'svelte/store';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { type DisplaySettings, Trackable } from '$lib/settings';

	import { Button } from '$lib/components/ui/button';
	import type { Resupply } from '$lib/resupply';
	import Calculator from '$lib/components/Calculator.svelte';
	import { CalculatorIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let displaySettings: DisplaySettings;
	export let resupply: Writable<Resupply>;

	let thingCount = derived(resupply, $resupply => $resupply.things.length);

	const DEFAULT_THING: Thing = {
		name: null,
		quantity: 1,
		energy: null,
		protein: null,
		carbohydrates: null,
		fat: null
	};

	let thing: Writable<Thing> = writable(structuredClone(DEFAULT_THING));

	let energyOpen = false;
	let proteinOpen = false;
	let carbohydratesOpen = false;
	let fatOpen = false;

	function updateValue(type: Trackable, value: number) {
		thing.update($thing => {
			switch (type) {
				case Trackable.energy:
					energyOpen = false;
					$thing.energy = value;
					break;
				case Trackable.protein:
					proteinOpen = false;
					$thing.protein = value;
					break;
				case Trackable.carbohydrates:
					carbohydratesOpen = false;
					$thing.carbohydrates = value;
					break;
				case Trackable.fat:
					fatOpen = false;
					$thing.fat = value;
					break;
			}
			return $thing;
		});
	}

	function addThing() {
		if (!$thing.name) {
			$thing.name = `Thing ${$thingCount}`;
		}
		// Some manual validation that will make the compiler angry, but comes from type=number converting to a string
		if (isNaN(parseInt($thing.quantity)) || $thing.quantity < 0) {
			toast.error('Quantity must be a positive number.');
			return;
		}

		console.log($thing.energy);
		if ($thing.energy && (isNaN(parseFloat($thing.energy)) || $thing.energy < 0) || $thing.energy === '') {
			toast.error('Energy must be a positive number.');
			return;
		}
		if ($thing.protein && (isNaN(parseFloat($thing.protein)) || $thing.protein < 0) || $thing.protein === '') {
			toast.error('Protein must be a positive number.');
			return;
		}
		if ($thing.carbohydrates && (isNaN(parseFloat($thing.carbohydrates)) || $thing.carbohydrates < 0) || $thing.carbohydrates === '') {
			toast.error('Carbohydrates must be a positive number.');
			return;
		}
		if ($thing.fat && (isNaN(parseFloat($thing.fat)) || $thing.fat < 0) || $thing.fat === '') {
			toast.error('Fat must be a positive number.');
			return;
		}

		if ($thing.quantity) {
			$thing.quantity = parseFloat($thing.quantity);
		}

		if ($thing.energy) {
			$thing.energy = parseFloat($thing.energy);
		}

		if ($thing.protein) {
			$thing.protein = parseFloat($thing.protein);
		}

		if ($thing.carbohydrates) {
			$thing.carbohydrates = parseFloat($thing.carbohydrates);
		}

		if ($thing.fat) {
			$thing.fat = parseFloat($thing.fat);
		}

		const thingName = $thing.name;
		thing.update($thing => {
			resupply.update($resupply => {
				$resupply.things.push($thing);
				return $resupply;
			});
			return structuredClone(DEFAULT_THING);
		});
		toast.info(`Added ${thingName} to your resupply.`);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addThing();
		}
	}
</script>

<Card.Root class="w-[320px] md:w-[480px] lg:w-[640px] mx-auto">
	<Card.Header>
		<Card.Title>Add Something To Your Resupply</Card.Title>
		<Card.Description>Choose what you want to track about each thing in the menu.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid w-full items-center gap-4">
			<div class="flex flex-col space-y-1.5">
				<Label for="name">Name</Label>
				<Input id="name" placeholder="Thing {$thingCount}" bind:value={$thing.name} />
			</div>
			<div class="flex flex-col space-y-1.5">
				<Label for="quantity">Quantity</Label>
				<Input id="quantity" bind:value={$thing.quantity} type="number" />
			</div>
			{#if $resupply[Trackable.energy]}
				<div class="flex flex-col space-y-1.5">
					<Label for="energy">{displaySettings.energyUnit}</Label>
					<div class="flex">
						<Input id="energy" bind:value={$thing.energy} class="flex-1" on:keypress={handleKeyPress} type="number" />
						<Dialog.Root bind:open={energyOpen}>
							<Dialog.Trigger class="mx-2">
								<CalculatorIcon />
							</Dialog.Trigger>
							<Dialog.Content>
								<Calculator initialValue={$thing.energy || 0}
														on:updateValue={(e) => updateValue(Trackable.energy, e.detail)} />
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			{/if}
			{#if $resupply[Trackable.protein]}
				<div class="flex flex-col space-y-1.5">
					<Label for="protein">Protein</Label>
					<div class="flex">
						<Input id="protein" bind:value={$thing.protein} class="flex-1" on:keypress={handleKeyPress} type="number" />
						<Dialog.Root bind:open={proteinOpen}>
							<Dialog.Trigger class="mx-2">
								<CalculatorIcon />
							</Dialog.Trigger>
							<Dialog.Content>
								<Calculator initialValue={$thing.protein || 0}
														on:updateValue={(e) => updateValue(Trackable.protein, e.detail)} />
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			{/if}
			{#if $resupply[Trackable.carbohydrates]}
				<div class="flex flex-col space-y-1.5">
					<Label for="carbohydrates">Carbohydrates</Label>
					<div class="flex">
						<Input id="carbohydrates" bind:value={$thing.carbohydrates} class="flex-1" on:keypress={handleKeyPress} type="number" />
						<Dialog.Root bind:open={carbohydratesOpen}>
							<Dialog.Trigger class="mx-2">
								<CalculatorIcon />
							</Dialog.Trigger>
							<Dialog.Content>
								<Calculator initialValue={$thing.carbohydrates || 0}
														on:updateValue={(e) => updateValue(Trackable.carbohydrates, e.detail)} />
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			{/if}
			{#if $resupply[Trackable.fat]}
				<div class="flex flex-col space-y-1.5">
					<Label for="fat">Fat</Label>
					<div class="flex">
						<Input id="fat" bind:value={$thing.fat} class="flex-1" on:keypress={handleKeyPress} type="number" />
						<Dialog.Root bind:open={fatOpen}>
							<Dialog.Trigger class="mx-2">
								<CalculatorIcon />
							</Dialog.Trigger>
							<Dialog.Content>
								<Calculator initialValue={$thing.fat || 0}
														on:updateValue={(e) => updateValue(Trackable.fat, e.detail)} />
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			{/if}
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button on:click={addThing}>Add</Button>
	</Card.Footer>
</Card.Root>