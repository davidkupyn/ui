<script lang="ts">
	import RadioGroup from './menu-radio-group.svelte';
	import Separator from './menu-separator.svelte';
	import Label from './menu-item-label.svelte';
	import Item from './menu-item.svelte';
	import { cn } from '$lib/helpers';
	import { ctx, menuStyles } from '.';
	import { fade } from 'svelte/transition';
	import Submenu from './menu-submenu.svelte';

	const {
		states: { open },
		elements: { menu }
	} = ctx.get();

	const { content } = menuStyles();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

{#if $open}
	<div out:fade={{ duration: 100 }} class={cn(content(), className)} use:menu {...$menu}>
		<slot {Item} {Submenu} {Label} {Separator} {RadioGroup} />
	</div>
{/if}
