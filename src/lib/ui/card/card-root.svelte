<script lang="ts">
	import { cn } from '$lib/helpers';
	import Header from './card-header.svelte';
	import Footer from './card-footer.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div
	class={cn(
		'rounded-2xl bg-card text-card-foreground ring-1 ring-foreground/10 shadow p-6 grid gap-6',
		className
	)}
	{...$$restProps}
>
	<slot {Header} {Footer} />
</div>
