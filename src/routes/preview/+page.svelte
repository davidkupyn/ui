<script lang="ts">
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
		Stars,
		Flower2,
		BookTemplate,
		Save,
		Command,
		CalendarIcon,
		Bot,
	} from 'lucide-svelte';
	import Pagination from '$lib/ui/pagination.svelte';
	import Switch from '$lib/ui/switch.svelte';
	import Table from '$lib/ui/old-table.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Select } from '$lib/ui/select';
	import Combobox from '$lib/ui/combobox.svelte';
	import Calendar from '$lib/ui/calendar.svelte';
	import { Modal, type ModalTrigger  } from '$lib/ui/modal';
	import { Avatar } from '$lib/ui/avatar';
	import { Accordion } from '$lib/ui/accordion';
	import { Disclosure } from '$lib/ui/disclosure';
	import { Popover } from '$lib/ui/popover';
	import { Tabs } from '$lib/ui/tabs';
	import { Menu } from '$lib/ui/menu';
	import { HoverCard } from '$lib/ui/hover-card';
	import Separator from '$lib/ui/separator.svelte';
	import Kbd from '$lib/ui/kbd.svelte';
	import Badge from '$lib/ui/badge.svelte';
	import Slider from '$lib/ui/slider.svelte';
	import { RadioGroup } from '$lib/ui/radio-group';
	import Progress from '$lib/ui/progress.svelte';
	import Button, { buttonStyles } from '$lib/ui/button.svelte';
	import { Card } from '$lib/ui/card';
	import { cn } from '$lib/helpers/style';
	import { page } from '$app/stores';

	let showPassword = false;
	const tabs = ['witalina', 'david', 'wiktor', 'gustaw'];
	const PAGE_SIZE = 10;
	$: currentPage = Number($page.url.searchParams.get('page') || '1');
let buttonLoading = false;
	let items = Array.from({ length: 100 }, (_, i) => ({
		id: crypto.randomUUID().slice(0, 16),
		name: `Item ${i + 1}`,
		description: `“Well, and so we breakfasted at ten as usual; I thought it would never be over; for, by the bye, you are to understand, that my uncle and aunt were horrid unpleasant all the time I was with them. If you’ll believe me, I did not once put my foot out of doors, though I was there a fortnight. Not one party, or scheme, or anything. ”`,
		price: Math.floor(Math.random() * 1000),
		createdAt: new Date(),
		status: Math.random() > 0.41 ? 'active' : 'inactive'
	}));
	let sliderValue = 20;
	$: paginatedItems = currentPage
		? items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
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

		let dialogOpen = false;
		let deleteModalOpen = false;
		let deleteModalTrigger: ModalTrigger;
		let toDelete: string[] = [];
</script>

<main in:fade={{ duration: 100 }} class="py-8 w-full space-y-6 container mx-auto px-4 sm:px-6">
	<div class="w-full max-w-[40rem] flex flex-col gap-6">
		<label class="input-group group">
			<Search size=16 class="icon-left" />
			<input spellcheck="false" autocomplete="false" placeholder="Search..."/>
			<Kbd class="group-focus-within:scale-75 max-sm:hidden transition group-focus-within:opacity-0 dark:bg-background">
				<Command size="12" />
				K
			</Kbd>
		</label>
		<label class="input-label w-full">
			<span>
				Normal Input <span class="text-muted-foreground text-xs">(optional)</span>
			</span>
			<input spellcheck="false" type='text' class="input" />
		</label>
		<label class="input-label w-full">
			<span>
				Password
			</span>
			<fieldset class="input-group" disabled={false}>
				<input spellcheck="false" type="password" placeholder="Password" />
				<Button
					type="button"
					class="icon-right p-0"
					size="icon"
					variant="text"
					on:click={() => {
						showPassword = !showPassword;
					}}
				>
					{#if showPassword}
						<span>
							<Eye size=20 />
						</span>
					{:else}
						<span>
							<EyeOff size=20 />
						</span>
					{/if}
					</Button>
			</fieldset>
		</label>

		<label class="input-label w-full">
			Text Area
			<fieldset class="input-group h-64 flex flex-col">
				<input class="!text-xl font-semibold mt-1" placeholder="Title" />
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
		<Card let:Header let:Footer class="max-w-md">
			<Header let:Title let:Description>
				<Title>Form example</Title>
				<Description>Using custom and native select components</Description>
			</Header>
				<form
					class="grid gap-4"
				>
					<label class="input-label w-full" for="select1">
						Custom Select
						<Select
							let:Group
							placeholder="Select an option"
							id="select1"
							name="custom"
							bind:value={customSelectValue}
							on:change={(e) => console.log(e.detail)}
						>
							<Group let:Option let:Label>
								<Label>Class 3</Label>
								<Option value="witalina">Witalina</Option>
								<Option value="david">David</Option>
								<Option value="wiktor">Wiktor</Option>
								<Option value="gustaw">Gustaw</Option>
							</Group>
							<Group let:Option let:Label>
								<Label>Class 1</Label>
								<Option value="szymon">Szymon</Option>
								<Option value="aleks">Aleks</Option>
							</Group>
						</Select>
					</label>
					<label class="input-label w-full" for="select2">
						Native Select
						<select class="input" id="select2" name="native" value="david">
							<optgroup label="Class 3">
								<option value="witalina">Witalina</option>
								<option value="david">David</option>
								<option value="wiktor">Wiktor</option>
								<option value="gustaw">Gustaw</option>
							</optgroup>
							<optgroup label="Class 1">
								<option value="szymon">Szymon</option>
								<option value="aleks">Aleks</option>
							</optgroup>
						</select>
					</label>
					<Button class="mt-4">Submit</Button>
				</form>
		</Card>

		<label class="input-label w-full">
			Normal Text Area
			<textarea class="h-24 input" placeholder="Placeholder" />
		</label>
		<Popover let:Trigger let:Content>
			<Trigger class="input-group w-full">
				<CalendarIcon size=16 class="icon-left" />
				{#if calendarValue}
					{new Date(calendarValue).toLocaleDateString('en', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				{:else}
					<span class="text-muted-foreground">Select Date</span>
				{/if}
			</Trigger>
			<Content class="bg-transdparent border-none shadow-none">
				<Calendar bind:value={calendarValue} />
			</Content>
		</Popover>

		<div class="flex flex-wrap gap-2 w-full">
			<Button>
				<Stars size=16 />
				Primary
			</Button>
			<Button variant="outline">
				<BookTemplate size=16 />
				Outline
			</Button>
			<Button variant="secondary">
				<Flower2 size=16 />
				Secondary
			</Button>
			<Button variant="error"> Error </Button>
			<Button variant="success"> Success </Button>
			<Button variant="warning"> Warning </Button>
			<Button variant="info"> Info </Button>
			<Button variant="ghost"> Ghost </Button>
			<Button variant="link">Link</Button>
			<Button size='icon' variant="ghost">
				<Save size=20 />
			</Button>
			<Button variant="text">
				Text
			</Button>

			<Button disabled={buttonLoading} loading={buttonLoading} on:click={
				() => {
					buttonLoading = true;
					setTimeout(() => {
						buttonLoading = false;
					}, 2500);
				}
			}>
				Submit
			</Button>

		</div>

		<Tabs let:List let:Content value={tabs[1]} on:change={(e) => console.log(e.detail)}>
			<List
			disabled={[tabs[3]]}
				{tabs}
			/>
			{#each tabs as tab (tab)}
				<Content value={tab} class="capitalize">
					{tab} content
				</Content>
			{/each}
		</Tabs>
		<Separator />
	
		<div class="flex flex-wrap gap-4">
			<Badge>Default</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="accent">Accent</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="error">Error</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="info">Info</Badge>
		</div>
		<div class="flex flex-wrap gap-4">
			<Badge subtle>Default</Badge>
			<Badge subtle variant="outline">Outline</Badge>
			<Badge subtle variant="accent">Accent</Badge>
			<Badge subtle variant="success">Success</Badge>
			<Badge subtle variant="error">Error</Badge>
			<Badge subtle variant="warning">Warning</Badge>
			<Badge subtle variant="info">Info</Badge>
		</div>
	</div>
	<Slider bind:value={sliderValue} class="max-w-md" />
	<Disclosure let:Trigger let:Content class="max-w-md" unstyled let:open>
		<Progress bind:value={sliderValue} />
		<Trigger class={cn(buttonStyles({variant: 'text'}),"flex gap-2 mx-auto mt-4")}>
			{#if open}
				<span class="w-32" in:scale={{start: 0.95}}>Hide extra variants</span>
			{:else}
				<span class="w-32" in:scale={{start: 0.95}}>Show more variants</span>
			{/if}
		</Trigger>
		<Content class="space-y-6 mt-4">
			<Progress bind:value={sliderValue} variant="success"/>
			<Progress bind:value={sliderValue} variant="error"/>
			<Progress bind:value={sliderValue} variant="warning"/>
			<Progress bind:value={sliderValue} variant="info"/>
		</Content>
	</Disclosure>
	
	<RadioGroup let:Radio value='3'>
		<Radio value="1" class="focus-within:ring-1 transition focus-within:ring-accent rounded-2xl bg-background ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4">
			<span class="flex flex-col gap-1.5">
				<span class="font-medium">Startup</span>
				<span class="text-muted-foreground text-sm">12GB/6 CPUs · 160 GB SSD disk</span>
			</span>
		</Radio>
		<Radio value="2" class="focus-within:ring-1 transition focus-within:ring-accent rounded-2xl bg-background ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4">
			<span class="flex flex-col gap-1.5">
				<span class="font-medium">Business</span>
				<span class="text-muted-foreground text-sm">16GB/8 CPUs · 512 GB SSD disk</span>
			</span>
		</Radio>
		<Radio value="3" class="focus-within:ring-1 transition focus-within:ring-accent rounded-2xl bg-background ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4">
			<span class="flex flex-col gap-1.5">
				<span class="font-medium">Enterprise</span>
				<span class="text-muted-foreground text-sm">32GB/12 CPUs · 1024 GB SSD disk</span>
			</span>
		</Radio>
	</RadioGroup>
	<RadioGroup let:Radio value='1'>
		<Radio value='one' />
		<Radio value='two' />
		<Radio value='three' />
	</RadioGroup>
	<div class="mt-4 flex gap-4 items-center">
		<Avatar
			squared
			src="https://avatars.githubusercontent.com/u/1162160?v=4"
			alt="Rich Harris"
			fallback="RH"
		/>
		<HoverCard let:Trigger let:Content>
			<Trigger>
				<Avatar
					class="w-16"
					src="https://avatars.githubusercontent.com/u/1162160?v=4"
					alt="Rich Harris"
					let:Fallback
				>
					<Fallback>
						<Bot size=16 />
					</Fallback>
				</Avatar>
			</Trigger>
			<Content>Hover Card!</Content>
		</HoverCard>
	</div>
	<Card class="max-w-md p-4">
		<Accordion
			let:Item
			value="smth"
		>
			<Item value='smth2' let:Trigger let:Content>
				<Trigger>Why copy/paste and not a package?</Trigger>
				<Content>
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
				</Content>
			</Item>
			<Item value='smth' let:Trigger let:Content>
				<Trigger>
					<Stars size=16 />
					Why Essence?
				</Trigger>
				<Content>
					<p>
						We wanted to create a set of components that are easy to use, customizable and accessible.
						<br />
	
						<br />
						The word "essence" suggests something fundamental or core. Our library aims to provide essential
						or foundational UI elements, so you can focus on other parts of your app, where you can express
						your creativity.
					</p>
				</Content>
			</Item>
			<Item summary="What about updates?" details="Yes, we will be updating the components regularly. We will also be adding new components."/>
		</Accordion>
	</Card>
	<Modal let:Trigger let:Content bind:open={dialogOpen}>
		<Trigger>
			<AppWindow size=16 />
			Open Modal
		</Trigger>
		<Content let:Header let:Footer let:close class="sm:max-w-[425px]">
			<Header let:Title let:Description>
				<Title>Edit Profile</Title>
				<Description>Make changes to your profile here. Click save when you're done.</Description>
			</Header>
			<form class="grid gap-2">
				<label class="input-label w-full">
					Username
					<input class="input" type='text' placeholder="Dave Kupyn" />
				</label>
				<label class="input-label w-full">
					Email
					<input class="input" type='text' placeholder="dkupyn@gmail.com" />
				</label>
				<Footer class="mt-6">
					<Button 
						melt={close}
						type="button"
						variant='outline'
						>
						Cancel
					</Button>
					<Button type="submit">Confirm</Button>
				</Footer>
			</form>
		</Content>
	</Modal>
	<!-- <AutoComplete let:Item>
		<Item index={0} value="1">One</Item>
		<Item index={1} value="1">One</Item>
	</AutoComplete> -->
	<div class="flex flex-col items-center w-full">
		<div class="w-full">
			<Table
				items={paginatedItems}
				{headers}
				disabledKeys={[items[7].id]}
				bind:selected
				filled
				selectable
				columnsEditable
			>
				<Menu slot="actions" let:row placement="bottom-end">
					<svelte:fragment let:Trigger let:Content>
						<Trigger variant="ghost" size="icon" class="">
							<MoreHorizontal size=16 />
						</Trigger>
						<Content let:Item class="w-40">
							<Item
								on:select={() => {
									console.log('edit');
								}}
							>
								<Edit size=16 />
								Edit
								<Kbd slot="after">E</Kbd>
							</Item>
								<Item
									danger
									melt={$deleteModalTrigger}
									on:select={() => {
										toDelete = [row.id];
									}}
								>
									<Trash2 size=16 />
									Delete
									<Kbd slot="after">D</Kbd>
								</Item>							
						</Content>
					</svelte:fragment>
				</Menu>
				<svelte:fragment slot="row-header" let:header>
					{#if header.key === 'createdAt'}
						<span class="flex items-center gap-2 w-28">
							<CalendarIcon size=16 />
							{header.value}
						</span>
					{:else}
						{header.value}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="row" let:cell>
					{#if cell.key === 'description'}
						<Disclosure let:Trigger let:Content>
							<Trigger class="group-data-[selected=true]/row:hover:bg-accent-500/20 -my-1">
								<Hash size=16 />
								<span class="max-w-sm truncate max-sm:text-base">
									{cell.value}
								</span>
							</Trigger>
							<Content>
								<p class="max-sm:text-base max-w-sm whitespace-normal">
									{cell.value}
								</p>
							</Content>
						</Disclosure>
					{:else if cell.key === 'price'}
						<span class="flex justify-end items-center w-16">
							<DollarSign class="text-muted-foreground" size=16 />
							{cell.value}
						</span>
					{:else if cell.key === 'status'}
						<Badge subtle variant={cell.value === 'inactive' ? 'error' : 'success'} class="capitalize">
							{cell.value}
						</Badge>
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
						<Button melt={$deleteModalTrigger} variant="ghost" size="icon" aria-label="Delete items" class="h-8 w-8" on:click={() => toDelete = [...selected]}>
							<Trash2 size=16 />
						</Button>
						<Button variant="ghost" size="icon" aria-label="Discard selection" class="h-8 w-8"
							on:click={() => (selected = [])}
						>
							<X size=16 />
						</Button>
					</div>
				</div>
			{/if}
		</div>
			<Pagination {totalPages} />
	</div>
</main>
<Modal bind:trigger={deleteModalTrigger} bind:open={deleteModalOpen} let:Content class="sm:max-w-[425px]" alert type="error" on:open={() => console.log('open')}>
	<Content let:Header let:Footer let:close class="sm:w-96">
		<Header let:Title let:Description>
			<Title>Delete {toDelete.length === 1 ? "this item" : "these items"}?</Title>
			<Description>You cannot undo this action.</Description>
		</Header>
		<Footer>
			<Button 
				melt={close}
				type="button"
				variant='outline'
				>
				Cancel
			</Button>
			<Button type="submit" variant='error' 
				on:click={() => {
					items = items.filter((item) => !toDelete.includes(item.id));
					toDelete = [];
					deleteModalOpen = false;
				}}
			>Delete</Button>
		</Footer>
	</Content>
</Modal>
