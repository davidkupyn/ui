<script lang="ts">
	import Trigger from './trigger.svelte';
	import { getTabsContext } from '.';
	import { cn } from '$lib/helpers/style';

	const { list } = getTabsContext();
	let className = '';
	type Tab =
		| string
		| {
				label: string;
				value: string;
		  };
	export let tabs: Tab[] = [];
	export { className as class };
</script>

<div
	{...$list}
	class={cn(
		'flex shrink-0 items-center w-full h-9 p-1 gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-9 data-[orientation=vertical]:h-full overflow-x: auto',
		className
	)}
>
	<slot {Trigger}>
		{#each tabs as tab (typeof tab === 'string' ? tab : tab.value)}
			<Trigger value={typeof tab === 'string' ? tab : tab.value}>
				{#if typeof tab === 'string'}
					{tab}
				{:else}
					{tab.label}
				{/if}
			</Trigger>
		{/each}
	</slot>
</div>
