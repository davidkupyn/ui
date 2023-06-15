<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createPopover } from '@melt-ui/svelte';
	import { scale } from 'svelte/transition';

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
	interface $$Slots {
		trigger: {
			trigger: typeof $trigger;
		};
		content: {
			close: typeof $close;
		};
	}

	export { open, close, trigger, placement, className as class };
</script>

<slot name="trigger" trigger={$trigger} />

{#if $open}
	<div
		{...$content}
		transition:scale|local={{ duration: 150, start: 0.85 }}
		class={cn(
			'rounded-2xl border border-subtle bg-base-50 dark:bg-base-950 backdrop-blur-md shadow-lg absolute z-10 focus:outline-none',
			className
		)}
	>
		<slot name="content" close={$close} />
	</div>
{/if}
