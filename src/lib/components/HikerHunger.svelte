<script lang="ts">
	import Resupply from '$lib/components/resupply/Resupply.svelte';
	import { type DisplaySettings } from '$lib/settings';
	import { type Writable } from 'svelte/store';
	import { type Resupply as ResupplyType } from '$lib/resupply';
	import { onMount } from 'svelte';
	import { displaySettingsStore, resupplyStore } from '$lib/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { Modals } from '$lib/modals';
	import ResupplySettingsModal from '$lib/components/modals/ResupplySettingsModal.svelte';

	const VERSION_KEY = '3';
	const DISPLAY_SETTINGS_KEY = `displaySettings-${VERSION_KEY}`;
	const CURRENT_RESUPPLY_KEY = `currentResupply-${VERSION_KEY}`;

	let displaySettings: Writable<DisplaySettings> = displaySettingsStore;
	let resupply: Writable<ResupplyType> = resupplyStore;
	let modalStore = getModalStore();
	let isNewUser = false;

	onMount(() => {
		if (localStorage.getItem(DISPLAY_SETTINGS_KEY)) {
			try {
				displaySettings.set(JSON.parse(localStorage.getItem(DISPLAY_SETTINGS_KEY)));
			} catch (err) {
				console.error('Failed to parse display settings from local storage', err);
			}
		}
		if (localStorage.getItem(CURRENT_RESUPPLY_KEY)) {
			try {
				resupply.set(JSON.parse(localStorage.getItem(CURRENT_RESUPPLY_KEY)));
			} catch (err) {
				console.error('Failed to parse current resupply from local storage', err);
			}
		} else {
			isNewUser = true;
		}
		displaySettings.subscribe((value) => {
			localStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(value));
		});
		resupply.subscribe((value) => {
			localStorage.setItem(CURRENT_RESUPPLY_KEY, JSON.stringify(value));
		});
	});

	$: if (isNewUser) {
		modalStore.trigger({type: 'component', component: {ref: ResupplySettingsModal, props: {isNewUser}}, meta: {isNewUser}});
	}
</script>

<main class="h-[100vh] w-full">
	<div class="container mx-auto space-y-8 p-8">
		<Resupply />
	</div>
</main>
