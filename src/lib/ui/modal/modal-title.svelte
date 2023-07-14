<script lang="ts">
	import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-svelte';
	import { modal, getModalContext } from '.';

	const { title, type } = getModalContext();
</script>

<h2 class={modal({ hasIcon: !!type || $$slots.icon }).title()} melt={$title}>
	<span>
		{#if type === 'error'}
		<div class="bg-error-500/10 rounded-full p-1.5 text-error">
			<AlertCircle size=20 />
		</div>
		{:else if type === 'warning'}
		<div class="bg-warning-500/10 rounded-full p-1.5 text-warning">
			<AlertTriangle size=20 />
		</div>
		{:else if type === 'success'}
		<div class="bg-success-500/10 rounded-full p-1.5 text-success">
			<CheckCircle2 size=20 />
		</div>
		{:else if type === 'info'}
		<div class="bg-info-500/10 rounded-full p-1.5 text-info">
			<Info size=20 class="text-info" />
		</div>
		{:else}
			<slot name="icon" />
		{/if}
	</span>
	<slot />
</h2>
