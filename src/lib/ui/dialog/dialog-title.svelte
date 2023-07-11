<script lang="ts">
	import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-svelte';
	import { dialog, getDialogContext } from '.';

	const { title, type } = getDialogContext();
</script>

<h2 class={dialog({ hasIcon: !!type || $$slots.icon }).title()} {...$title}>
	<span>
		{#if type === 'error'}
			<AlertCircle size=20 class="text-error" />
		{:else if type === 'warning'}
			<AlertTriangle size=20 class="text-warning" />
		{:else if type === 'success'}
			<CheckCircle2 size=20 class="text-success" />
		{:else if type === 'info'}
			<Info size=20 class="text-info" />
		{:else}
			<slot name="icon" />
		{/if}
	</span>
	<slot />
</h2>
