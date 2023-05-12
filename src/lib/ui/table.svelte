<script lang="ts">
	import { ChevronDown, MoreHorizontal, Settings2 } from 'lucide-svelte';
	import { tippy } from '$lib/actions/tippy';
	import { createMenu, createPopover } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import Switch from './switch.svelte';

	export function uniqueArray<T>(array: T[]): T[] {
		return Array.from(new Set(array));
	}

	export const convertTableName = (str: string) => {
		return str
			.replace(/_/g, ' ')
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (str) => str.toUpperCase());
	};

	export let selected = new Array<string>();
	export let items: any[] = [];
	export let pushHistory = false;
	const tableColumns = Object.keys(items[0]);
	let currentTableColumns = tableColumns;
	export let id = 'name';
	const sortBy = queryParam('sort', ssp.string(tableColumns[0]), {
		pushHistory
	});
	const sortDir = queryParam('dir', ssp.string('asc'), {
		pushHistory
	});
	const menu = createMenu({ label: 'Actions' });
	const popover = createPopover({ label: 'Columns' });
	function selectAll() {
		selected = allSelected
			? selected.filter((item) => !items.map((item) => item[id]).includes(item))
			: [...selected, ...items.map((item) => item[id])];
	}

	$: allSelected =
		items.map((item) => item[id]).every((itemId) => selected.includes(itemId)) && items.length > 0;
	selected = [];
</script>

<div class="w-full overflow-auto">
	<table class="w-full caption-bottom overflow-x-scroll scrollbar-custom">
		<thead class="[&_tr]:border-b">
			<tr
				class="border-base-300/50 dark:border-base-900 hover:bg-base-200/50 dark:hover:bg-base-900/50 transition-colors"
			>
				<th class="px-4 py-2 align-middle text-left">
					<input
						type="checkbox"
						aria-label="Select all"
						on:change={selectAll}
						checked={allSelected}
						class="checkbox"
					/>
				</th>
				{#each currentTableColumns as columnName, idx (columnName)}
					<th
						animate:flip={{ duration: 200, easing: cubicOut }}
						class="px-4 group cursor-pointer transition select-text"
						class:pl-0={idx === 0}
						class:pr-0={idx === currentTableColumns.length - 1}
						on:click={() => {
							$sortDir = $sortBy === columnName && $sortDir === 'asc' ? 'desc' : 'asc';
							$sortBy = columnName;
						}}
					>
						<span class="flex items-center gap-2">
							<span
								class="uppercase btn text p-0 font-semibold group-hover:text-base-800 dark:group-hover:text-base-100"
							>
								{convertTableName(columnName)}
							</span>
							<button
								class="btn ghost group/button relative h-9 w-9 focus-visible:ring-offset-0"
								aria-label="Sort by {columnName}"
								use:tippy={{ content: `Sort by ${columnName}`, delay: 300 }}
							>
								<ChevronDown
									size={20}
									class="absolute rotate-180 transform ease-out group-focus-visible/button:opacity-100 
													{$sortBy === columnName && $sortDir === 'desc'
										? 'top-2 opacity-100 group-hover:top-0.5  group-focus-visible/button:top-0.5'
										: 'top-0.5 opacity-0'} 
														transition-all group-hover:opacity-100 
														{$sortBy === columnName && $sortDir === 'desc'
										? 'group-hover:text-base-950 group-focus-visible/button:text-base-950 dark:group-hover:text-base-50 dark:group-focus-visible/button:text-base-50'
										: 'group-hover:text-base-400 group-focus-visible/button:text-base-400 dark:group-hover:text-base-500 dark:group-focus-visible/button:text-base-500'}"
								/>
								<ChevronDown
									size={20}
									class="absolute ease-out group-focus-visible/button:opacity-100 
													{$sortBy === columnName && $sortDir === 'asc'
										? 'bottom-2 opacity-100 group-hover:bottom-0.5 group-focus-visible/button:bottom-0.5'
										: 'bottom-0.5 opacity-0'} 
														transition-all group-hover:opacity-100 
														{$sortBy === columnName && $sortDir === 'asc'
										? 'group-hover:text-base-950 group-focus-visible/button:text-base-950 dark:group-hover:text-base-50 dark:group-focus-visible/button:text-base-50'
										: 'group-hover:text-base-400 group-focus-visible/button:text-base-400 dark:group-hover:text-base-500 dark:group-focus-visible/button:text-base-500'}"
								/>
							</button>
						</span>
					</th>
				{/each}
				<th class="relative px-4 py-2 align-middle text-right">
					<button
						use:popover.button
						class="btn ghost p-2 h-fit"
						use:tippy={{ content: 'Toggle columns' }}><Settings2 size={20} /></button
					>

					<Transition
						show={$popover.expanded}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-50"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-100"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-50"
					>
						<ul
							use:popover.panel
							class="absolute right-4 z-20 mt-2 w-44 origin-top-right divide-y divide-base-200 dark:divide-base-900 rounded-2xl border border-base-300/50 dark:border-base-900 bg-base-50/50 dark:bg-base-950/50 backdrop-blur-md shadow-lg ring-opacity-5 focus:outline-none"
						>
							{#each tableColumns as key (key)}
								<li class="px-1 py-1">
									<label
										for={key}
										use:menu.item
										class="flex w-full items-center justify-between rounded-xl p-2 text-sm font-medium capitalize transition hover:bg-base-200 dark:hover:bg-base-800/50 text-base-500 dark:text-base-400 focus-within:bg-base-200 dark:focus-within:bg-base-800/50 hover:text-base-800 dark:hover:text-base-100 focus-within:text-base-800 dark:focus-within:text-base-100"
									>
										{convertTableName(key)}
										<Switch
											id={key}
											bind:group={currentTableColumns}
											value={key}
											defaultChecked
											disabled={currentTableColumns.includes(key) &&
												currentTableColumns.length === 1}
										/>
									</label>
								</li>
							{/each}
						</ul>
					</Transition>
				</th>
			</tr>
		</thead>
		<tbody class="[&_tr]:border-b [&_tr:last-child]:border-none">
			{#each items as item, idx (item[id] + idx)}
				<tr
					animate:flip={{ duration: 300, easing: cubicOut }}
					class="group border-base-300/50 dark:border-base-900 transition-colors data-[state=selected]:bg-primary-500/10 data-[state=selected]:hover:bg-primary-600/10 hover:bg-base-200/50 dark:hover:bg-base-900/50"
					data-state={selected.includes(item[id]) ? 'selected' : null}
				>
					<td class="px-4 py-3 align-middle text-left">
						<input
							type="checkbox"
							aria-label="Select user"
							checked={selected.includes(item[id])}
							on:change={() =>
								(selected = selected.includes(item[id])
									? selected.filter((idx) => idx !== item[id])
									: [...selected, item[id]])}
							value={item[id]}
							class="checkbox"
						/>
					</td>
					{#each currentTableColumns as column, columnId (column)}
						<td
							animate:flip={{ duration: 200, easing: cubicOut }}
							class="px-4 tabular-nums max-w-[500px] truncate"
							class:pl-0={columnId === 0}
							class:pr-0={columnId === currentTableColumns.length - 1}
						>
							{item[column]}
						</td>
					{/each}
					<td class="px-4 py-3 align-middle text-right">
						<button class="btn ghost p-2 h-fit"><MoreHorizontal size={20} /></button>
					</td>
				</tr>
			{:else}
				<tr
					class="border-b p-4 border-base-300/50 dark:border-base-900 transition-colors hover:bg-base-300/50 dark:hover:bg-base-900/50"
				>
					<td colspan={tableColumns.length + 2} class="text-center"> No users found </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
