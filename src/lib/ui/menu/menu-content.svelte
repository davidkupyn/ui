<script lang="ts">
	import RadioGroup from './menu-radio-group.svelte';
	import Separator from './menu-separator.svelte';
	import Label from './menu-item-label.svelte';
	import Item from './menu-item.svelte';
	import { cn } from '$lib/helpers/style';
	import { getMenuContext, menuStyles } from '.';
	import { fade } from 'svelte/transition';
	import Submenu from './menu-submenu.svelte';

	const { menu, open } = getMenuContext();
	let className: string | undefined | null = undefined;
  const { content } = menuStyles();

	export { className as class };
</script>

{#if $open}
	<div
		out:fade={{ duration: 150 }}
		class={cn(
			content(),
			className
		)}
		melt={$menu}
	>
		<slot {Item} {Submenu} {Label} {Separator} {RadioGroup}/>
	</div>
{/if}
