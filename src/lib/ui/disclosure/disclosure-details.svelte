<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		states: { open },
		elements: { content },
		options: { unstyled }
	} = ctx.get();
</script>

{#if $open}
	<div
		class={cn(!$unstyled && 'px-4 mt-2 text-sm text-muted-foreground overflow-hidden', className)}
		use:content
		{...$content}
		transition:slide={{ duration: 200, easing: cubicInOut }}
	>
		<slot />
	</div>
{/if}
