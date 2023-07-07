<script lang="ts">
	import { createPopover } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import Trigger from './trigger.svelte';
	import Content from './content.svelte';

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

	const popover = createPopover({
		positioning: {
			placement: placement
		}
	});
	const { close } = popover;
	setContext('popover', popover);
</script>

<slot {Trigger} {Content} close={$close} />
