<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { tippy } from '$lib/actions/tippy';
	import {
		Search,
		X,
		Eye,
		Edit,
		EyeOff,
		Trash2,
		AppWindow,
		Hash,
		DollarSign,
		MoreHorizontal,
		Crown,
		Stars,
		Flower2,
		BookTemplate,
		Save,
		Command,
		CalendarIcon,
		Loader2
	} from 'lucide-svelte';
	import ToggleGroup from '$lib/ui/toggle-group.svelte';
	import Pagination from '$lib/ui/pagination.svelte';
	import Switch from '$lib/ui/switch.svelte';
	import Table from '$lib/ui/table.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Disclosure from '$lib/ui/disclosure.svelte';
	import Dialog from '$lib/ui/dialog.svelte';
	import Popover from '$lib/ui/popover.svelte';
	import { Select, Option } from '$lib/ui/select';
	import Combobox from '$lib/ui/combobox.svelte';
	import Calendar from '$lib/ui/calendar.svelte';

	let showPassword = false;
	const tabs = ['witalina', 'david', 'wiktor', 'gustaw'];
	const tabs2 = ['witalina', 'david', 'wiktor', 'gustaw'];

	let tab = tabs[0];
	let tab2 = tabs2[0];
	const PAGE_SIZE = 10;
	const currentPage = queryParam('page', ssp.number());

	let items = Array.from({ length: 100 }, (_, i) => ({
		id: crypto.randomUUID().slice(0, 16),
		name: `Item ${i + 1}`,
		description: `“Well, and so we breakfasted at ten as usual; I thought it would never be over; for, by the bye, you are to understand, that my uncle and aunt were horrid unpleasant all the time I was with them. If you’ll believe me, I did not once put my foot out of doors, though I was there a fortnight. Not one party, or scheme, or anything. ”`,
		price: Math.floor(Math.random() * 1000),
		createdAt: new Date(),
		status: Math.random() > 0.41 ? 'active' : 'inactive'
	}));

	$: paginatedItems = $currentPage
		? items.slice(($currentPage - 1) * PAGE_SIZE, $currentPage * PAGE_SIZE)
		: items.slice(0, PAGE_SIZE);

	let selected: string[] = [];
	let customSelectValue = 'david';
	let labelInside = false;
	$: totalPages = Math.ceil(items.length / PAGE_SIZE) || 1;

	let calendarValue: string;

	const headers = Object.keys(items[0])
		.map((key) => ({
			key,
			value: key
				.replace(/_/g, ' ')
				.replace(/([A-Z])/g, ' $1')
				.replace(/^./, (str) => str.toUpperCase())
		}))
		.filter((header) => header.key !== 'id');
</script>

<main in:fade={{ duration: 100 }} class="py-8 w-full flex flex-col gap-6 container mx-auto px-6">
	<div class="w-full max-w-[40rem] flex flex-col gap-6">
		<label class="input-group group">
			<Search size={16} class="icon-left" />
			<input spellcheck="false" autocomplete="false" placeholder="Search..." />
			<kbd class="group-focus-within:scale-90 group-focus-within:opacity-0 transition">
				<Command size="14" />
				K</kbd
			>
		</label>
		<label class="input-label w-full">
			Normal Input
			<input spellcheck="false" autocomplete="false" class="input" placeholder="Placeholder" />
		</label>
		<label class="input-label w-full">
			<span>
				Password <span class="text-red-500">*</span>
			</span>
			<fieldset class="input-group" disabled={false}>
				<input spellcheck="false" type="password" placeholder="Password" />
				<button
					type="button"
					class="btn btn-text icon-right p-1 rounded-md h-fit"
					on:click={() => {
						showPassword = !showPassword;
					}}
				>
					{#if showPassword}
						<span>
							<Eye size={20} />
						</span>
					{:else}
						<span>
							<EyeOff size={20} />
						</span>
					{/if}
				</button>
			</fieldset>
		</label>

		<label class="input-label w-full">
			Text Area
			<fieldset class="input-group h-64 flex flex-col" disabled={false}>
				<input class="!text-xl font-semibold my-3" placeholder="Title" />
				<textarea class="h-full sm:text-sm" placeholder="Description" />
			</fieldset>
		</label>
		<label for="switch" class="flex items-center gap-2 text-sm w-fit">
			Toggle switch
			<Switch id="switch" defaultChecked />
		</label>
		<label class="input-label w-full" for="autocomplete">
			<span class="{labelInside ? 'opacity-0' : 'opacity-100'} transition-opacity duration-100">
				Autocomplete
			</span>
			<Combobox
				id="autocomplete"
				placeholder="Select an option"
				label={labelInside ? 'Autocomplete' : undefined}
				items={[
					{ label: 'Witalina', value: 'witalina' },
					{ label: 'David', value: 'david' },
					{ label: 'Wiktor', value: 'wiktor' },
					{ label: 'Gustaw', value: 'gustaw' }
				]}
			/>
		</label>
		<form class="grid gap-4 border rounded-3xl border-muted p-4">
			<h2 class="font-semibold mb-2 text-md sm:text-lg text-center">Form with Select component</h2>
			<label class="input-label w-full" for="select1">
				Custom Select
				<Select
					placeholder="Select an option"
					id="select1"
					name="custom"
					bind:value={customSelectValue}
					on:change={(e) => console.log(e.detail)}
				>
					<li class="input-label py-2 pl-5 pr-5 font-semibold text-foreground">Class 3</li>
					<Option value="witalina">Witalina</Option>
					<Option value="david">David</Option>
					<Option value="wiktor">Wiktor</Option>
					<Option value="gustaw">Gustaw</Option>
				</Select>
			</label>
			<label class="input-label w-full" for="select2">
				Native Select
				<select class="input" id="select2" name="native" value="david">
					<option value="witalina">Witalina</option>
					<option value="david">David</option>
					<option value="wiktor">Wiktor</option>
					<option value="gustaw">Gustaw</option>
				</select>
			</label>
			<button class="btn mt-3">Submit</button>
		</form>

		<label class="input-label w-full">
			Normal Text Area
			<textarea class="h-24 input" placeholder="Placeholder" />
		</label>

		<Popover class="bg-transparent border-none">
			<button slot="trigger" let:trigger {...trigger} class="input-group w-full">
				<CalendarIcon size={16} class="icon-left" />
				{#if calendarValue}
					{new Date(calendarValue).toLocaleDateString('en', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				{:else}
					<span class="text-muted-foreground">Select Date</span>
				{/if}
			</button>
			<Calendar bind:value={calendarValue} slot="content" />
		</Popover>

		<div class="flex flex-wrap gap-2 w-full">
			<button class="btn">
				<Stars size={16} />
				Primary
			</button>
			<button class="btn btn-outline">
				<BookTemplate size={16} />
				Outline
			</button>
			<button class="btn btn-secondary">
				<Flower2 size={16} />
				Secondary
			</button>
			<button class="btn btn-error"> Error </button>
			<button class="btn btn-success"> Success </button>
			<button class="btn btn-warning"> Warning </button>
			<button class="btn btn-ghost"> Ghost </button>
			<button class="btn btn-ghost btn-icon" use:tippy={{ content: 'Ghost icon button' }}>
				<Save size={20} />
			</button>

			<button class="btn btn-link">Link</button>
			<button class="btn btn-text">Text</button>

			<button class="btn btn-link btn-secondary">Link Secondary</button>
			<button class="btn" disabled>
				<Loader2 class="animate-spin" size={16} />
				Loading
			</button>
		</div>
		<div class="w-full border border-muted rounded-xl">
			<ToggleGroup {tabs} bind:value={tab} on:change={(e) => console.log(e.detail)} />
		</div>
		<div class="w-full rounded-xl bg-muted">
			<ToggleGroup tabs={tabs2} bind:value={tab2} transparent>
				<span slot="tab" let:tab class="flex items-center">
					{#if tab.toLowerCase() === 'david'}
						<Crown class="mr-1 {tab2 === tab ? 'text-amber-500' : ''}" size={16} />
						<span class="capitalize">
							{tab}
						</span>
					{:else}
						{tab}
					{/if}
				</span>
			</ToggleGroup>
		</div>
		<div class="flex flex-wrap gap-4">
			<span class="badge badge-capitalize"> Primary </span>
			<span class="badge badge-outline capitalize"> Outline </span>
			<span class="badge badge-accent capitalize"> Accent </span>
			<span class="badge badge-success capitalize"> Success </span>

			<span class="badge badge-error capitalize"> Error </span>
			<span class="badge badge-warning capitalize"> Warning </span>
			<span class="badge badge-info capitalize"> Info </span>
		</div>
	</div>
	<div class="w-full max-w-md grid gap-4 border border-muted rounded-3xl p-4">
		<Disclosure>
			<svelte:fragment slot="summary">Why copy/paste and not a package?</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					The idea behind this is to give you ownership and control over the code, allowing you to
					decide how the components are built and styled.
					<br />
					<br />
					Start with some sensible defaults, then customize the components to your needs.
					<br />
					<br />
					One of the drawback of packaging the components in an npm package is that the style is coupled
					with the implementation. The design of your components should be separate from their implementation.
				</p>
			</svelte:fragment>
		</Disclosure>
		<Disclosure>
			<Stars size={16} slot="icon" />
			<svelte:fragment slot="summary">Why Essence?</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					We wanted to create a set of components that are easy to use, customizable and accessible.
					<br />

					<br />
					The word "essence" suggests something fundamental or core. Our library aims to provide essential
					or foundational UI elements, so you can focus on other parts of your app, where you can express
					your creativity.
				</p>
			</svelte:fragment>
		</Disclosure>
		<Disclosure
			summary="What about updates?"
			content="Yes, we will be updating the components regularly. We will also be adding new components."
		/>
	</div>

	<Dialog class="sm:max-w-[425px]">
		<button slot="trigger" let:trigger {...trigger()} class="btn w-fit">
			<AppWindow size={16} />
			Open Dialog
		</button>
		<svelte:fragment slot="title">Edit Profile</svelte:fragment>

		<svelte:fragment slot="description">
			Make changes to your profile here. Click save when you're done.
		</svelte:fragment>

		<form class="grid gap-4" slot="content" let:close>
			<label class="input-label w-full">
				Username
				<input class="input" placeholder="Dave Kupyn" />
			</label>
			<label class="input-label w-full">
				Email
				<input class="input" placeholder="dkupyn@gmail.com" />
			</label>
			<div class="flex gap-4 mt-4 w-full">
				<button {...close()} type="button" class="btn btn-outline w-full"> Cancel </button>
				<button type="submit" class="btn w-full"> Confirm </button>
			</div>
		</form>
	</Dialog>
	<div class="flex flex-col items-center w-full">
		<div class="w-full border border-muted rounded-3xl overflow-hidden">
			<Table
				items={paginatedItems}
				{headers}
				disabledKeys={[items[7].id]}
				bind:selected
				selectable
				columnsEditable
			>
				<!-- interactive
				on:rowclick={({ detail: row }) => console.log('clicked on', row.name)} -->
				<Popover slot="actions" let:row placement="bottom-end">
					<button
						slot="trigger"
						let:trigger
						{...trigger}
						class="btn btn-ghost btn-icon"
						use:tippy={{ content: 'View Actions' }}
						on:click|stopPropagation
					>
						<MoreHorizontal size={20} />
					</button>
					<ul slot="content" class="w-40 divide-y divide-muted">
						<li class="px-1 py-1">
							<button
								class="btn btn-ghost w-full justify-start active:scale-100"
								on:click|stopPropagation={() => {
									console.log('edit');
								}}
							>
								<Edit size={20} class="mr-2" />
								Edit
							</button>
						</li>
						<li class="px-1 py-1">
							<button
								class="btn btn-ghost w-full justify-start active:scale-100"
								on:click|stopPropagation={() => {
									items = items.filter((item) => item.id !== row.id);
									selected = selected.filter((item) => item !== row.id);
								}}
							>
								<Trash2 size={20} class="mr-2" />
								Delete
							</button>
						</li>
					</ul>
				</Popover>
				<svelte:fragment slot="row-header" let:header>
					{#if header.key === 'createdAt'}
						<span class="flex items-center gap-2 w-28">
							<CalendarIcon size={16} />
							{header.value}
						</span>
					{:else}
						{header.value}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="row" let:cell>
					{#if cell.key === 'description'}
						<Disclosure class="group-data-[selected=true]/row:hover:bg-accent-500/20 -my-1">
							<Hash size={16} slot="icon" />
							<svelte:fragment slot="summary">
								<span class="max-w-sm truncate max-sm:text-base">
									{cell.value}
								</span>
							</svelte:fragment>
							<svelte:fragment slot="content">
								<p class="max-sm:text-base max-w-sm whitespace-normal">
									{cell.value}
								</p>
							</svelte:fragment>
						</Disclosure>
					{:else if cell.key === 'price'}
						<span class="flex justify-end items-center w-16">
							<DollarSign class="text-muted-foreground" size={16} />
							{cell.value}
						</span>
					{:else if cell.key === 'status'}
						<span
							class="badge capitalize {cell.value === 'inactive' ? 'badge-error' : 'badge-success'}"
						>
							{cell.value}
						</span>
					{:else if cell.key === 'createdAt'}
						{cell.value.toLocaleDateString('pl')}
					{:else}
						{cell.value}
					{/if}
				</svelte:fragment>
			</Table>
		</div>
		<div class="sticky bottom-24 z-20 h-11 w-96 max-md:w-full mx-auto my-2">
			{#if selected.length > 0}
				<div
					transition:fly={{ y: 150, duration: 200, easing: cubicOut }}
					class="drop-shadow-sm z-20 flex h-full w-full items-center justify-between rounded-xl bg-base-50/80 border dark:bg-base-950/80 border-muted backdrop-blur-md shadow-xl dark:shadow-base-950 p-2 px-4"
				>
					<span class="text-sm">
						Selected

						<b>{selected.length}</b>
						{selected.length === 1 ? 'item' : 'items'}
					</span>
					<div class="flex gap-4">
						<Dialog class="sm:w-96" alert>
							<button
								slot="trigger"
								let:trigger
								{...trigger()}
								aria-label="Delete items"
								class="btn btn-ghost btn-icon btn-sm rounded-lg"
								use:tippy={{ content: 'Delete items' }}
							>
								<Trash2 size={20} />
							</button>
							<svelte:fragment slot="title">Are you sure?</svelte:fragment>
							<svelte:fragment slot="description"
								>This action cannot be undone. This will permanently delete
								{selected.length === 1 ? 'this item' : 'these items'}.
							</svelte:fragment>
							<form slot="content" class="grid gap-4 w-full" let:close>
								<div class="flex gap-4 mt-4 w-full max-sm:flex-col-reverse">
									<button type="button" {...close()} class="btn btn-outline w-full">
										Cancel
									</button>
									<button
										type="submit"
										class="btn btn-error w-full"
										on:click={() => {
											items = items.filter((item) => !selected.includes(item.id));
											selected = [];
											// closeDeleteDialog();
										}}
									>
										Delete
									</button>
								</div>
							</form>
						</Dialog>
						<button
							aria-label="Discard selection"
							class="btn btn-ghost btn-icon btn-sm rounded-lg"
							use:tippy={{ content: 'Discard selection' }}
							on:click={() => (selected = [])}
						>
							<X size={20} />
						</button>
					</div>
				</div>
			{/if}
		</div>
		<Pagination {totalPages} />
	</div>
</main>
