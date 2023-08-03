<script lang="ts">
	import Fallback from './avatar-fallback.svelte';
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';

	export let fallback = '';
	export let alt: string;
	export let squared = false;
	export let src: string;
	export let delay: number | undefined = undefined;

	let className: string | undefined | null = undefined;
	export { className as class };

	const avatar = ctx.set({
		src,
		delayMs: delay
	});

	const {
		elements: { image }
	} = avatar;
</script>

<div
	class={cn(
		'grid w-9 aspect-square place-content-center rounded-full bg-muted',
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
