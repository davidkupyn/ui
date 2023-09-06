<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';
	import Fallback from './avatar-fallback.svelte';

	export let fallback = '';
	export let alt: string;
	export let squared = false;
	export let src: string;
	export let delay = 0;

	let className: string | undefined | null = undefined;
	export { className as class };

	const avatar = ctx.set({
		src,
		delayMs: delay
	});

	const {
		elements: { image },
		options
	} = avatar;

	$: options.delayMs.set(delay);
	$: options.src.set(src);
</script>

<div
	class={cn(
		'grid h-9 aspect-square place-content-center rounded-full bg-muted',
		squared ? 'rounded-xl' : 'rounded-full',
		className
	)}
>
	<img use:image {...$image} {alt} class="h-full w-full rounded-[inherit]" />
	<slot {Fallback}>
		<Fallback>
			<slot name="fallback">{fallback}</slot>
		</Fallback>
	</slot>
</div>
