<script lang="ts">
	import Trigger from './tabs-trigger.svelte';
	import { ctx } from '.';
	import { cn } from '$lib/helpers/style';

	const {
		elements: { list }
	} = ctx.get();

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
	use:list
	{...$list}
	class={cn(
		'flex shrink-0 items-center w-full h-9 p-1 gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-fit data-[orientation=vertical]:min-w-[6rem] shadow-inner data-[orientation=vertical]:h-auto overflow-x-auto bg-muted dark:shadow-[inset_0_1px_#ffffff0f] data-[orientation=vertical]:rounded rounded-lg',
		className
	)}
>
	<slot {Trigger}>
		{#each tabs as tab (typeof tab === 'string' ? tab : tab.value)}
			{@const value = typeof tab === 'string' ? tab : tab.value}
			{@const label = typeof tab === 'string' ? tab : tab.label}
			<Trigger disabled={disabled.includes(tab)} {value}>
				{label}
			</Trigger>
		{/each}
	</slot>
</div>
