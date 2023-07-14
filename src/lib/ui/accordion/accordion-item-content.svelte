<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cn } from '$lib/helpers/style';
	import { getAccordionContext, getAccordionItemContext } from '.';
	import { cubicInOut } from 'svelte/easing';

	const { content, isSelected } = getAccordionContext();
	const item = getAccordionItemContext();
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

{#if $isSelected(item.value)}
	<div
		class={cn('px-4 mt-2 text-sm text-muted-foreground overflow-hidden', className)}
		melt={$content(item)}
		transition:slide={{ duration: 150, easing: cubicInOut }}
	>
		<slot />
	</div>
{/if}
