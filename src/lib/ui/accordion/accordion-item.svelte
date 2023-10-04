<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers';
	import { uuid } from '$lib/helpers/uuid';
	import Trigger from './accordion-item-trigger.svelte';
	import Content from './accordion-item-content.svelte';

	export let value: string = uuid();
	export let disabled = false;
	export let details: string | undefined = undefined;
	export let summary: string | undefined = undefined;

	const {
		elements: { item }
	} = ctx.get();
	let className: string | undefined | null = undefined;
	export { className as class };

	ctx.item.set({
		value,
		disabled
	});

	const itemContext = ctx.item.get();

	$: itemContext.set({ value, disabled });
</script>

<div use:item {...$item(value)} class={cn(className)}>
	<slot {Content} {Trigger}>
		<Trigger>
			<slot name="summary">{summary}</slot>
		</Trigger>
		<Content>
			<slot name="details">{details}</slot>
		</Content>
	</slot>
</div>
