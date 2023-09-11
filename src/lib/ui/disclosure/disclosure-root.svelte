<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { ctx } from '.';
	import { cn } from '$lib/helpers';
	import { createEventDispatcher } from 'svelte';
	import Details from './disclosure-details.svelte';
	import Summary from './disclosure-summary.svelte';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		disabled?: boolean;
		unstyled?: boolean;
		open?: boolean;
		details?: string;
		summary?: string;
	};
	export let disabled: $$Props['disabled'] = false;
	export let unstyled: $$Props['unstyled'] = false;
	export let open: $$Props['open'] = false;
	export let details: $$Props['details'] = undefined;
	export let summary: $$Props['summary'] = undefined;

	let className: $$Props['class'] = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const disclosure = ctx.set({
		disabled,
		defaultOpen: open,
		onOpenChange: ({ next }) => {
			open = next;
			dispatch('change', next);
			return next;
		},
		props: {
			unstyled
		}
	});

	const {
		elements: { root },
		states: { open: openStore },
		options
	} = disclosure;

	$: options.disabled.set(disabled ?? false);
	$: options?.unstyled?.set(unstyled);
	$: openStore.set(open ?? false);
</script>

<div class={cn('group', className)} use:root {...$root}>
	<slot {Summary} {Details} open={$openStore}>
		<Summary>
			<slot name="summary">{summary}</slot>
		</Summary>
		<Details>
			<slot name="details">{details}</slot>
		</Details>
	</slot>
</div>
