<script lang="ts">
	import ResupplyInformation from '$lib/components/resupply/ResupplyInformation.svelte';
	import NewThing from '$lib/components/NewThing.svelte';
	import { resupplyStore as resupply } from '$lib/stores';
</script>

<div class="mb-6">
	<h1 class="text-2xl mb-6">
		<input type="text" class="input" placeholder="Resupply Name (optional)" bind:value={$resupply.name} />
	</h1>
	<NewThing />
</div>

<ResupplyInformation />
