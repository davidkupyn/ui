<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cn } from '$lib/helpers/style';
	import { cubicInOut } from 'svelte/easing';
	import { ctx } from '.';

	const {
		unstyled,
		states: { open },
		elements: { content }
	} = ctx.get();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

{#if $open}
	<div
		class={cn(!unstyled && 'px-4 mt-2 text-sm text-muted-foreground overflow-hidden', className)}
		use:content
		{...$content}
		transition:slide={{ duration: 200, easing: cubicInOut }}
	>
		<slot />
	</div>
{/if}
