<script lang="ts">
	import { ChevronDown, MoreHorizontal, Settings2 } from 'lucide-svelte';
	import { tippy } from '$lib/actions/tippy';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import Switch from './switch.svelte';
	import Popover from './popover.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let selected = new Array<string>();
	export let pushHistory = false;
	export let columnsEditable = false;
	export let selectable = false;
	export let items: Record<string, any>[] = [];
	export let rowClickable = false;
	export let tableColumns: {
		displayName: string;
		name: string;
	}[] = items[0]
		? Object.keys(items[0]).map((key) => ({
				displayName: key
					.replace(/_/g, ' ')
					.replace(/([A-Z])/g, ' $1')
					.replace(/^./, (str) => str.toUpperCase()),
				name: key
		  }))
		: [];

	let currentTableColumns = tableColumns;
	export let id = items[0][0];
	const all = tableColumns;
	const sortBy = queryParam('sort', ssp.string(tableColumns[0].name), {
		pushHistory
	});
	const sortDir = queryParam('dir', ssp.string('asc'), {
		pushHistory
	});

	function selectAll() {
		selected = allSelected
			? selected.filter((item) => !items.map((item) => item[id]).includes(item))
			: Array.from(new Set([...selected, ...items.map((item) => item[id])]));
	}

	$: allSelected =
		items.map((item) => item[id]).every((itemId) => selected.includes(itemId)) && items.length > 0;

	selected = [];
</script>

<div class="w-full overflow-auto">
	<table class="w-full caption-bottom overflow-x-scroll scrollbar-custom">
		<thead class="[&_tr]:border-b hover:bg-base-200/50 dark:hover:bg-base-900/50 transition-colors">
			<tr class="border-subtle">
				{#if selectable}
					<th class="px-4 py-3 align-middle text-left">
						<input
							type="checkbox"
							aria-label="Select all"
							on:change={selectAll}
							checked={allSelected}
							class="checkbox"
						/>
					</th>
				{/if}
				{#each currentTableColumns as column, idx (column.name)}
					<th
						animate:flip={{ duration: 200, easing: cubicOut }}
						class="px-4 py-2 group cursor-pointer transition select-text"
						class:pl-0={idx === 0 && selectable}
						class:pr-0={idx === currentTableColumns.length - 1 && columnsEditable}
						on:click={() => {
							$sortDir = $sortBy === column.name && $sortDir === 'asc' ? 'desc' : 'asc';
							$sortBy = column.name;
						}}
					>
						<span class="flex items-center gap-2">
							<span
								class="uppercase btn btn-text p-0 font-semibold group-hover:text-base-800 dark:group-hover:text-base-100"
							>
								{column.displayName}
							</span>
							<button
								class="btn btn-ghost group/button relative h-9 w-9 focus-visible:ring-offset-0"
								aria-label="Sort by {column.name}"
								use:tippy={{ content: `Sort by ${column.name}`, delay: 300 }}
							>
								<ChevronDown
									size={20}
									class="absolute rotate-180 transform ease-out group-focus-visible/button:opacity-100 
													{$sortBy === column.name && $sortDir === 'desc'
										? 'top-2 opacity-100 group-hover:top-0.5  group-focus-visible/button:top-0.5'
										: 'top-0.5 opacity-0'} 
														transition-all group-hover:opacity-100 
														{$sortBy === column.name && $sortDir === 'desc'
										? 'group-hover:text-base-950 group-focus-visible/button:text-base-950 dark:group-hover:text-base-50 dark:group-focus-visible/button:text-base-50'
										: 'group-hover:text-base-400 group-focus-visible/button:text-base-400 dark:group-hover:text-base-500 dark:group-focus-visible/button:text-base-500'}"
								/>
								<ChevronDown
									size={20}
									class="absolute ease-out group-focus-visible/button:opacity-100 
													{$sortBy === column.name && $sortDir === 'asc'
										? 'bottom-2 opacity-100 group-hover:bottom-0.5 group-focus-visible/button:bottom-0.5'
										: 'bottom-0.5 opacity-0'} 
														transition-all group-hover:opacity-100 
														{$sortBy === column.name && $sortDir === 'asc'
										? 'group-hover:text-base-950 group-focus-visible/button:text-base-950 dark:group-hover:text-base-50 dark:group-focus-visible/button:text-base-50'
										: 'group-hover:text-base-400 group-focus-visible/button:text-base-400 dark:group-hover:text-base-500 dark:group-focus-visible/button:text-base-500'}"
								/>
							</button>
						</span>
					</th>
				{/each}
				<th class="relative px-4 py-2 align-middle text-right">
					{#if columnsEditable}
						<Popover>
							<button
								slot="button"
								let:button
								use:button
								class="btn btn-ghost p-2 h-fit"
								use:tippy={{ content: 'Toggle columns' }}><Settings2 size={20} /></button
							>
							<ul slot="panel" class="w-48 divide-y divide-base-200 dark:divide-base-900">
								{#each tableColumns as column (column.name)}
									<li class="px-1 py-1">
										<label
											for={column.name}
											class="flex w-full text-left items-center justify-between rounded-xl p-2 text-sm font-medium capitalize transition hover:bg-base-200 dark:hover:bg-base-800/50 text-base-500 dark:text-base-400 focus-within:bg-base-200 dark:focus-within:bg-base-800/50 hover:text-base-800 dark:hover:text-base-100 focus-within:text-base-800 dark:focus-within:text-base-100"
										>
											{column.displayName}
											<Switch
												id={column.name}
												bind:group={currentTableColumns}
												value={column}
												defaultChecked
												disabled={currentTableColumns.includes(column) &&
													currentTableColumns.length === 1}
											/>
											<!-- <label class="relative inline-flex items-center cursor-pointer">
												<input
													id={column.name}
													name={column.name}
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
		<tbody class="[&_tr]:border-b [&_tr:last-child]:border-none relative">
			{#each items as item, idx (item[id] + idx)}
				<tr
					tabindex={rowClickable ? 0 : null}
					on:click={() => dispatch('rowclick', item)}
					on:keydown={(e) => {
						if (e.code === 'Enter') {
							e.preventDefault();
							dispatch('rowclick', item);
						}
					}}
					animate:flip={{ duration: 300, easing: cubicOut }}
					class="group border-subtle transition-colors data-[state=selected]:bg-primary-500/10 data-[state=selected]:hover:bg-primary-600/10 hover:bg-base-200/50 dark:hover:bg-base-900/50 focus:bg-base-200/80 dark:focus:bg-base-900/80 outline-none data-[state=selected]:focus:bg-primary-600/20"
					data-state={selected.includes(item[id]) ? 'selected' : null}
				>
					{#if selectable}
						<td class="px-4 py-3 align-middle text-left">
							<input
								type="checkbox"
								aria-label="Select user"
								checked={selected.includes(item[id])}
								on:click|stopPropagation
								on:change={() =>
									(selected = selected.includes(item[id])
										? selected.filter((idx) => idx !== item[id])
										: [...selected, item[id]])}
								value={item[id]}
								class="checkbox"
							/>
						</td>
					{/if}
					{#each currentTableColumns as column, columnIdx (column)}
						<td
							animate:flip={{ duration: 200, easing: cubicOut }}
							class="px-4 py-5 tabular-nums max-w-[500px] truncate"
							class:pl-0={columnIdx === 0 && selectable}
							class:pr-0={columnIdx === currentTableColumns.length - 1 && !$$slots.actions}
						>
							<slot name="row" row={item} {column}>
								{item[column.name]}
							</slot>
						</td>
					{/each}
					<td class="px-4 py-3 align-middle text-right">
						{#if $$slots.actions}
							<slot row={item} index={idx} name="actions" />
						{/if}
					</td>
				</tr>
			{:else}
				<tr
					class="border-b p-4 border-subtle transition-colors hover:bg-base-300/50 dark:hover:bg-base-900/50"
				>
					<td colspan={tableColumns.length + 2} class="text-center py-8 text-sm"> No results.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
