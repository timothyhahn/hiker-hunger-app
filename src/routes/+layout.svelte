<script>
	import '../app.pcss';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
</script>

<slot />
<Toaster />
<ModeWatcher />
