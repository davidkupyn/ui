<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getHoverCardContext } from '.';
	import { cn } from '$lib/helpers/style';

	let className = '';
	export { className as class };
	const { open, content } = getHoverCardContext();
</script>

{#if $open}
	<div
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			'rounded-2xl p-4 w-72 border border-popover-border bg-popover backdrop-blur-md shadow-lg z-10 focus:outline-none',
			className
		)}
		{...$content}
		use:content
	>
		<slot />
	</div>
{/if}
