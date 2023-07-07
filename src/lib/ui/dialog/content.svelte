<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Title from './title.svelte';
	import Description from './description.svelte';
	import { dialog, getDialogContext } from '.';
	import { cn } from '$lib/helpers/style';
	import { X } from 'lucide-svelte';

	const { portal, open, alert, overlay, content, close, crossButton } = getDialogContext();
	let className = '';
	export { className as class };
</script>

<div
	use:portal
	class={cn(
		'z-50 flex justify-center sm:items-center',
		$open && 'fixed inset-0',
		alert ? 'items-end' : 'items-start'
	)}
>
	{#if $open}
		<div
			{...$overlay}
			transition:fade={{ duration: 150 }}
			class="fixed z-50 inset-0 bg-base-700/70 dark:bg-base-950/70"
		/>
		<div
			transition:scale={{ duration: 200, start: 0.9 }}
			class={cn(dialog({ alert }).base(), className)}
			{...$content}
			use:content
		>
			<slot {Title} {Description} close={$close} />

			{#if crossButton && !alert}
				<button {...$close} use:close class="absolute right-4 top-4 btn btn-sm btn-ghost btn-icon">
					<X size={16} />
				</button>
			{/if}
		</div>
	{/if}
</div>
