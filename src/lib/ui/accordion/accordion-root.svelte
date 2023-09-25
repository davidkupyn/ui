<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers';
	import { createEventDispatcher } from 'svelte';
	import Item from './accordion-item.svelte';

	export let multiple = false;
	export let value: string | string[] | undefined = multiple ? [] : '';
	let className: string | undefined | null = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const accordion = ctx.set({
		multiple: undefined,
		onValueChange: ({ next }) => {
			value = next;
			dispatch('change', next);
			return next;
		},
		defaultValue: value
	});
	const {
		elements: { root },
		states: { value: valueStore },
		options
	} = accordion;

	$: options.multiple.set(multiple);
	$: valueStore.set(value);
</script>

<div class={cn('grid gap-4', className)} use:root {...$root}>
	<slot {Item} />
</div>
