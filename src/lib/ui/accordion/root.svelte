<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createAccordion } from '@melt-ui/svelte';
	import Item from './item.svelte';
	import { setContext } from 'svelte';
	export let multiple = false;
	const accordion = createAccordion({
		type: multiple ? 'multiple' : 'single'
	});
	const { root } = accordion;
	let className = '';
	export { className as class };

	setContext('accordion', accordion);
</script>

<div class={cn('grid gap-4', className)} {...root}>
	<slot {Item} />
</div>
