<script lang="ts">
	import { ctx } from '.';
	import { createEventDispatcher } from 'svelte';
	import Content from './link-preview-content.svelte';

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

	const dispatch = createEventDispatcher();

	const hoverCard = ctx.set({
		defaultOpen: open,
		closeOnOutsideClick,
		positioning: {
			placement: placement
		},
		openDelay: delayIn,
		closeDelay: delayOut,
		onOpenChange: ({ next }) => {
			open = next;
			dispatch('change', next);
			if (next) dispatch('open');
			else dispatch('close');
			return next;
		}
	});

	const {
		elements: { trigger }
	} = hoverCard;

	export { trigger };
</script>

<slot {Content} trigger={$trigger}>
	<slot name="trigger" trigger={$trigger} />
	<Content>
		<slot name="content" />
	</Content>
</slot>
