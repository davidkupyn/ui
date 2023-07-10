<script lang="ts">
	import RadioGroup from './radio-group.svelte';
	import Separator from './separator.svelte';
	import Label from './item-label.svelte';
	import Item from './item.svelte';
	import { cn } from '$lib/helpers/style';
	import { getMenuContext, menuStyles } from '.';
	import { fly } from 'svelte/transition';
	import Submenu from './submenu.svelte';

	const { menu, open } = getMenuContext();
	let className = '';
  const { content } = menuStyles();

	export { className as class };
</script>

{#if $open}
	<div
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			content(),
			className
		)}
		{...$menu}
		use:menu
	>
		<slot {Item} {Submenu} {Label} {Separator} {RadioGroup}/>
	</div>
{/if}
