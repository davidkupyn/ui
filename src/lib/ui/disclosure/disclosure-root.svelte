<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers';
	import { createEventDispatcher } from 'svelte';
	import Content from './disclosure-content.svelte';
	import Trigger from './disclosure-trigger.svelte';

	export let disabled = false;
	export let unstyled = false;
	export let open = false;
	export let details: string | undefined = undefined;
	export let summary: string | undefined = undefined;
	let className: string | undefined | null = undefined;
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

	$: options.disabled.set(disabled);
	$: options.unstyled.set(unstyled);
	$: openStore.set(open);
</script>

<div class={cn('group', className)} use:root {...$root}>
	<slot {Trigger} {Content} open={$openStore}>
		<Trigger>
			<slot name="summary">{summary}</slot>
		</Trigger>
		<Content>
			<slot name="details">{details}</slot>
		</Content>
	</slot>
</div>
