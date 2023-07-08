<script lang="ts">
	import RadioGroup from './radio-group.svelte';
	import Separator from './separator.svelte';
	import Label from './item-label.svelte';
	import Item from './item.svelte';
	import { cn } from '$lib/helpers/style';
	import { getMenuContext } from '.';
	import { fly } from 'svelte/transition';
	import Submenu from './submenu.svelte';
	const { menu, open } = getMenuContext();
	let className = '';

	export { className as class };
</script>

{#if $open}
	<div
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			'rounded-2xl p-1 border border-popover-border bg-popover backdrop-blur-md min-w-[8rem] shadow-lg z-10 focus:outline-none',
			className
		)}
		{...$menu}
		use:menu
	>
		<slot {Item} {Submenu} {Label} {Separator} {RadioGroup}/>
	</div>
{/if}
