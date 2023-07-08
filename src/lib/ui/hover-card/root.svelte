<script lang="ts">
	import { createHoverCard } from '@melt-ui/svelte';
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
	export let delay = 0;
	export let delayIn = delay || 700;
	export let delayOut = delay || 300;
	const hoverCard = createHoverCard({
		positioning: {
			placement: placement
		},
		openDelay: delayIn,
		closeDelay: delayOut
	});
	setContext('hover-card', hoverCard);
</script>

<slot {Trigger} {Content} />
