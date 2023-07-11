<script lang="ts">
	import { createPopover } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import Trigger from './popover-trigger.svelte';
	import Content from './popover-content.svelte';

	export let open = false;
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
		},
		open
	});
	const { close, open: openStore, trigger } = popover;
	setContext('popover', popover);
	const dispatch = createEventDispatcher();

	$: openStore.set(open)

  openStore.subscribe((v) => {
    open = v;
		dispatch('change', v);
		if (v) dispatch('open');
		else dispatch('close');
	})
	export { trigger, close }
</script>

<slot {Trigger} {Content} close={$close} />
