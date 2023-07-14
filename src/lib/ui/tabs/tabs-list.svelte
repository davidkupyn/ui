<script lang="ts">
	import Trigger from './tabs-trigger.svelte';
	import { getTabsContext } from '.';
	import { cn } from '$lib/helpers/style';

	const { list } = getTabsContext();
	let className: string | undefined | null = undefined;
	type Tab =
		| string
		| {
				label: string;
				value: string;
		  };
	export let tabs: Tab[] = [];
	export let disabled: Tab[] = [];
	export { className as class };
</script>

<div
	melt={$list}
	class={cn(
		'flex shrink-0 items-center w-full h-9 p-1 gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-fit data-[orientation=vertical]:min-w-[6rem] data-[orientation=vertical]:h-auto overflow-x-auto rounded-xl bg-muted ring-foreground/10 ring-1 data-[orientation=vertical]:rounded-2xl rounded-xl',
		className
	)}
>
	<slot {Trigger}>
		{#each tabs as tab (typeof tab === 'string' ? tab : tab.value)}
			<Trigger disabled={disabled.includes(tab)} value={typeof tab === 'string' ? tab : tab.value}>
				{#if typeof tab === 'string'}
					{tab}
				{:else}
					{tab.label}
				{/if}
			</Trigger>
		{/each}
	</slot>
</div>
