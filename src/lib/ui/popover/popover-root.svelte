<script lang="ts">
	import { ctx } from '.';
	import { createEventDispatcher } from 'svelte';
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
	export let closeOnEscape = true;
	export let closeOnOutsideClick = true;

	const dispatch = createEventDispatcher();

	const popover = ctx.set({
		positioning: {
			placement: placement
		},
		closeOnEscape,
		closeOnOutsideClick,
		forceVisible: true,
		defaultOpen: open,
		onOpenChange: ({ next }) => {
			open = next;
			if (next) dispatch('open');
			else dispatch('close');
			return next;
		}
	});
	const {
		elements: { close, trigger },
		states: { open: openStore },
		options
	} = popover;

	$: options.positioning.set({ placement });
	$: openStore.set(open);

	export { trigger };
</script>

<slot {Content} close={$close} trigger={$trigger} {open}>
	<slot name="trigger" trigger={$trigger} />
	<Content>
		<slot name="content" />
	</Content>
</slot>
