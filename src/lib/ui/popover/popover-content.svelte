<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getPopoverContext } from '.';
	import { cn } from '$lib/helpers/style';

	let className: string | undefined | null = undefined;
	export { className as class };
	const { open, content } = getPopoverContext();
</script>

{#if $open}
	<div
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			'rounded-2xl p-4 w-72 border border-popover-border bg-popover shadow-lg z-50 focus:outline-none',
			className
		)}
		melt={$content}
	>
		<slot />
	</div>
{/if}
