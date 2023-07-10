<script lang="ts">
	import Label from './item-label.svelte';
	import RadioGroup from './radio-group.svelte';
	import Separator from './separator.svelte';
	import { cn } from '$lib/helpers/style';
	import { fly } from 'svelte/transition';
	import { getSubMenuContext, menuStyles } from '.';

	const { subMenu, subOpen } = getSubMenuContext();
	let className = '';
  const { content } = menuStyles();

	export { className as class };
</script>

{#if $subOpen}
	<div
		transition:fly={{ duration: 150, x: -10 }}
		class={cn(
			content(),
			className
		)}
		{...$subMenu}
		use:subMenu
	>
			<slot {Separator} {RadioGroup} {Label}/>
	</div>
{/if}
