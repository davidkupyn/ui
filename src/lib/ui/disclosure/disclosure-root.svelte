<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';
	import Content from './disclosure-content.svelte';
	import Trigger from './disclosure-trigger.svelte';
	import { createEventDispatcher } from 'svelte';
	export let disabled = false;
	export let defaultOpen = false;
	export let unstyled = false;
	export let open = defaultOpen;
	let className: string | undefined | null = undefined;
	export let details: string | undefined = undefined;
	export let summary: string | undefined = undefined;
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
