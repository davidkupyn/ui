<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { Check } from 'lucide-svelte';
	import { getAutoCompleteContext } from '.';
	import { onMount } from 'svelte';

	export let value: string;
	export let index: number;
	export let disabled = false;
	let className: string | undefined | null = undefined;
	export { className as class };

	const { item: autoCompleteItem, isSelected, items } = getAutoCompleteContext();
	onMount(() => {
		$items = [...$items, {
			value,
			label: document?.getElementById(value)?.textContent || value,
		}]
	})
</script>

<li
	id={value}
	melt={$autoCompleteItem({ index, item: value, disabled })}
	use:autoCompleteItem
	class={cn(
		'relative data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed transition focus:outline-none rounded-xl sm:text-sm truncate data-[selected]:font-medium text-muted-foreground cursor-pointer select-none h-9 flex items-center pl-10 pr-2 data-[selected]:bg-accent-500/20 data-[selected]:text-foreground focus:bg-muted data-[selected]:focus:bg-accent-500/30 focus:text-foreground',
		className
	)}
>
	<slot />
	{#if $isSelected(value)}
		<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-foreground">
			<Check class="h-5 w-5" />
		</span>
	{/if}
</li>
