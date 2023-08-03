<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };
	const {
		states: { open },
		elements: { content }
	} = ctx.get();
</script>

{#if $open}
	<div
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			'rounded-2xl p-4 w-72 border border-popover-border bg-popover shadow-lg z-50 focus:outline-none',
			className
		)}
		{...$content}
		use:content
	>
		<slot />
	</div>
{/if}
