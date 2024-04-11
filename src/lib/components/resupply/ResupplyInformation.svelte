<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { type Readable, type Writable } from 'svelte/store';
	import { type Resupply } from '$lib/resupply';
	import { type DisplaySettings } from '$lib/settings';
	import { Accordion, AccordionItem, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import StatsTab from '$lib/components/resupply/StatsTab.svelte';
	import ThingsTab from '$lib/components/resupply/ThingsTab.svelte';
	import { displaySettingsStore, resupplyStore } from '$lib/stores';
	import { getPrimaryStatValue } from '$lib/trackable';
	import ChartsTab from '$lib/components/resupply/ChartsTab.svelte';

	let resupply: Writable<Resupply> = resupplyStore;
	let displaySettings: Readable<DisplaySettings> = displaySettingsStore;

	let tabSet = 0;

	$: primaryStat = $displaySettings.primaryStat;

	function updateBodyScroll(event: CustomEvent<{ detail: { open: boolean } }>) {
		const isOpen = event.detail.open;
		const body = document.querySelector('body');

		if (body) {
			if (isOpen) {
				body.style.overflow = 'hidden';
			} else {
				body.style.overflow = 'auto';
			}
		}
	}
</script>

<div class="card fixed bottom-0 left-0 w-full rounded-b-none bg-primary-50-900-token">
	<section>
		<Accordion>
			<AccordionItem class="p-1" on:toggle={updateBodyScroll}>
				<svelte:fragment slot="iconClosed">
					<ChevronDown />
				</svelte:fragment>
				<svelte:fragment slot="iconOpen">
					<ChevronUp />
				</svelte:fragment>
				<svelte:fragment slot="summary">
					<strong>{primaryStat}: </strong>
					{getPrimaryStatValue($resupply, primaryStat, $displaySettings)}
				</svelte:fragment>
				<svelte:fragment slot="content">
					<TabGroup class="max-h-[80vh] overflow-y-scroll">
						<Tab bind:group={tabSet} name="stats" value={0}>
							<span> Summary </span>
						</Tab>
						<Tab bind:group={tabSet} name="things" value={1}>
							<span> Things </span>
						</Tab>
						<Tab bind:group={tabSet} name="charts" value={2}>
							<span> Charts </span>
						</Tab>
						<svelte:fragment slot="panel">
							{#if tabSet === 0}
								<StatsTab />
							{:else if tabSet === 1}
								<ThingsTab />
							{:else}
								<ChartsTab />
							{/if}
						</svelte:fragment>
					</TabGroup>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</section>
</div>
