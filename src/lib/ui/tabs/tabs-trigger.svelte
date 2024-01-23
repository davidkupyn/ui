<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { crossfade } from 'svelte/transition';
	import { ctx } from '.';
	import Button from '../button.svelte';

	const {
		elements: { trigger },
		states: { value: valueStore },
		options: {}
	} = ctx.get();

	let className: string | undefined | null = undefined;
	export let disabled = false;
	export { className as class };
	export let value: string;
	const [send, receive] = ctx.crossfade.get();
</script>

<Button
	variant="text"
	melt={$trigger({ value, disabled })}
	class={cn(
		'relative flex capitalize active:scale-100 w-full h-full data-[orientation=vertical]:h-9 data-[orientation=vertical]:rounded-lg p-0 focus-visible:ring-0 data-[state=active]:no-underline',
		className
	)}
>
	<div class="relative z-20 group-data-[state=active]:scale-100 scale-95 transition-[transform]">
		<slot>
			{value}
		</slot>
	</div>
	{#if value === $valueStore}
		<div
			in:receive={{ key: 'tab', duration: 200 }}
			out:send={{ key: 'tab', duration: 200 }}
			class={cn(
				'absolute inset-0 z-10 group-data-[orientation=vertical]:rounded-lg rounded-md bg-background shadow dark:shadow-[0_1px_0_#ffffff1a] group-focus-visible:ring-2 ring-1 ring-foreground/10 dark:ring-0 group-focus-visible:ring-offset-2 group-focus-visible:ring-muted-foreground dark:ring-border group-focus-visible:ring-offset-muted'
				// transparent && 'bg-background shadow'
			)}
		/>
	{/if}
</Button>
