<script lang="ts">
	import Label from './item-label.svelte';
	import RadioGroup from './radio-group.svelte';
	import Separator from './separator.svelte';
	import { cn } from '$lib/helpers/style';
	import { fly } from 'svelte/transition';
	import { getSubMenuContext } from '.';

	const { subMenu, subOpen } = getSubMenuContext();
	let className = '';

	export { className as class };
</script>

{#if $subOpen}
	<div
		transition:fly={{ duration: 150, x: -10 }}
		class={cn(
			'rounded-2xl p-1 border border-popover-border bg-popover backdrop-blur-md min-w-[8rem] shadow-lg z-10 focus:outline-none',
			className
		)}
		{...$subMenu}
		use:subMenu
	>
			<slot {Separator} {RadioGroup} {Label}/>
	</div>
{/if}
