<script lang="ts">
	import Content from './menu-content.svelte';
	import { ctx } from '.';
	export let loop = false;
	export let preventScroll = true;
	export let placement:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| undefined = undefined;
	export let context = false;

	const dropdown = ctx.set(
		{
			loop,
			preventScroll,
			positioning: {
				placement
			},
			forceVisible: true
		},
		context ? 'context-menu' : 'dropdown-menu'
	);
	export const {
		elements: { trigger },
		options: optionsStore
	} = dropdown;
	$: optionsStore.loop.set(loop);
	$: optionsStore.preventScroll.set(preventScroll);
	$: optionsStore.positioning.set({ placement });
</script>

<slot {Content} trigger={$trigger} />
