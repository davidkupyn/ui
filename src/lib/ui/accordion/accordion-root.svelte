<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createEventDispatcher } from 'svelte';
	import { ctx } from '.';
	import Item from './accordion-item.svelte';

	export let multiple = false;
	export let value: string | string[] | undefined = multiple ? [] : '';
	let className: string | undefined | null = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const accordion = ctx.set({
		multiple,
		onValueChange: ({ next }) => {
			value = next;
			dispatch('change', next);
			return next;
		},
		defaultValue: multiple ? (value as string[] | undefined) : (value as string | undefined)
	});
	const {
		elements: { root },
		states: { value: valueStore },
		options
	} = accordion;

	$: options.multiple.set(multiple);

	$: valueStore.set(multiple ? (value as string[] | undefined) : (value as string | undefined));
</script>

<div class={cn('grid gap-4', className)} use:root {...$root}>
	<slot {Item} />
</div>
