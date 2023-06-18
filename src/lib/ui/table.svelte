<script lang="ts">
	import { ChevronDown, ChevronUp, Settings2 } from 'lucide-svelte';
	import { tippy } from '$lib/actions/tippy';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import Switch from './switch.svelte';
	import Popover from './popover.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	type T = $$Generic<{ id: any }>;
	type Header = {
		key: keyof T;
		value: string;
	};
	interface $$Slots {
		'row-header': {
			header: Header;
		};
		row: {
			cell: {
				key: keyof T;
				value: any; //TODO fix this any
			};
		};
		actions: {
			row: T;
			index: number;
		};
	}
	export let items: T[] = [];
	export let headers: {
		key: string | keyof T;
		value: string;
	}[] = [];

	let tablesColumns = headers as Header[];

	export let selected: any[] = [];
	export let disabledKeys: any[] = [];

	export let pushHistory = false;
	export let columnsEditable = false;
	export let selectable = false;
	export let interactive = false;
	export let filled = false;
	export let lined = true;

	let currentTableColumns = tablesColumns;

	const sortBy = queryParam('sort', ssp.string(tablesColumns[0].key as string), {
		pushHistory
	});
	const sortDir = queryParam('dir', ssp.string('asc'), {
		pushHistory
	});

	function selectAll() {
		selected = allSelected
			? selected.filter((item) => !items.some((i) => i.id === item))
			: [
					...new Set([
						...selected,
						...items
							.map((item) => (disabledKeys.includes(item.id) ? null : item.id))
							.filter((item) => item)
					])
			  ];
	}

	$: allSelected =
		items
			.map((item) => (disabledKeys.includes(item.id) ? null : item.id))
			.filter((item) => item)
			.every((itemId) => selected.includes(itemId)) && items.length > 0;

	selected = [];
</script>

<div class="w-full overflow-auto">
	<table class="w-full caption-bottom overflow-x-scroll">
		<thead
			class="{filled
				? 'bg-base-200 dark:bg-base-900 rounded-xl'
				: 'hover:bg-base-200/50 dark:hover:bg-base-900/50'} {lined
				? '[&_tr]:border-b'
				: ''} transition-colors"
		>
			<tr class="border-subtle">
				{#if selectable}
					<th class="px-4 py-2 align-middle text-left">
						<input
							type="checkbox"
							aria-label="Select all"
							on:change={selectAll}
							checked={allSelected}
							class="checkbox"
						/>
					</th>
				{/if}
				{#each currentTableColumns as column, idx (column.key)}
					{@const sortingByCurrentColumn = $sortBy === column.key}
					<th
						animate:flip={{ duration: 200, easing: cubicOut }}
						class="px-4 py-2 group cursor-pointer transition select-text"
						class:pl-0={idx === 0 && selectable}
						class:pr-0={idx === currentTableColumns.length - 1 && columnsEditable}
						on:click={() => {
							$sortDir = sortingByCurrentColumn && $sortDir === 'asc' ? 'desc' : 'asc';
							$sortBy = column.key.toString();
						}}
					>
						<span class="flex items-center gap-2">
							<span
								class="uppercase btn btn-text p-0 font-semibold group-hover:text-base-800 dark:group-hover:text-base-100"
							>
								<slot name="row-header" header={column}>
									{column.value}
								</slot>
							</span>
							<button
								class="btn btn-ghost group/button relative h-9 w-9 focus-visible:ring-offset-0"
								aria-label="Sort by {column.key.toString()}"
								use:tippy={{ content: `Sort by ${column.key.toString()}`, delay: 300 }}
							>
								<ChevronUp
									size={20}
									class="absolute ease-out group-focus-visible/button:opacity-100 
													{sortingByCurrentColumn && $sortDir === 'desc'
										? 'top-2 opacity-100 group-hover:top-0.5  group-focus-visible/button:top-0.5'
										: 'top-0.5 opacity-0'} 
														transition-all group-hover:opacity-100 
														{sortingByCurrentColumn && $sortDir === 'desc'
										? 'group-hover:text-base-950 group-focus-visible/button:text-base-950 dark:group-hover:text-base-50 dark:group-focus-visible/button:text-base-50'
										: 'group-hover:text-base-400 group-focus-visible/button:text-base-400 dark:group-hover:text-base-500 dark:group-focus-visible/button:text-base-500'}"
								/>
								<ChevronDown
									size={20}
									class="absolute ease-out group-focus-visible/button:opacity-100 
													{sortingByCurrentColumn && $sortDir === 'asc'
										? 'bottom-2 opacity-100 group-hover:bottom-0.5 group-focus-visible/button:bottom-0.5'
										: 'bottom-0.5 opacity-0'} 
														transition-all group-hover:opacity-100 
														{sortingByCurrentColumn && $sortDir === 'asc'
										? 'group-hover:text-base-950 group-focus-visible/button:text-base-950 dark:group-hover:text-base-50 dark:group-focus-visible/button:text-base-50'
										: 'group-hover:text-base-400 group-focus-visible/button:text-base-400 dark:group-hover:text-base-500 dark:group-focus-visible/button:text-base-500'}"
								/>
							</button>
						</span>
					</th>
				{/each}
				<th class="relative px-4 py-2 align-middle text-right">
					{#if columnsEditable}
						<Popover placement="bottom-end">
							<button
								slot="trigger"
								let:trigger
								{...trigger}
								class="btn btn-ghost p-2 h-fit"
								use:tippy={{ content: 'Toggle columns' }}
							>
								<Settings2 size={20} />
							</button>
							<ul slot="content" class="w-48 divide-y divide-base-200 dark:divide-base-900">
								{#each tablesColumns as column (column.key)}
									<li class="px-1 py-1">
										<label
											for={column.key.toString()}
											class="flex w-full text-left items-center justify-between rounded-xl p-2 text-sm font-medium capitalize transition hover:bg-base-200 dark:hover:bg-base-800/50 text-base-500 dark:text-base-400 focus-within:bg-base-200 dark:focus-within:bg-base-800/50 hover:text-base-800 dark:hover:text-base-100 focus-within:text-base-800 dark:focus-within:text-base-100"
										>
											{column.value}
											<Switch
												id={column.key.toString()}
												bind:group={currentTableColumns}
												value={column}
												defaultChecked
												disabled={currentTableColumns.includes(column) &&
													currentTableColumns.length === 1}
											/>
											<!-- <label class="relative inline-flex items-center cursor-pointer">
												<input
													id={column.key}
													name={column.key}
													value={column}
													type="checkbox"
													class="sr-only peer"
													disabled={currentTableColumns.includes(column) &&
														currentTableColumns.length === 1}
													bind:group={currentTableColumns}
												/>
												<span
													class="w-11 transition peer-disabled:after:dark:bg-zinc-300 peer-disabled:opacity-50 peer-disabled:pointer-events-none h-6 bg-base-300/50 dark:bg-base-800 peer-focus:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base-50 dark:peer-focus-visible:ring-offset-base-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-base-50 after:shadow-lg after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-base-600 peer-checked:bg-primary-500 dark:peer-checked:bg-primary-600"
												/>
											</label> -->
										</label>
									</li>
								{/each}
							</ul>
						</Popover>
					{/if}
				</th>
			</tr>
		</thead>
		<tbody class="{lined ? '[&_tr]:border-b' : ''} [&_tr:last-child]:border-none relative">
			{#each items as item, idx (item.id)}
				<tr
					tabindex={interactive ? 0 : null}
					on:click={() => dispatch('rowclick', item)}
					on:keydown={(e) => {
						if (e.code === 'Enter') {
							e.preventDefault();
							dispatch('rowclick', item);
						}
					}}
					aria-disabled={disabledKeys.includes(item.id)}
					animate:flip={{ duration: 200, easing: cubicOut }}
					class="group aria-disabled:opacity-40 aria-disabled:pointer-events-none border-subtle transition-colors data-[state=selected]:bg-primary-500/10 data-[state=selected]:hover:bg-primary-600/10 hover:bg-base-200/50 dark:hover:bg-base-900/50 focus:bg-base-200/80 dark:focus:bg-base-900/80 outline-none data-[state=selected]:focus:bg-primary-600/20"
					data-state={selected.includes(item.id) ? 'selected' : null}
				>
					{#if selectable}
						<td class="px-4 py-2 align-middle text-left">
							<input
								type="checkbox"
								aria-label="Select user"
								checked={selected.includes(item.id)}
								on:click|stopPropagation
								on:change={() =>
									(selected = selected.includes(item.id)
										? selected.filter((idx) => idx !== item.id)
										: [...selected, item.id])}
								value={item.id}
								class="checkbox"
							/>
						</td>
					{/if}
					{#each currentTableColumns as column, columnIdx (column)}
						<td
							animate:flip={{ duration: 200, easing: cubicOut }}
							class="px-4 py-4 tabular-nums max-w-[500px] truncate"
							class:pl-0={columnIdx === 0 && selectable}
							class:pr-0={columnIdx === currentTableColumns.length - 1 && !$$slots.actions}
						>
							<slot
								name="row"
								cell={{
									key: column.key,
									value: item[column.key]
								}}
							>
								{item[column.key]}
							</slot>
						</td>
					{/each}
					<td class="px-4 py-2 align-middle text-right">
						{#if $$slots.actions}
							<slot row={item} index={idx} name="actions" />
						{/if}
					</td>
				</tr>
			{:else}
				<tr
					class="border-b p-4 border-subtle transition-colors hover:bg-base-300/50 dark:hover:bg-base-900/50"
				>
					<td colspan={tablesColumns.length + 2} class="text-center py-8 text-sm"> No results.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
