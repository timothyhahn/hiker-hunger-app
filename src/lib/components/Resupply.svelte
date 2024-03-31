<script lang="ts">
	import ResupplyInformation from '$lib/components/ResupplyInformation.svelte';
	import { type DisplaySettings } from '$lib/settings';
	import type { Resupply } from '$lib/resupply';
	import NewThing from '$lib/components/NewThing.svelte';
	import { type Writable } from 'svelte/store';

	export let displaySettings: DisplaySettings;
	export let resupply: Writable<Resupply>;
</script>

<div class="p-6">
	<NewThing bind:resupply={resupply} {displaySettings} />
</div>

<ResupplyInformation
	bind:resupply={resupply}
	{displaySettings}
/>
