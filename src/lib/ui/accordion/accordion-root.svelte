<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createAccordion } from '@melt-ui/svelte';
	import Item from './accordion-item.svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { generateAccordionOptions } from '.';
	export let multiple = false;
  export let value: string | string[] | undefined = multiple ? [] : '';
  
  const accordion = createAccordion(
    generateAccordionOptions(multiple, value)
  );
	const { root, value: valueStore } = accordion;
	let className: string | undefined | null = undefined;
	export { className as class };

	setContext('accordion', accordion);
  const dispatch = createEventDispatcher();

	 $: valueStore.set(value)

  valueStore.subscribe((v) => {
    value = v;
		dispatch('change', v);
	})
</script>

<div class={cn('grid gap-4', className)} melt={$root}>
	<slot {Item} />
</div>
