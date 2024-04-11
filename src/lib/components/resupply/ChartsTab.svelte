<script lang="ts">
	import { ArcElement, Chart, Colors, DoughnutController, Legend, Tooltip } from 'chart.js';
	import { onMount } from 'svelte';
	import { resupplyStore as resupply } from '$lib/stores';
	import { iterableTrackables, Trackable } from '$lib/trackable';
	import type { Category } from '$lib/things';

	export const CHART_COLORS = {
		red: 'rgb(255, 99, 132)',
		orange: 'rgb(255, 159, 64)',
		yellow: 'rgb(255, 205, 86)',
		green: 'rgb(75, 192, 192)',
		blue: 'rgb(54, 162, 235)',
		purple: 'rgb(153, 102, 255)',
		grey: 'rgb(201, 203, 207)'
	};

	onMount(() => {
		Chart.register(
			ArcElement,
			Colors,
			DoughnutController,
			Legend,
			Tooltip,
		);
	});

	interface PerMealChart {
		trackable: Trackable,
		canvasElement: HTMLCanvasElement,
		categoryToCount: Map<Category, number>,
	}

	onMount(() => {
		resupply.subscribe((resupply) => {
			const perMealCharts: PerMealChart[] = [];
			iterableTrackables.forEach((trackable) => {
				if (resupply[trackable]) {
					const canvasElement = document.getElementById(`${trackable}-per-meal-chart`) as HTMLCanvasElement;
					// Build a count of each category
					const categoryToCount = new Map<Category, number>();
					resupply.things.forEach((thing) => {
						const category = thing.category;
						if (category) {
							const count = categoryToCount.get(category) ?? 0;
							categoryToCount.set(category, count + (thing.quantity * thing[trackable]));
						}
					});
					perMealCharts.push({ trackable, canvasElement, categoryToCount });
				}
			});
			perMealCharts.forEach(({ trackable, canvasElement, categoryToCount }) => {
				// Re-create the canvas, in case things have been updated
				if (!canvasElement) return;
				const parentElement = canvasElement.parentElement;
				if (!parentElement) return;
				const canvasId = canvasElement.id;
				parentElement.removeChild(canvasElement);
				const newCanvasElement = document.createElement('canvas');
				newCanvasElement.id = canvasId;
				parentElement.appendChild(newCanvasElement);
				newCanvasElement.classList.add('max-h-[300px]');
				const data = {
					labels: Array.from(categoryToCount.keys()),
					datasets: [
						{
							label: trackable,
							data: Array.from(categoryToCount.values()),
							backgroundColor: Object.values(CHART_COLORS)
						}
					]
				};
				const config = {
					type: 'doughnut',
					data,
					options: {
						plugins: {
							legend: {
								position: 'top'
							},
							title: {
								display: true,
								text: `${trackable} per meal`
							},
							tooltip: {
								enabled: true,
							}
						}
					}
				};
				new Chart(newCanvasElement, config);
				canvasElement.classList.remove('hidden');
			});
		})
	})
</script>

<div>
	{#if $resupply.things.length > 0}
		<div>
			<h1 class="h1">Per Meal Stats</h1>
			{#each iterableTrackables as trackable}
				<div>
				{#if $resupply[trackable]}
					<h2 class="h2">{trackable} Per Meal</h2>
				{/if}
				<!-- Create the canvas, even if we don't need it -->
				<canvas id="{trackable}-per-meal-chart" class="max-h-[300px] hidden"></canvas>
				</div>
			{/each}
		</div>
	{:else}
		<p>Add some items to your resupply to get some charts!</p>
	{/if}
</div>