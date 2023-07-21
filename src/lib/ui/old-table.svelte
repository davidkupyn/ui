<script lang="ts">
	import { Menu } from './menu';
	import { cn } from '$lib/helpers/style';
	import { ChevronDown, ChevronUp, Settings2 } from 'lucide-svelte';
	import { tippy } from '$lib/actions/tippy';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
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
			record: T;
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
	<table class="w-full caption-bottom overflow-x-scroll text-sm">
		<thead
			class={cn(
				filled && 'bg-base-200/50 dark:bg-base-900/50 shadow-[inset_0_1px_0_#ffffff0f] rounded-2xl',
				lined && !filled && '[&_tr]:border-b'
			)}
		>
			<tr class="border-muted">
				{#if selectable}
					<th class={cn('px-2.5 align-middle text-left', filled && 'rounded-l-2xl')}>
						<label class="p-1.5 grid place-content-center">
							<input
								type="checkbox"
								aria-label="Select all"
								on:change={selectAll}
								checked={allSelected}
								class="checkbox"
							/>
						</label>
					</th>
				{/if}
				{#each currentTableColumns as column, idx (column.key)}
					{@const sortingByCurrentColumn = $sortBy === column.key}
					<th
						animate:flip={{ duration: 200, easing: cubicOut }}
						class="px-4 py-1.5 group cursor-pointer transition select-text"
						class:pl-0={idx === 0 && selectable}
						class:pr-0={idx === currentTableColumns.length - 1 && columnsEditable}
						on:click={() => {
							$sortDir = sortingByCurrentColumn && $sortDir === 'asc' ? 'desc' : 'asc';
							$sortBy = column.key.toString();
						}}
					>
						<span class="flex items-center gap-2">
							<span
								class="uppercase btn btn-text p-0 font-semibold group-hover:text-foreground text-xs"
							>
								<slot name="row-header" header={column}>
									{column.value}
								</slot>
							</span>
							<button
								class="btn btn-ghost group/button relative btn-icon focus-visible:ring-offset-0 flex-col gap-0"
								aria-label="Sort by {column.key.toString()}"
								use:tippy={{ content: `Sort by ${column.key.toString()}`, delay: 300 }}
							>
								<ChevronUp
									size=16
									class={cn(
										'ease-out group-focus-visible/button:opacity-100 transition-all group-hover:opacity-100 -m-0.5',
										sortingByCurrentColumn && $sortDir === 'desc'
											? 'translate-y-[0.3125rem] opacity-100 group-hover:translate-y-0 group-focus-visible/button:translate-y-0 group-hover:text-foreground group-focus-visible/button:text-foreground'
											: 'translate-y-0 opacity-0 group-hover:text-muted-foreground group-focus-visible/button:text-muted-foreground'
									)}
								/>
								<ChevronDown
									size=16
									class={cn(
										'ease-out group-focus-visible/button:opacity-100 transition-all group-hover:opacity-100 -m-0.5',
										sortingByCurrentColumn && $sortDir === 'asc'
											? '-translate-y-[0.4375rem] opacity-100 group-hover:translate-y-0 group-focus-visible/button:translate-y-0 group-hover:text-foreground group-focus-visible/button:text-foreground'
											: 'translate-y-0 opacity-0 group-hover:text-muted-foreground group-focus-visible/button:text-muted-foreground'
									)}
								/>
							</button>
						</span>
					</th>
				{/each}
				<th class={cn('px-4 py-1.5 align-middle text-right', filled && 'rounded-r-2xl')}>
					{#if columnsEditable}
						<Menu let:Trigger let:Content placement="bottom-end">
							<Trigger variant="ghost" size="icon">
								<Settings2 size=16 />
							</Trigger>
							<Content let:Separator let:Item class="w-48" let:Label>
								<Label>Columns</Label>
								<Separator />
								{#each tablesColumns as column (column.key)}
									<Item
									checkbox
										class="justify-between capitalize"
										on:select={(e) => {
											e.detail.preventDefault();
										}}
									>
											{column.value}
										<!-- <Switch
											id={column.key.toString()}
											bind:group={currentTableColumns}
											value={column}
											defaultChecked
											disabled={currentTableColumns.includes(column) &&
												currentTableColumns.length === 1}
										/> -->
									</Item>
									
								{/each}
							</Content>
						</Menu>
					{/if}
				</th>
			</tr>
		</thead>
		<tbody
			class={cn(
				'[&_tr:last-child]:border-none relative',
				filled && "before:content-['-'] before:leading-3 before:block before:invisible",
				lined && '[&_tr]:border-b'
			)}
		>
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
					class="group aria-disabled:opacity-40 aria-disabled:pointer-events-none border-muted transition-colors data-[state=selected]:bg-accent-500/10 data-[state=selected]:hover:bg-accent-600/10 hover:bg-base-200/50 dark:hover:bg-base-900/50 focus:bg-base-200/80 dark:focus:bg-base-900/80 outline-none data-[state=selected]:focus:bg-accent-600/20"
					data-state={selected.includes(item.id) ? 'selected' : null}
				>
					{#if selectable}
						<td
							class={cn(
								'px-2.5 align-middle text-left',
								filled && 'group-first:rounded-tl-2xl group-last:rounded-bl-2xl'
							)}
						>
							<label class="p-1.5 grid place-content-center">
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
							</label>
						</td>
					{/if}
					{#each currentTableColumns as column, columnIdx (column)}
						<td
							animate:flip={{ duration: 200, easing: cubicOut }}
							data-selected={selected.includes(item.id)}
							class="px-4 py-4 tabular-nums max-w-[500px] truncate group/row"
							class:pl-0={columnIdx === 0 && selectable}
							class:pr-0={columnIdx === currentTableColumns.length - 1 && !$$slots.actions}
						>
							<slot
								name="row"
								cell={{
									key: column.key,
									value: item[column.key]
								}}
								record={item}
							>
								{item[column.key]}
							</slot>
						</td>
					{/each}
					<td
						class={cn(
							'px-4 py-1.5 align-middle text-right',
							filled && 'group-first:rounded-tr-2xl group-last:rounded-br-2xl'
						)}
					>
						{#if $$slots.actions}
							<slot row={item} index={idx} name="actions" />
						{/if}
					</td>
				</tr>
			{:else}
				<tr class="border-b p-4 border-muted transition-colors hover:bg-muted">
					<td colspan={tablesColumns.length + 2} class="text-center py-8 text-sm"> No results.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
