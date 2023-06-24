<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createPopover } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	let className = '';
	let placement:
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

	const { trigger, content, open, close } = createPopover({
		positioning: {
			placement: placement
		}
	});

	export { open, close, trigger, placement, className as class };

	interface $$Slots {
		trigger: {
			trigger: typeof $trigger;
		};
		content: {
			close: typeof $close;
		};
	}
</script>

<slot name="trigger" trigger={$trigger} />

{#if $open}
	<div
		{...$content}
		transition:fly={{ duration: 150, y: -10 }}
		class={cn(
			'rounded-2xl border border-popover-border bg-popover backdrop-blur-md shadow-lg z-10 focus:outline-none',
			className
		)}
	>
		<slot name="content" close={$close} />
	</div>
{/if}
