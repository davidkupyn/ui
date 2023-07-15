<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

	export let orientation: CreateSeparatorProps['orientation'] = 'horizontal';

	const { root } = createSeparator({
		orientation,
	});
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div melt={$root} class={cn("h-px w-full bg-border", orientation === 'vertical' && 'h-full w-px', className)} />