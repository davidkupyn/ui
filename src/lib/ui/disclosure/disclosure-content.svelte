<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cn } from '$lib/helpers/style';
	import { getDisclosureContext } from '.';
	import { cubicInOut } from 'svelte/easing';

	const { content, open, unstyled } = getDisclosureContext();
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

{#if $open}
	<div
		class={cn(!unstyled && 'px-4 mt-2 text-sm text-muted-foreground overflow-hidden', className)}
		melt={$content}
		transition:slide={{ duration: 150, easing: cubicInOut }}
	>
		<slot />
	</div>
{/if}
