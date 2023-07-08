<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import Content from './content.svelte';
	import List from './list.svelte';
	import { createTabs } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	export let defaultTab = '';
	export let loop = false;
	const tabs = createTabs({ value: defaultTab, loop });
	const { root } = tabs;
	let className = '';
	export { className as class };
	setContext('tabs', tabs);
</script>

<div {...$root} class={cn('flex flex-col data-[orientation=vertical]:flex-row', className)}>
	<slot {List} {Content} />
</div>
