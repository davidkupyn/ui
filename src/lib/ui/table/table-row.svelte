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
					class="group aria-disabled:opacity-40 aria-disabled:pointer-events-none border-muted transition-colors data-[state=selected]:bg-accent-500/10 data-[state=selected]:hover:bg-accent-600/10 hover:bg-base-200/50 dark:hover:bg-base-900/50 focus:bg-base-200/80 dark:focus:bg-base-900/80 outline-none data-[state=selected]:focus:bg-accent-600/20"
					data-state={selected.includes(item) ? 'selected' : null}
				>
					{#if selectable}
						<td
							class={cn(
								'px-4 py-1.5 align-middle text-left',
								filled && 'group-first:rounded-tl-2xl group-last:rounded-bl-2xl'
							)}
						>
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