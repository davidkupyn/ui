<script lang="ts">
	import { createHoverCard } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import Trigger from './hover-card-trigger.svelte';
	import Content from './hover-card-content.svelte';

	export let open = false;
	export let closeOnOutsideClick = true;
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
	export let delay = 0;
	export let delayIn = delay || 700;
	export let delayOut = delay || 300;
	const hoverCard = createHoverCard({
		defaultOpen: open,
		closeOnOutsideClick,
		positioning: {
			placement: placement,
		},
		openDelay: delayIn,
		closeDelay: delayOut
	});
	const dispatch = createEventDispatcher();
	const { trigger, open: openStore } = hoverCard;
	$: openStore.set(open);
	openStore.subscribe((v) => {
    open = v;
		dispatch('change', v);
		if (v) dispatch('open');
		else dispatch('close');
	})
	setContext('hover-card', hoverCard);
	
	export { trigger }
</script>

<slot {Trigger} {Content}>
	<slot name="trigger" trigger={$trigger} />
	<Content>
		<slot name="content" />
	</Content>
</slot>
