<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Divide, Equal, Minus, MoveLeft, Plus, X } from 'lucide-svelte';

	export let initialValue: number;

	interface Operation {
		type: 'add' | 'subtract' | 'multiply' | 'divide' | 'number';
		value: string | undefined; // This should be number, but makes it easier to work with
	}

	// The number we are adding up to/potentially submitting back to the parent
	let value: number;

	// A list of operations that have been performed
	let operations: Operation[] = [];

	const dispatch = createEventDispatcher<{
		updateValue: number;
	}>();

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
		dispatch('updateValue', value);
		clearOperations();
	}
	// Set initial state
	operations = [{ type: 'number', value: initialValue.toString() }];

	$: displayOperations = toDisplayable(operations);
</script>

<div>
	<div class="w-full">
		<div class="overflow-hidden p-5 pb-0 text-right text-3xl text-gray-500">
			{displayOperations}
		</div>
		<div class="p-5 text-right text-3xl text-gray-600">
			= <span class="text-gray-900 dark:text-gray-300">{value || 0}</span>
		</div>
		<div class="calculator-buttons">
			<button class="btn is-clear span-2 orange operator" on:click={clearOperations}>C</button>
			<button class="btn orange operator" on:click={removeLastOperation}>
				<MoveLeft />
			</button>
			<button class="btn orange operator" on:click={() => submitOperation({ type: 'divide' })}>
				<Divide />
			</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(7)}>7</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(8)}>8</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(9)}>9</button>
			<button class="btn orange operator" on:click={() => submitOperation({ type: 'multiply' })}>
				<X />
			</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(4)}>4</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(5)}>5</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(6)}>6</button>
			<button class="btn orange operator" on:click={() => submitOperation({ type: 'subtract' })}>
				<Minus />
			</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(1)}>1</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(2)}>2</button>
			<button class="btn dark:bg-gray-700" on:click={() => submitNumber(3)}>3</button>
			<button class="btn orange operator" on:click={() => submitOperation({ type: 'add' })}>
				<Plus />
			</button>
			<button class="btn span-2 dark:bg-gray-700" on:click={() => submitNumber(0)}>0</button>
			<button class="btn dark:bg-gray-700" on:click={submitPeriod}>.</button>
			<button class="btn orange operator" on:click={submitEquals}>
				<Equal />
			</button>
		</div>
	</div>
	<div class="py-3">
		<Button on:click={useValue}>Use Value</Button>
	</div>
</div>

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
