<script lang="ts">
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { tippy } from '$lib/actions/tippy';
	import {
		Send,
		Search,
		X,
		Eye,
		Edit,
		Lock,
		EyeOff,
		Cpu,
		Github,
		QrCode,
		Trash2,
		AppWindow,
		Hash
	} from 'lucide-svelte';
	import Tabs from '../lib/ui/tabs.svelte';
	import Pagination from '$lib/ui/pagination.svelte';
	import Switch from '$lib/ui/switch.svelte';
	import Table from '$lib/ui/table.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Disclosure from '$lib/ui/disclosure.svelte';
	import Dialog from '$lib/ui/dialog.svelte';

	let showPassword = false;
	const tabs = ['witalina', 'david', 'wiktor', 'gustaw'];
	let tab = tabs[0];

	const currentPage = queryParam('page', ssp.number());

	$: items = Array.from({ length: 100 }, (_, i) => ({
		id: crypto.randomUUID().slice(0, 20),
		name: `Item ${i}`,
		description: `aliquip fugiat dolor consequat voluptate aliqua irure nulla officia magna quis commodo fugiat sit anim duis ea eu do sunt velit culpa anim non velit enim dolore incididunt id minim dolore irure quis nulla laboris non ${i}`,
		price: `$${Math.floor(Math.random() * 1000)}`,
		status: Math.random() > 0.41 ? 'active' : 'inactive'
	}));

	$: paginatedItems = $currentPage
		? items.slice(($currentPage - 1) * 10, $currentPage * 10)
		: items.slice(0, 10);

	let selected: string[] = [];
	let closeDialog: () => void;
</script>

<main class="p-8 min-h-screen w-full flex flex-col gap-6">
	<div class="w-full max-w-[40rem] flex flex-col gap-6">
		<h1 class="text-2xl font-bold text-base-800 dark:text-base-200 md:text-3xl">Dave Kupyn's UI</h1>
		<label class="input-group">
			<span class="icon-left">
				<Search size={16} class="icon-left" />
			</span>
			<input placeholder="Search..." />
		</label>
		<label class="input-label w-full">
			Normal Input
			<input class="input" placeholder="Placeholder" />
		</label>
		<label class="input-label w-full">
			Password
			<fieldset class="input-group" disabled={false}>
				<Lock size={16} class="icon-left" />
				<input type="password" placeholder="Password" />
				<button
					type="button"
					class="icon-right"
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
				<input class="text-xl font-medium my-3" placeholder="Title" />
				<textarea class="h-full" placeholder="Description" />
			</fieldset>
		</label>
		<label class="input-label w-full">
			Normal Text Area
			<textarea class="h-24 input" placeholder="Placeholder" />
		</label>
		<div
			class="flex flex-wrap gap-2 w-full
  "
		>
			<button class="btn">
				<Github size={16} />
				Primary
			</button>
			<button class="btn outline">
				<Send size={16} />
				Outline
			</button>
			<button class="btn secondary">
				<Send size={16} />
				Secondary
			</button>
			<button class="btn destructive"> Destructive </button>
			<button class="btn ghost"> Ghost </button>
			<button class="btn ghost p-2 h-fit" use:tippy={{ content: 'Ghost icon button' }}>
				<QrCode size={20} />
			</button>

			<button class="btn link">Link</button>
			<button class="btn text">Text</button>

			<button class="btn link secondary">Link Secondary</button>
		</div>
		<div class="w-full border border-base-300 dark:border-base-900 rounded-xl">
			<Tabs {tabs} bind:currentTab={tab} />
		</div>
		<div class="space-x-2">
			<span class="badge capitalize"> Primary </span>
			<span class="badge outline capitalize"> Outline </span>
			<span class="badge secondary capitalize"> Secondary </span>
			<span class="badge success capitalize"> Success </span>

			<span class="badge destructive capitalize"> Destructive </span>
		</div>

		<label for="switch" class="flex items-center gap-2 text-sm">
			<Switch id="switch" />
			Switch this
		</label>
	</div>
	<div
		class="w-full max-w-md grid gap-4 border border-base-300/50 dark:border-base-900 rounded-3xl p-4"
	>
		<Disclosure
			defaultExpanded
			summary="What is your refund policy?"
			content="If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked."
		/>
		<Disclosure>
			<Cpu size={16} slot="icon" />
			<svelte:fragment slot="summary">Do you offer technical support?</svelte:fragment>
			<svelte:fragment slot="content">
				No. We don't offer any support. However, we do have a very active community where we chime
				in all the time.
			</svelte:fragment>
		</Disclosure>
		<Disclosure
			summary="What about updates?"
			content="We don't offer any updates. However, we do have a very active community where we chime in all the time."
		/>
	</div>
	<Dialog bind:close={closeDialog}>
		<button slot="button" let:open on:click={() => open()} class="btn">
			<AppWindow size={16} />
			Open Dialog
		</button>
		<form class="grid gap-4" slot="panel">
			<h2 class="font-semibold text-md">Edit Profile</h2>
			<label class="input-label w-full sm:w-72">
				Username
				<input class="input" placeholder="Dave Kupyn" />
			</label>
			<label class="input-label w-full sm:w-72">
				Email
				<input class="input" placeholder="dkupyn@gmail.com" />
			</label>
			<div class="flex gap-4 mt-4 w-full">
				<button type="button" on:click={() => closeDialog()} class="btn outline w-full">
					Cancel
				</button>
				<button class="btn w-full"> Confirm </button>
			</div>
		</form>
	</Dialog>
	<div class="flex flex-col items-center w-full max-w-7xl">
		<div class="w-full border border-base-300/50 dark:border-base-900 rounded-3xl overflow-hidden">
			<Table
				items={paginatedItems}
				id="id"
				tableColumns={Object.keys(items[0]).map((key) => ({
					displayName: key
						.replace(/_/g, ' ')
						.replace(/([A-Z])/g, ' $1')
						.replace(/^./, (str) => str.toUpperCase()),
					name: key
				}))}
				bind:selected
				columnsEditable
				selectable
			>
				<ul slot="actions" class="w-40 divide-y divide-base-200 dark:divide-base-900" let:row>
					<li class="px-1 py-1">
						<button
							class="btn ghost w-full justify-start"
							on:click={() => {
								console.log('edit');
							}}
						>
							<Edit size={20} class="mr-2" />
							Edit
						</button>
					</li>
					<li class="px-1 py-1">
						<button
							class="btn ghost w-full justify-start"
							on:click={() => {
								items = items.filter((item) => item.id !== row.id);
							}}
						>
							<Trash2 size={20} class="mr-2" />
							Delete
						</button>
					</li>
				</ul>
				<svelte:fragment slot="row" let:row let:column>
					{#if column.name === 'description'}
						<Hash class="inline mr-1 text-base-500" size={16} /> {row[column.name]}
					{:else if column.name === 'status'}
						<span class="badge {row[column.name] === 'inactive' ? 'destructive' : 'success'}">
							{row[column.name]}
						</span>
					{:else}
						{row[column.name]}
					{/if}
				</svelte:fragment>
			</Table>
		</div>
		<div class="sticky bottom-24 z-20 h-12 w-96 max-md:w-full mx-auto">
			{#if selected.length > 0}
				<div
					transition:fly={{ y: 150, duration: 200, easing: cubicOut }}
					class="z-20 flex h-full w-full items-center justify-between rounded-xl bg-base-50/80 border border-base-300 dark:bg-base-950 dark:border-base-800/80 backdrop-blur-md shadow-xl p-2 px-4"
				>
					<span class="text-sm">
						Selected

						<b>{selected.length}</b>
						{selected.length === 1 ? 'item' : 'items'}
					</span>
					<div class="flex gap-4">
						<button
							aria-label="Delete items"
							class="btn ghost p-1.5 h-fit rounded-md"
							use:tippy={{ content: 'Delete items' }}
						>
							<Trash2 size={20} />
						</button>
						<button
							aria-label="Discard selection"
							class="btn ghost p-1.5 h-fit rounded-md"
							use:tippy={{ content: 'Discard selection' }}
							on:click={() => (selected = [])}
						>
							<X size={20} />
						</button>
					</div>
				</div>
			{/if}
		</div>
		<Pagination totalPages={10} />
	</div>
</main>
