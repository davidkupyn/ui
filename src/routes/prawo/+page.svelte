<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/ui/button.svelte';

	export let data;
	let loading = false;
</script>

<div class="p-6 sm:p-12 h-[90vh] grid place-content-center">
	<div class="flex flex-col items-center gap-8">
		<h2 class="text-lg font-medium text-center">
			Następny termin egzaminu na prawo jazdy to
			<span class="text-accent font-semibold text-xl ml-2">
				{data.date}
			</span>
		</h2>
		<Button
			variant="accent"
			disabled={loading}
			on:click={() => {
				loading = true;
				invalidateAll();
				setTimeout(() => {
					loading = false;
				}, 500);
			}}
			{loading}
		>
			Odśwież
		</Button>
	</div>
</div>
