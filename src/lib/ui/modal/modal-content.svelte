<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Title from './modal-title.svelte';
	import Description from './modal-description.svelte';
	import { modal, getModalContext } from '.';
	import { cn } from '$lib/helpers/style';
	import { X } from 'lucide-svelte';

	const { portal, open, alert, overlay, content, close, crossButton } = getModalContext();
	let className = '';
	export { className as class };
</script>

<div
	use:portal
	class={cn($open && 'z-50 flex justify-center sm:items-center items-end fixed inset-0')}
>
	{#if $open}
		<div
			{...$overlay}
			transition:fade={{ duration: 150 }}
			class="fixed z-50 inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] sm:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-600/50 to-base-600/95 dark:from-base-950/70 dark:to-base-950/95"
		/>
		<div
			transition:scale={{ duration: 200, start: 0.95 }}
			class={cn(modal({ alert }).base(), className)}
			{...$content}
			use:content
		>
			<slot {Title} {Description} close={$close} />

			{#if crossButton && !alert}
				<button {...$close} use:close class="absolute right-4 top-4 btn btn-sm btn-ghost btn-icon">
					<X size=16 />
				</button>
			{/if}
		</div>
	{/if}
</div>