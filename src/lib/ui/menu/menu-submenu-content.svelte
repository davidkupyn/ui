<script lang="ts">
	import Label from './menu-item-label.svelte';
	import RadioGroup from './menu-radio-group.svelte';
	import Separator from './menu-separator.svelte';
	import { cn } from '$lib/helpers';
	import { ctx, menuStyles } from '.';

	const {
		elements: { subMenu },
		states: { subOpen }
	} = ctx.submenu.get();
	let className: string | undefined | null = undefined;
	const { content } = menuStyles();

	export { className as class };
</script>

{#if $subOpen}
	<div class={cn(content(), className)} use:subMenu {...$subMenu}>
		<slot {Separator} {RadioGroup} {Label} />
	</div>
{/if}
