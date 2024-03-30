<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Calculator as CalculatorIcon, Plus } from 'lucide-svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { type DisplaySettings, Trackable } from '$lib/settings';
	import Calculator from '$lib/components/Calculator.svelte';
	import { getTrackableLabel } from '$lib/utils';

	export let displaySettings: DisplaySettings;
	export let trackable: Trackable;

	export const clearAll = () => (value = 0);

	let value = 0;
	let open = false;
	let dispatch = createEventDispatcher<{
		addItem: { value: number; trackable: Trackable };
	}>();

	function addItem() {
		value = parseFloat(value);

		if (value <= 0) {
			toast.error('Value must be greater than 0');
			return;
		}
		if (isNaN(value)) {
			toast.error('Value must be a number');
			return;
		}
		dispatch('addItem', { value, trackable });
	}
	function updateValue(event: CustomEvent<number>) {
		value = event.detail;

		open = false;
	}
</script>

<div class="my-5">
	<Label>
		<div class="flex flex-row">
			<span class="my-auto mr-2 flex-1">{getTrackableLabel(displaySettings, trackable)}:</span>
			<Input type="number" bind:value class="mx-2 w-[30%]" />
			<Button on:click={addItem} class="mx-2">
				<Plus />
			</Button>
			<Dialog.Root bind:open>
				<Dialog.Trigger class="mx-2">
					<CalculatorIcon />
				</Dialog.Trigger>
				<Dialog.Content>
					<Calculator initialValue={value} on:updateValue={updateValue} />
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</Label>
</div>
