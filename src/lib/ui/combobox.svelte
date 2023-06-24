<script lang="ts">
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { createCombobox } from 'svelte-headlessui';
	import Transition from 'svelte-transition';

	export let items:
		| {
				label: string;
				value: unknown;
		  }[]
		| string[];
	const mappedItems = items.map((item) => {
		if (typeof item === 'string') {
			return { label: item, value: item };
		}
		return item;
	});
	export let label = '';
	export let placeholder = '';
	export let nonEmpty = false;
	export let id = '';
	const combobox = createCombobox({
		label: label + ' Select',
		selected: nonEmpty ? mappedItems[0] : placeholder
	});
	export let selected = nonEmpty ? mappedItems[0] : undefined;
	$: {
		if (selected !== $combobox.selected) {
			selected = $combobox.selected;
		}
	}
	$: filtered = mappedItems.filter((item) =>
		item.label
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes($combobox.filter.toLowerCase().replace(/\s+/g, ''))
	);
</script>

<div class="relative text-base">
	<fieldset class="input-group w-full justify-between">
		<input {id} name={id} use:combobox.input value={$combobox.selected.label ?? ''} {placeholder} />
		<button use:combobox.button class="icon-right" aria-pressed={$combobox.expanded}>
			<ChevronsUpDown size={16} />
		</button>
	</fieldset>

	<Transition
		show={$combobox.expanded}
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-75"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-100"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-75"
		on:after-leave={() => combobox.reset()}
	>
		<ul
			use:combobox.items
			class="absolute w-full z-10 mt-1.5 p-1 space-y-1 origin-top rounded-2xl border border-popover-border bg-popover drop-shadow-lg focus:outline-none overflow-hidden"
		>
			{#if label}
				<li
					class="text-foreground max-h-60 w-full overflow-auto sm:text-sm font-medium py-2 pl-10 pr-2"
				>
					{label}
				</li>
			{/if}
			{#each filtered as item}
				{@const active = $combobox.active === item}
				{@const selected = $combobox.selected === item}
				<li
					class="relative transition rounded-xl text-muted-foreground cursor-default select-none py-2 pl-10 pr-2 {active &&
					!selected
						? 'bg-muted text-foreground'
						: ''} {selected ? 'bg-accent-600/20 text-foreground' : ''}"
					use:combobox.item={{ value: item }}
				>
					<span class="block sm:text-sm truncate {selected ? 'font-medium' : 'font-normal'}">
						{item.label}
					</span>
					{#if selected}
						<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-foreground">
							<Check class="h-5 w-5" />
						</span>
					{/if}
				</li>
			{:else}
				<li class="relative cursor-default select-none py-2 pl-10 pr-4">
					<span class="block truncate font-normal sm:text-sm">Nothing found</span>
				</li>
			{/each}
		</ul>
	</Transition>
</div>
