<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers/style';
	import { css } from '../modal';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		states: { open },
		elements: { content }
	} = ctx.get();
</script>

{#if $open}
	<div
		transition:css={{ duration: 150, y: '--popover-y', x: '--popover-x' }}
		class={cn(
			'rounded-xl p-4 w-72 border border-popover-border bg-popover shadow-lg z-50 focus:outline-none [--popover-y:-10px]',
			className
		)}
		use:content
		{...$content}
	>
		<slot />
	</div>
{/if}
