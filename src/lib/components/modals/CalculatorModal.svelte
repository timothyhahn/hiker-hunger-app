<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { Divide, Equal, Minus, MoveLeft, Plus, X } from 'lucide-svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	// TODO: This isn't compatible with the new modal method atm.
	export let initialValue: number = 0;
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	interface Operation {
		type: 'add' | 'subtract' | 'multiply' | 'divide' | 'number';
		value: string | undefined; // This should be number, but makes it easier to work with
	}

	// The number we are adding up to/potentially submitting back to the parent
	let value: number;

	// A list of operations that have been performed
	let operations: Operation[] = [];

	function convertOperationToSymbol(operation: Operation) {
		switch (operation.type) {
			case 'add':
				return ' + ';
			case 'subtract':
				return ' - ';
			case 'multiply':
				return ' × ';
			case 'divide':
				return ' ÷ ';
			default:
				return operation.value;
		}
	}

	function toDisplayable(operations: Operation[]) {
		let builder = '';
		for (let operation of operations) {
			builder += convertOperationToSymbol(operation);
		}

		return builder;
	}

	function clearOperations() {
		operations = [{ type: 'number', value: '0' }];
	}

	function removeLastOperation() {
		if (operations.length <= 0) return;
		if (operations.length === 1) {
			operations = [{ type: 'number', value: '0' }];
			return;
		}
		let previousOperation = operations[operations.length - 1];
		if (previousOperation.type === 'number') {
			if (previousOperation.value === undefined) return;
			// If the number is more than one digit, remove the last digit, otherwise pop number
			if (previousOperation.value.length > 1) {
				previousOperation.value = previousOperation.value.slice(0, -1);
			} else {
				operations = operations.slice(0, -1);
			}
		} else {
			operations = operations.slice(0, -1);
		}
	}

	function submitOperation(operation: Operation) {
		if (operation.type === 'number') {
			// If previous operation was a number, append to number, otherwise add new number
			let previousOperation = operations[operations.length - 1];
			if (previousOperation.type === 'number') {
				previousOperation.value = (previousOperation.value || '') + operation.value;
				operations = [...operations];
			} else {
				operations = [...operations, operation];
			}
			return;
		} else {
			// If the previous operation was a number, collapse the values
			// Otherwise, replace the previous operation
			let previousOperation = operations[operations.length - 1];
			if (previousOperation.type === 'number') {
				value = collapseOperations();
				operations = [{ type: 'number', value: value.toString() }, operation];
				return;
			} else {
				operations = [...operations.slice(0, -1)];
			}
			return;
		}
	}

	function submitNumber(number: number) {
		let previousOperation = operations[operations.length - 1];
		if (number === 0) {
			// If the number is 0, and the previous operation was 0, don't add another 0
			if (previousOperation.type === 'number' && previousOperation.value === '0') return;
		}
		// If previous number was 0, replace it
		if (previousOperation.type === 'number' && previousOperation.value === '0') {
			previousOperation.value = number.toString();
			operations = [...operations];
			return;
		}

		submitOperation({ type: 'number', value: number.toString() });
	}

	function submitPeriod() {
		let previousOperation = operations[operations.length - 1];
		if (previousOperation.type === 'number' && previousOperation.value?.includes('.')) return;
		submitOperation({ type: 'number', value: '.' });
	}

	function submitEquals() {
		value = collapseOperations();
	}

	function collapseOperations(): number {
		let total = 0;
		let currentOperation = 'add';

		for (let i = 0; i < operations.length; i++) {
			let operation = operations[i];
			if (operation.type === 'number') {
				let operationValue = parseFloat(operation.value || '0');
				switch (currentOperation) {
					case 'add':
						total += operationValue;
						break;
					case 'subtract':
						total -= operationValue;
						break;
					case 'multiply':
						total *= operationValue;
						break;
					case 'divide':
						total /= operationValue;
						break;
				}
			} else {
				currentOperation = operation.type;
			}
		}
		return total;
	}

	function useValue() {
		if ($modalStore[0]) {
			$modalStore[0].response({ value: value });
			modalStore.close();
		}

		clearOperations();
	}

	// Set initial state
	operations = [{ type: 'number', value: initialValue.toString() }];

	$: displayOperations = toDisplayable(operations);
</script>

{#if $modalStore[0]}
	<div class="card w-full max-w-[360px] space-y-4 p-2 shadow-xl md:w-[440px] md:p-4">
		<div class="w-full">
			<div class="overflow-hidden p-5 pb-0 text-right text-3xl text-primary-500-400-token">
				{displayOperations}
			</div>
			<div class="p-5 text-right text-3xl text-gray-600">
				= <span class="text-primary-900-50-token">{value || 0}</span>
			</div>
			<div class="calculator-buttons">
				<button class="is-clear span-2 orange operator btn" on:click={clearOperations}>C</button>
				<button class="orange operator btn" on:click={removeLastOperation}>
					<MoveLeft />
				</button>
				<button class="orange operator btn" on:click={() => submitOperation({ type: 'divide' })}>
					<Divide />
				</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(7)}>7</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(8)}>8</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(9)}>9</button>
				<button class="orange operator btn" on:click={() => submitOperation({ type: 'multiply' })}>
					<X />
				</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(4)}>4</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(5)}>5</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(6)}>6</button>
				<button class="orange operator btn" on:click={() => submitOperation({ type: 'subtract' })}>
					<Minus />
				</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(1)}>1</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(2)}>2</button>
				<button class="btn dark:bg-gray-700" on:click={() => submitNumber(3)}>3</button>
				<button class="orange operator btn" on:click={() => submitOperation({ type: 'add' })}>
					<Plus />
				</button>
				<button class="span-2 btn dark:bg-gray-700" on:click={() => submitNumber(0)}>0</button>
				<button class="btn dark:bg-gray-700" on:click={submitPeriod}>.</button>
				<button class="orange operator btn" on:click={submitEquals}>
					<Equal />
				</button>
			</div>
		</div>
		<div class="py-3">
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<button class="btn {parent.buttonPositive}" on:click={useValue}>Use Value</button>
			</footer>
		</div>
	</div>
{/if}

<style>
	.calculator-buttons {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border: 0;
	}

	.btn {
		font-size: 1em;
		height: 65px;
		border: 1px solid black;
	}

	.btn:hover {
		background: #f1f1f1;
	}

	.orange {
		background-color: orange;
	}

	.span-2 {
		grid-column: span 2;
	}

	.operator {
		justify-content: center;
		display: flex;
		align-items: center;
	}
</style>
