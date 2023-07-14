<script lang="ts">
	import { Menu } from '../menu';

	import { cn } from '$lib/helpers/style';
	import { ChevronDown, ChevronUp, Settings2 } from 'lucide-svelte';
	import { tippy } from '$lib/actions/tippy';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';

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

<thead
  class={cn(
    filled && 'bg-base-200/50 dark:bg-base-900/50',
    lined && !filled && '[&_tr]:border-b'
  )}
>
  <tr class="border-muted">
    {#if selectable}
      <th class={cn('px-4 py-1.5 align-middle text-left', filled && 'rounded-l-2xl')}>
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
          <Trigger class="btn btn-ghost btn-icon ">
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