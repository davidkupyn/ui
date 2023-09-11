<script lang="ts">
	import Header from './modal-header.svelte';
	import Footer from './modal-footer.svelte';
	import { fade } from 'svelte/transition';
	import { modal, ctx, css } from '.';
	import { cn } from '$lib/helpers/style';

	const {
		elements: { portalled, overlay, content, close },
		states: { open },
		options: { drawer, side }
	} = ctx.get();
	let className: string | undefined | null = undefined;
	export { className as class };
	$: console.log({
		drawer: $drawer,
		side: $side
	});
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
