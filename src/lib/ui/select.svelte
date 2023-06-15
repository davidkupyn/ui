<script lang="ts">
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { createSelect } from '@melt-ui/svelte';

	const { selectedText, trigger, menu, option, isSelected, open } = createSelect();

	export let items: string[];

	export let label = '';
	export let placeholder = '';

	export { $selectedText as value };
	$: console.log($selectedText);
</script>

<button {...$trigger} class="input-group w-full justify-between" aria-label={label}>
	{#if $selectedText !== placeholder}
		{$selectedText}
	{:else}
		<span class="text-base-400 dark:text-base-500">{placeholder}</span>
	{/if}
	<span class="icon-right" aria-pressed={$open}>
		<ChevronsUpDown size={20} />
	</span>
</button>

{#if $open}
	<ul
		{...$menu}
		class="absolute w-full z-10 mt-1.5 p-1 space-y-1 origin-top rounded-2xl border border-subtle bg-base-50 dark:bg-base-950 drop-shadow-lg focus:outline-none overflow-hidden"
	>
		{#each items as item}
			<li
				{...$option(item)}
				class="relative transition focus:outline-none rounded-xl text-base-500 dark:text-base-400 cursor-default select-none py-2 pl-10 pr-2 data-[selected]:bg-primary-600/20 data-[selected]:text-primary-900 data-[selected]:dark:text-primary-50 focus:bg-base-200 data-[selected]:focus:bg-primary-500/30 focus:dark:bg-base-800/50 focus:text-base-950 focus:dark:text-base-50"
			>
				<span class="block sm:text-sm truncate data-[selected]:font-medium">
					{#if typeof item === 'string'}
						{item}
					{:else}
						{item}
					{/if}
				</span>
				{#if $isSelected(item)}
					<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
						<Check class="h-5 w-5" />
					</span>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
