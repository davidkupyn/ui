<script lang="ts">
	import Content from './menu-content.svelte';
	import { ctx } from '.';
	import type { CreateDropdownMenuProps } from '@melt-ui/svelte';
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
	const options = {
		loop,
		preventScroll,
		positioning: {
			placement
		},
		forceVisible: true
	} satisfies CreateDropdownMenuProps;
	const dropdown = ctx.set(options, context ? 'context-menu' : 'dropdown-menu');
	export const {
		elements: { trigger }
	} = dropdown;
</script>

<slot {Content} trigger={$trigger} />
