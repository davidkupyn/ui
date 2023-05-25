<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { createListbox } from 'svelte-headlessui';
	import Transition from 'svelte-transition';

	export let items: {
		label: string;
		value: unknown;
	}[];

	export let label = '';
	export let placeholder = '';
	export let nonEmpty = false;

	const listbox = createListbox({
		label: label + ' Select',
		selected: nonEmpty ? items[0] : placeholder
	});
	export let selected = items[0];
	$: {
		if (selected !== $listbox.selected) {
			selected = $listbox.selected;
		}
	}
</script>

<div class="relative">
	<button use:listbox.button class="input-group w-full justify-between">
		{#if $listbox.selected.label}
			<span>{$listbox.selected.label}</span>
		{:else}
			<span class="text-base-400 dark:text-base-500">{placeholder}</span>
		{/if}
		<span class="icon-right" aria-pressed={$listbox.expanded}>
			<ChevronsUpDown size={20} />
		</span>
	</button>

	<Transition
		show={$listbox.expanded}
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-75"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-100"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-75"
	>
		<ul
			use:listbox.items
			class="absolute w-full z-10 mt-1.5 p-1 space-y-1 origin-top rounded-2xl border border-subtle bg-base-50 dark:bg-base-950 drop-shadow-lg focus:outline-none overflow-hidden"
		>
			{#if label}
				<li
					class="text-base-950 dark:text-base-50 max-h-60 w-full overflow-auto text-sm font-medium py-2 pl-10 pr-2"
				>
					{label}
				</li>
			{/if}
			{#each items as item}
				{@const active = $listbox.active === item}
				{@const selected = $listbox.selected === item}
				<li
					class="relative transition rounded-xl text-base-500 dark:text-base-400 cursor-default select-none py-2 pl-10 pr-2 {active &&
					!selected
						? 'bg-base-200 dark:bg-base-800/50 text-base-950 dark:text-base-50'
						: ''} {selected ? 'bg-primary-600/20 text-primary-900 dark:text-primary-50' : ''}"
					use:listbox.item={{ value: item }}
				>
					<span class="block text-sm truncate {selected ? 'font-medium' : 'font-normal'}"
						>{item.label}</span
					>
					{#if selected}
						<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
							<Check class="h-5 w-5" />
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	</Transition>
</div>
