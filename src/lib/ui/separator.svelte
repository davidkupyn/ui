<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createSeparator, type CreateSeparatorArgs } from '@melt-ui/svelte';

	export let orientation: CreateSeparatorArgs['orientation'] = 'horizontal';

	const { root } = createSeparator({
		orientation,
	});
  let className = '';
  export { className as class };
</script>

<div {...$root} class={cn("h-px w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px bg-border", className)} />