<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers/style';
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
		unstyled,
		defaultOpen: open,
		onOpenChange: ({ next }) => {
			open = next;
			dispatch('change', next);
			return next;
		}
	});
	const {
		elements: { root },
		states: { open: openStore }
	} = disclosure;

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
