<script lang="ts">
	import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-svelte';
	import { modal, getModalContext } from '.';
	import Button from '../button.svelte';
	import { cn } from '$lib/helpers/style';

	export let icon = false;
	const { title, type, close, crossButton, alert } = getModalContext();
	$: hasIcon = !!type || $$slots.icon || icon;
</script>

<h2 class={modal({ hasIcon }).title()} melt={$title}>
	<span aria-hidden>
		{#if type === 'error'}
		<div class="bg-error-500/10 rounded-xl p-1.5 text-error text-shadow">
			<AlertCircle size=20 />
		</div>
		{:else if type === 'warning'}
		<div class="bg-warning-500/10 rounded-xl p-1.5 text-warning">
			<AlertTriangle size=20 />
		</div>
		{:else if type === 'success'}
		<div class="bg-success-500/10 rounded-xl p-1.5 text-success">
			<CheckCircle2 size=20 />
		</div>
		{:else if type === 'info'}
		<div class="bg-info-500/10 rounded-xl p-1.5 text-info">
			<Info size=20 />
		</div>
		{:else if $$slots.icon}
			<div class="rounded-xl bg-popover ring-1 ring-accent-500/10 p-1.5 shadow text-accent [&>svg]:drop-shadow">
				<slot name="icon" />
			</div>
		{/if}
	</span>
	<slot />
</h2>

{#if crossButton && !alert}
	<Button variant="text" size="icon" melt={$close} class={cn("absolute right-2.5 -top-0.5 h-8 w-8", hasIcon && 'top-1.5 right-4')}>
		<X size=16 />
	</Button>
{/if}

<style>
	.text-shadow {
		text-shadow: 0 1px 0 rgb(0 0 0 / 20%);
	}
</style>