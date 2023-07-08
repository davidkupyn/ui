<script lang="ts">
	import Separator from './separator.svelte';
	import Label from './item-label.svelte';
	import Item from './item.svelte';
	import { cn } from '$lib/helpers/style';
	import { getMenuContext } from '.';
	import { fly } from 'svelte/transition';
	import Submenu from './submenu.svelte';
	const { menu, open } = getMenuContext();
	let className = '';
	export let divide = false;

	export { className as class };
</script>

{#if $open}
	<div
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			'rounded-2xl border border-popover-border bg-popover backdrop-blur-md w-48 shadow-lg z-10 focus:outline-none',
			divide && 'divide-y divide-popover-border',
			className
		)}
		{...$menu}
		use:menu
	>
		<slot {Item} {Submenu} {Label} {Separator}/>
	</div>
{/if}
