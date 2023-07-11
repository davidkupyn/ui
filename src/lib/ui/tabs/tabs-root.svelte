<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import Content from './tabs-content.svelte';
	import List from './tabs-list.svelte';
	import { createTabs } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	export let value = '';
	export let loop = false;
	export let activateOnFocus = true;
	const dispatch = createEventDispatcher();

	const tabs = createTabs({ value, loop, activateOnFocus, onChange: (v) => {
		value = v;
		dispatch('change', v);
	} });
	const { root, value: valueStore } = tabs;
	let className = '';
	export { className as class };
	setContext('tabs', tabs);


	 $: valueStore.set(value)
</script>

<div {...$root} class={cn('flex flex-col data-[orientation=vertical]:flex-row', className)}>
	<slot {List} {Content} />
</div>
