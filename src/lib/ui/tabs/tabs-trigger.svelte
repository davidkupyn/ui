<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { crossfade } from 'svelte/transition';
	import { getTabsContext } from '.';

	const { trigger, value: valueStore } = getTabsContext();
	let className: string | undefined | null = undefined;
	export let disabled = false;
	export { className as class };
	export let value: string;
	const [send, receive] = crossfade({});
</script>

<button
	melt={$trigger({value, disabled})} 
	class={cn(
		'group relative capitalize btn btn-text active:scale-100 w-full h-full data-[orientation=vertical]:h-9 data-[orientation=vertical]:rounded-xl p-0 rounded-lg',
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
				'w-full h-full group-data-[orientation=vertical]:rounded-xl rounded-lg overflow-hidden bg-background shadow'
				// transparent && 'bg-background shadow'
			)}
		/>
	{/if}
</button>
