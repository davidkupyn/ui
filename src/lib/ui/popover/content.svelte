<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getPopoverContext } from '.';
	import { cn } from '$lib/helpers/style';

	let className = '';
	export { className as class };
	const { open, content } = getPopoverContext();
</script>

{#if $open}
	<div
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			'rounded-2xl border border-popover-border bg-popover backdrop-blur-md shadow-lg z-10 focus:outline-none',
			className
		)}
		{...$content}
	>
		<slot />
	</div>
{/if}
