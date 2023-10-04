<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { content },
		helpers: { isSelected }
	} = ctx.get();
	const item = ctx.item.get();
</script>

{#if $isSelected($item.value)}
	<div
		class={cn('px-4 mt-2 text-sm text-muted-foreground overflow-hidden', className)}
		use:content
		{...$content($item)}
		transition:slide={{ duration: 200, easing: cubicInOut }}
	>
		<slot />
	</div>
{/if}
