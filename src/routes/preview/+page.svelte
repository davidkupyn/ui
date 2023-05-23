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
		Hash,
		Fingerprint,
		DollarSign,
		MoreHorizontal,
		Crown
	} from 'lucide-svelte';
	import Tabs from '$lib/ui/tabs.svelte';
	import Pagination from '$lib/ui/pagination.svelte';
	import Switch from '$lib/ui/switch.svelte';
	import Table from '$lib/ui/table.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Disclosure from '$lib/ui/disclosure.svelte';
	import Dialog from '$lib/ui/dialog.svelte';
	import Swiper from '$lib/ui/swiper.svelte';
	import Popover from '$lib/ui/popover.svelte';

	let showPassword = false;
	const tabs = ['witalina', 'david', 'wiktor', 'gustaw'];
	const tabs2 = ['witalina', 'david', 'wiktor', 'gustaw'];

	let tab = tabs[0];
	let tab2 = tabs2[0];
	const PAGE_SIZE = 10;
	const currentPage = queryParam('page', ssp.number());
	const item = {
		id: crypto.randomUUID().slice(0, 16),
		name: 'Item',
		description: `“Well, and so we breakfasted at ten as usual; I thought it would never be over; for, by the bye, you are to understand, that my uncle and aunt were horrid unpleasant all the time I was with them. If you’ll believe me, I did not once put my foot out of doors, though I was there a fortnight. Not one party, or scheme, or anything. To be sure London was rather thin, but, however, the Little Theatre was open. Well, and so just as the carriage came to the door, my uncle was called away upon business to that horrid man Mr. Stone. And then, you know, when once they get together, there is no end of it. Well, I was so frightened I did not know what to do, for my uncle was to give me away; and if we were beyond the hour, we could not be married all day. But, luckily, he came back again in ten minutes’ time, and then we all set out. However, I recollected afterwards that if he had been prevented going, the wedding need not be put off, for Mr. Darcy might have done as well.”`,
		price: Math.floor(Math.random() * 1000),
		createdAt: new Date(),
		status: Math.random() > 0.41 ? 'active' : 'inactive'
	};
	let items = Array.from({ length: 100 }, (_, i) => ({
		id: crypto.randomUUID().slice(0, 16),
		name: `Item ${i + 1}`,
		description: `“Well, and so we breakfasted at ten as usual; I thought it would never be over; for, by the bye, you are to understand, that my uncle and aunt were horrid unpleasant all the time I was with them. If you’ll believe me, I did not once put my foot out of doors, though I was there a fortnight. Not one party, or scheme, or anything. To be sure London was rather thin, but, however, the Little Theatre was open. Well, and so just as the carriage came to the door, my uncle was called away upon business to that horrid man Mr. Stone. And then, you know, when once they get together, there is no end of it. Well, I was so frightened I did not know what to do, for my uncle was to give me away; and if we were beyond the hour, we could not be married all day. But, luckily, he came back again in ten minutes’ time, and then we all set out. However, I recollected afterwards that if he had been prevented going, the wedding need not be put off, for Mr. Darcy might have done as well.”`,
		price: Math.floor(Math.random() * 1000),
		createdAt: new Date(),
		status: Math.random() > 0.41 ? 'active' : 'inactive'
	}));

	$: paginatedItems = $currentPage
		? items.slice(($currentPage - 1) * PAGE_SIZE, $currentPage * PAGE_SIZE)
		: items.slice(0, PAGE_SIZE);

	let selected: string[] = [];
	let openDialog: () => void;
	let closeDialog: () => void;
	let openDeleteDialog: () => void;
	let closeDeleteDialog: () => void;

	$: totalPages = Math.ceil(items.length / PAGE_SIZE) || 1;
</script>

<main in:fade={{ duration: 100 }} class="py-8 w-full flex flex-col gap-6 container mx-auto px-6">
	<div class="w-full max-w-[40rem] flex flex-col gap-6">
		<label class="input-group">
			<Search size={16} class="icon-left" />
			<input placeholder="Search..." />
		</label>
		<label class="input-label w-full">
			Normal Input
			<input class="input" placeholder="Placeholder" />
		</label>
		<label class="input-label w-full">
			<span>
				Password <span class="text-red-500">*</span>
			</span>
			<fieldset class="input-group" disabled={false}>
				<Lock size={16} class="icon-left" />
				<input type="password" placeholder="Password" />
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
				<textarea class="h-full text-sm" placeholder="Description" />
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
			<button class="btn btn-outline">
				<Send size={16} />
				Outline
			</button>
			<button class="btn btn-secondary">
				<Send size={16} />
				Secondary
			</button>
			<button class="btn btn-danger"> Danger </button>
			<button class="btn btn-ghost"> Ghost </button>
			<button class="btn btn-ghost p-2 h-fit" use:tippy={{ content: 'Ghost icon button' }}>
				<QrCode size={20} />
			</button>

			<button class="btn btn-link">Link</button>
			<button class="btn btn-text">Text</button>

			<button class="btn btn-link btn-secondary">Link Secondary</button>
		</div>
		<div class="w-full border border-subtle rounded-xl">
			<Tabs {tabs} bind:currentTab={tab} />
		</div>
		<div class="w-full rounded-xl bg-base-300/50 dark:bg-base-800/50">
			<Tabs tabs={tabs2} bind:currentTab={tab2} transparent>
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
			</Tabs>
		</div>
		<div class="flex flex-wrap gap-4">
			<span class="badge badge-capitalize"> Primary </span>
			<span class="badge badge-outline capitalize"> Outline </span>
			<span class="badge badge-secondary capitalize"> Secondary </span>
			<span class="badge badge-success capitalize"> Success </span>

			<span class="badge badge-danger capitalize"> Danger </span>
		</div>

		<label for="switch" class="flex items-center gap-2 text-sm">
			<Switch id="switch" />
			Toggle
		</label>
	</div>
	<div class="w-full max-w-md grid gap-4 border border-subtle rounded-3xl p-4">
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

	<!-- <button
		on:click={openDialog}
		class="btn btn-lg w-fit hover:bg-primary-500 dark:hover:bg-primary-600 hover:scale-105 transition hover:shadow-xl duration-300"
	>
		<AppWindow size={16} />
		Open Dialog
	</button> -->
	<button on:click={openDialog} class="btn btn-lg w-fit">
		<AppWindow size={16} />
		Open Dialog
	</button>

	<Dialog bind:close={closeDialog} bind:open={openDialog}>
		<form class="grid gap-4" slot="panel" method="">
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
				<button type="button" on:click={() => closeDialog()} class="btn btn-outline w-full">
					Cancel
				</button>
				<button type="submit" class="btn w-full"> Confirm </button>
			</div>
		</form>
	</Dialog>
	<div class="flex flex-col items-center w-full">
		<div class="w-full border border-subtle rounded-3xl overflow-hidden">
			<Table
				items={paginatedItems}
				id="id"
				tableColumns={Object.keys(item).map((key) => ({
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
				<!-- rowClickable
				on:rowclick={(event) => console.log('clicked on', event.detail.name)} -->
				<Popover
					slot="actions"
					let:row
					let:index
					position={index >= paginatedItems.length - 2 ? 'top-end' : 'bottom-end'}
				>
					<button
						slot="button"
						let:button
						use:button
						class="btn btn-ghost p-2 h-fit"
						use:tippy={{ content: 'View Actions' }}
						on:click|stopPropagation
					>
						<MoreHorizontal size={20} />
					</button>
					<ul slot="panel" class="w-40 divide-y divide-base-200 dark:divide-base-900">
						<li class="px-1 py-1">
							<button
								class="btn btn-ghost w-full justify-start"
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
								class="btn btn-ghost w-full justify-start"
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

				<svelte:fragment slot="row" let:row let:column>
					{#if column.name === 'id'}
						<span class="flex items-center gap-2">
							<Fingerprint class="text-base-500" size={16} />
							{row[column.name]}
						</span>
					{:else if column.name === 'description'}
						<Hash class="inline mr-1 text-base-500" size={16} />
						{row[column.name]}
					{:else if column.name === 'price'}
						<span class="flex items-center">
							<DollarSign class="text-base-500" size={16} />
							{row[column.name]}
						</span>
					{:else if column.name === 'status'}
						<span
							class="badge capitalize {row[column.name] === 'inactive'
								? 'badge-danger'
								: 'badge-success'}"
						>
							{row[column.name]}
						</span>
					{:else if column.name === 'createdAt'}
						{row[column.name].toLocaleDateString('pl')}
					{:else}
						{row[column.name]}
					{/if}
				</svelte:fragment>
			</Table>
		</div>
		<div class="sticky bottom-24 z-20 h-12 w-96 max-md:w-full mx-auto my-2">
			{#if selected.length > 0}
				<div
					transition:fly={{ y: 150, duration: 200, easing: cubicOut }}
					class="drop-shadow-sm z-20 flex h-full w-full items-center justify-between rounded-xl bg-base-50/80 border dark:bg-base-950 border-subtle backdrop-blur-md shadow-xl p-2 px-4"
				>
					<span class="text-sm">
						Selected

						<b>{selected.length}</b>
						{selected.length === 1 ? 'item' : 'items'}
					</span>
					<div class="flex gap-4">
						<button
							on:click={openDeleteDialog}
							aria-label="Delete items"
							class="btn btn-ghost p-1.5 h-fit rounded-md"
							use:tippy={{ content: 'Delete items' }}
						>
							<Trash2 size={20} />
						</button>

						<button
							aria-label="Discard selection"
							class="btn btn-ghost p-1.5 h-fit rounded-md"
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
	<div class="my-8">
		<Swiper />
	</div>
</main>

<Dialog bind:close={closeDeleteDialog} bind:open={openDeleteDialog}>
	<form class="grid gap-4 w-full sm:w-72" slot="panel">
		<h2 class="font-semibold text-lg">Are you sure?</h2>

		<div class="flex gap-4 mt-4 w-full">
			<button type="button" on:click={() => closeDeleteDialog()} class="btn btn-outline w-full">
				Cancel
			</button>
			<button
				type="submit"
				class="btn btn-danger w-full"
				on:click={() => {
					items = items.filter((item) => !selected.includes(item.id));
					selected = [];
					closeDeleteDialog();
				}}
			>
				Delete
			</button>
		</div>
	</form>
</Dialog>
