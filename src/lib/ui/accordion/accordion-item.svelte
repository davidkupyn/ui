<script lang="ts">
	import Trigger from './accordion-item-trigger.svelte';
	import Content from './accordion-item-content.svelte';
	import { cn } from '$lib/helpers/style';
	import { setContext } from 'svelte';
	import { getAccordionContext } from '.';

	export let value: string = crypto.randomUUID();
	export let disabled = false;

	const itemOptions = {
		value,
		disabled
	};

	const { item } = getAccordionContext();
	let className = '';
	export { className as class };

	setContext('accordion-item', itemOptions);
</script>

<div {...$item(value)} class={cn(className)}>
	<slot {Content} {Trigger} />
</div>
