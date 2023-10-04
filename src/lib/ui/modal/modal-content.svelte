<script lang="ts">
	import { cn } from '$lib/helpers';
	import { fade } from 'svelte/transition';
	import { css, ctx, modal } from '.';
	import Footer from './modal-footer.svelte';
	import Header from './modal-header.svelte';

	const {
		elements: { portalled, overlay, content, close },
		states: { open },
		options: { drawer, side }
	} = ctx.get();
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div use:portalled>
	{#if $open}
		<div class={modal({ drawer: $drawer, side: $side }).container()}>
			<div
				use:overlay
				{...$overlay}
				transition:fade={{ duration: 150 }}
				class="fixed z-50 backdrop-blur-sm inset-0 bg-base-950/30 dark:bg-base-950/75"
			/>
			<div
				transition:css={{
					duration: '--modal-duration',
					y: '--modal-y',
					x: '--modal-x',
					scale: '--modal-scale',
					opacity: '--modal-opacity'
				}}
				class={cn(modal({ drawer: $drawer, side: $side }).base(), className)}
				use:content
				{...$content}
			>
				<slot {Header} {Footer} close={$close} />
			</div>
		</div>
	{/if}
</div>
