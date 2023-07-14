<script lang="ts">
	import Trigger from './accordion-item-trigger.svelte';
	import Content from './accordion-item-content.svelte';
	import { cn } from '$lib/helpers/style';
	import { setContext } from 'svelte';
	import { getAccordionContext } from '.';

	export let value: string = crypto.randomUUID();
	export let disabled = false;
	export let details: string | undefined = undefined;
	export let summary: string | undefined = undefined;
	
	const itemOptions = {
		value,
		disabled
	};

	const { item } = getAccordionContext();
	let className: string | undefined | null = undefined;
	export { className as class };

	setContext('accordion-item', itemOptions);
</script>

<div melt={$item(value)} class={cn(className)}>
	<slot {Content} {Trigger}>
		<Trigger>
			<slot name="summary">{summary}</slot>
		</Trigger>
		<Content>
			<slot name="details">{details}</slot>	
		</Content>
	</slot>
</div>
