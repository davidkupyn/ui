<script lang="ts">
	import { cn } from '$lib/helpers';
	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

	export let orientation: CreateSeparatorProps['orientation'] = 'horizontal';

	const {
		elements: { root }
	} = createSeparator({
		orientation
	});
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	use:root
	{...$root}
	class={cn('h-px w-full bg-border', orientation === 'vertical' && 'h-full w-px', className)}
/>
