<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { crossfade } from 'svelte/transition';
	import { getTabsContext } from '.';
	import Button from '../button.svelte';

	const { trigger, value: valueStore } = getTabsContext();
	let className: string | undefined | null = undefined;
	export let disabled = false;
	export { className as class };
	export let value: string;
	const [send, receive] = crossfade({});
</script>

<Button
	variant="text"
	melt={$trigger({ value, disabled })}
	class={cn(
		'relative capitalize active:scale-100 w-full h-full data-[orientation=vertical]:h-9 data-[orientation=vertical]:rounded-xl p-0 focus-visible:ring-0',
		className
	)}
>
	<span
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-data-[state=active]:scale-100 scale-95 transition-[transform]"
	>
		<slot>
			{value}
		</slot>
	</span>
	{#if value === $valueStore}
		<div
			in:receive={{ key: 'tab', duration: 200 }}
			out:send={{ key: 'tab', duration: 200 }}
			class={cn(
				'w-full h-full group-data-[orientation=vertical]:rounded-xl rounded-lg bg-background shadow dark:shadow-[0_1px_0_#ffffff1a] group-focus-visible:ring-2 ring-1 ring-foreground/5 dark:ring-0 group-focus-visible:ring-offset-2 group-focus-visible:ring-muted-foreground dark:ring-border group-focus-visible:ring-offset-muted'
				// transparent && 'bg-background shadow'
			)}
		/>
	{/if}
</Button>
