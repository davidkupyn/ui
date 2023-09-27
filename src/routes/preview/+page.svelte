<script lang="ts">
	import { Accordion } from '$lib/ui/accordion';
	import Button from '$lib/ui/button.svelte';
	import { Card } from '$lib/ui/card';
	import Checkbox from '$lib/ui/checkbox.svelte';
	import { Disclosure } from '$lib/ui/disclosure';
	import { Input } from '$lib/ui/input';
	import Kbd from '$lib/ui/kbd.svelte';
	import Label from '$lib/ui/label.svelte';
	import { Popover } from '$lib/ui/popover';
	import { RadioGroup } from '$lib/ui/radio-group';
	import { Select } from '$lib/ui/select';
	import Switch from '$lib/ui/switch.svelte';
	import {
		AlertCircle,
		AlertTriangle,
		AppWindow,
		BookTemplate,
		CheckCircle2,
		Command,
		DollarSign,
		Flower2,
		Info,
		RefreshCw,
		Search,
		Stars,
		ToggleRight,
		UserCog2
	} from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { Modal } from '$lib/ui/modal';
	import { Tabs } from '$lib/ui/tabs';
	import { AutoComplete } from '$lib/ui/auto-complete';
	import { Alert } from '$lib/ui/alert';
	import { CommandMenu } from '$lib/ui/command-menu';
	import Badge from '$lib/ui/badge.svelte';
	let alertType: {
		label: string;
		value: 'success' | 'warning' | 'info' | 'error';
	} = {
		label: 'Warning',
		value: 'warning'
	};
	let open = false;
	let group: string[] = [];
	$: disabled = open;
	let checked = false;
	let radioValue = 'Startup';
	let accordionValue: string = '';
	let normalInputValue = '';
	let dialogOpen = false;
	const normalInputRegex = /^[a-zA-Z0-9]{0,16}$/;

	let normalInputError = '';
	$: {
		const normalInputValid = normalInputRegex.test(normalInputValue);
		normalInputError = normalInputValid
			? ''
			: 'Input must be up to 16 characters, no special characters';
	}
	let buttonLoading = false;
	$: console.log(alertType);
</script>

<main in:fade={{ duration: 200 }} class="py-8 w-full space-y-6 container mx-auto px-4 sm:px-6">
	<div class="flex gap-6">
		<Checkbox value="checkbox 1" bind:checked bind:group />
		<Checkbox {disabled} value="checkbox 2" bind:group />
		<Switch bind:checked />
		<Checkbox value="checkbox 3" bind:group />
	</div>
	<!-- <div class="text-foreground">
		{group}
	</div> -->
	<div class="w-full max-w-[40rem] flex flex-col gap-6">
		<Input pattern="[0-9]{2}" spellcheck="false" autocomplete="false" placeholder="Search...">
			<Search size="16" slot="prefix" />
			<Kbd
				slot="suffix"
				class="group-focus-within:scale-75 max-sm:hidden transition-[transform,opacity,scale] group-focus-within:opacity-0 dark:bg-background dark:shadow-[0_1px_0_#ffffff3a]"
			>
				<Command size="12" />
				K
			</Kbd>
		</Input>
		<Input
			label="Normal Input"
			description="Up to 16 characters, no special characters"
			spellcheck="false"
			type="text"
			bind:value={normalInputValue}
			error={normalInputError}
		/>

		<label class="input-label w-full">
			Text Area
			<fieldset class="input-group h-64 flex flex-col">
				<input class="!text-xl font-semibold mt-1" placeholder="Title" />
				<textarea class="h-full sm:text-sm" placeholder="Description" />
			</fieldset>
		</label>

		<Card let:Header class="max-w-md">
			<Header let:Title let:Description>
				<Title>Form example</Title>
				<Description>Using custom and native select components</Description>
			</Header>
			<form class="grid gap-4">
				<label class="input-label w-full" for="select1">
					Custom Select
					<Select let:Group placeholder="Select an option" id="select1" name="custom">
						<Group let:Option let:Label={SelectLabel}>
							<SelectLabel>Class 3</SelectLabel>
							<Option value="witalina">Witalina</Option>
							<Option value="david">David</Option>
							<Option value="wiktor">Wiktor</Option>
							<Option value="gustaw">Gustaw</Option>
						</Group>
						<Group let:Option let:Label={SelectLabel}>
							<SelectLabel>Class 1</SelectLabel>
							<Option value="szymon">Szymon</Option>
							<Option value="aleks">Aleks</Option>
						</Group>
					</Select>
				</label>

				<AutoComplete
					label="Auto Complete"
					let:Option
					placeholder="Start typing..."
					id="auto-complete"
					name="auto-complete"
				>
					<Option value="witalina">Witalina</Option>
					<Option value="david">David</Option>
					<Option value="wiktor">Wiktor</Option>
					<Option value="gustaw">Gustaw</Option>
					<Option value="szymon">Szymon</Option>
					<Option value="aleks">Aleks</Option>
				</AutoComplete>

				<Input slot="input" label="Custom Input" name="custom-input">
					<DollarSign size="16" slot="prefix" />
					<span slot="suffix">USD</span>
				</Input>
				<Label class="flex-col" for="select2" required>
					Native Select
					<select slot="input" class="input" id="select2" name="native" value="david">
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
				</Label>
				<Button class="mt-4">Submit</Button>
			</form>
		</Card>
		<Card class="flex flex-wrap gap-2 w-full p-4">
			<Button>
				<Stars size="16" />
				Primary
			</Button>
			<Button variant="outline">
				<BookTemplate size="16" />
				Outline
			</Button>
			<Button variant="accent">Accent</Button>
			<Button variant="secondary">
				<Flower2 size="16" />
				Secondary
			</Button>
			<Button variant="error">Error</Button>
			<Button variant="success">Success</Button>
			<Button variant="warning">Warning</Button>
			<Button variant="info">Info</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
			<Button size="icon" variant="ghost">
				<RefreshCw size="16" class="group-active:rotate-45 -rotate-[30deg] transition-transform" />
			</Button>
			<Button variant="text">Text</Button>

			<Button
				disabled={buttonLoading}
				loading={buttonLoading}
				on:click={() => {
					buttonLoading = true;
					setTimeout(() => {
						buttonLoading = false;
					}, 2500);
				}}
			>
				Submit
			</Button>
		</Card>
		<Card class="p-4">
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
		</Card>
		<Alert let:Title let:Description>
			<Stars size="16" />
			<Title>Alert</Title>
			<Description>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Description>
		</Alert>
		<Disclosure let:Summary let:Details class="max-w-sm" bind:unstyled={open}>
			<Summary class="w-full">Disclosure</Summary>
			<Details>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut officiis fugiat dicta
				itaque distinctio odit veniam qui, molestias, reprehenderit minus voluptas consequuntur
				aliquid pariatur, sunt error molestiae dolore eaque?
			</Details>
		</Disclosure>
		<div class="w-fit flex items-center gap-8">
			<Popover let:trigger>
				<Button melt={trigger}>Open Popover</Button>
				<Popover.Content>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut officiis fugiat dicta
					itaque distinctio odit veniam qui, molestias, reprehenderit minus voluptas consequuntur
					aliquid pariatur, sunt error molestiae dolore eaque?
				</Popover.Content>
			</Popover>
			<Button on:click={() => (open = !open)}>
				<ToggleRight size="16" />
				Toggle</Button
			>
		</div>
		<Tabs let:List value="rand2">
			<List let:Trigger>
				<Trigger value="rand1">Tab 1</Trigger>
				<Trigger value="rand2">Tab 2</Trigger>
				<Trigger value="rand3">Tab 3</Trigger>
			</List>
		</Tabs>
		<RadioGroup let:Radio class="ml-8" bind:value={radioValue}>
			<Radio value="Startup" />
			<Radio value="Business" />
			<Radio value="Enterprise" />
		</RadioGroup>
		<RadioGroup let:Radio bind:value={radioValue}>
			<Radio
				value="Startup"
				class="bg-background items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4"
			>
				<span class="flex flex-col gap-1.5 w-full">
					<span class="font-medium">Startup</span>
					<span class="text-muted-foreground text-sm">12GB/6 CPUs · 160 GB SSD disk</span>
				</span>
			</Radio>
			<Radio
				value="Business"
				class="items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl bg-background ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4"
			>
				<span class="flex flex-col gap-1.5 w-full">
					<span class="font-medium">Business</span>
					<span class="text-muted-foreground text-sm">16GB/8 CPUs · 512 GB SSD disk</span>
				</span>
			</Radio>
			<Radio
				value="Enterprise"
				class="items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl bg-background ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4"
			>
				<span class="flex flex-col gap-1.5 w-full">
					<span class="font-medium">Enterprise</span>
					<span class="text-muted-foreground text-sm">32GB/12 CPUs · 1024 GB SSD disk</span>
				</span>
			</Radio>
		</RadioGroup>
		<Card class="p-4 max-w-sm">
			<Accordion let:Item bind:value={accordionValue}>
				<Item let:Trigger let:Content>
					<Trigger>Accordion</Trigger>
					<Content>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut officiis fugiat dicta
						itaque distinctio odit veniam qui, molestias, reprehenderit minus voluptas consequuntur
						aliquid pariatur, sunt error molestiae dolore eaque?
					</Content>
				</Item>
				<Accordion.Item>
					<Accordion.Trigger>Accordion</Accordion.Trigger>
					<Accordion.Content>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut officiis fugiat dicta
						itaque distinctio odit veniam qui, molestias, reprehenderit minus voluptas consequuntur
						aliquid pariatur, sunt error molestiae dolore eaque?
					</Accordion.Content>
				</Accordion.Item>
				<Item summary="Current Accordion (Controlled usage)" details={accordionValue} />
			</Accordion>
		</Card>
	</div>
	<Modal let:trigger let:Content bind:open={dialogOpen}>
		<Button melt={trigger}>
			<AppWindow size="16" />
			Open Modal
		</Button>
		<Content let:Header let:Footer let:close class="sm:max-w-[425px]">
			<Header let:Title let:Description>
				<Title>
					<UserCog2 slot="icon" size="20" />
					Edit Profile</Title
				>
				<Description>Make changes to your profile here. Click save when you're done.</Description>
			</Header>
			<form class="grid gap-2">
				<Input placeholder="Dave Kupyn" label="Username" required />
				<Input placeholder="dkupyn@gmail.com" label="Email" required />

				<Footer class="mt-6">
					<Button melt={close} type="button" variant="outline">Cancel</Button>
					<Button type="submit">Confirm</Button>
				</Footer>
			</form>
		</Content>
	</Modal>
	<div class="max-w-md space-y-4">
		<AutoComplete let:Option bind:value={alertType}>
			<Option value="error">Error</Option>
			<Option value="warning">Warning</Option>
			<Option value="success">Success</Option>
			<Option value="info">Info</Option>
		</AutoComplete>
		<Modal let:trigger let:Content alert type={alertType.value}>
			<Button melt={trigger} variant={alertType.value}>
				{#if alertType.value === 'error'}
					<AlertCircle size="16" />
				{:else if alertType.value === 'warning'}
					<AlertTriangle size="16" />
				{:else if alertType.value === 'success'}
					<CheckCircle2 size="16" />
				{:else if alertType.value === 'info'}
					<Info size="16" />
				{/if}
				Alert modal
			</Button>
			<Content let:Header let:Footer let:close class="sm:max-w-[425px]">
				<Header let:Title let:Description>
					<Title>Attention!</Title>
					<Description>
						You are about to delete your account. This action is irreversible. Are you sure you want
						to continue?
					</Description>
				</Header>

				<Footer>
					<Button melt={close} type="button" variant="outline">Cancel</Button>
					<Button melt={close} variant={alertType.value}>Continue</Button>
				</Footer>
			</Content>
		</Modal>
	</div>
	<!-- <CommandMenu let:Item>
		<Item value="1">Item 1</Item>
		<Item value="2">Item 1</Item>
		<Item value="3">Item 1</Item>
	</CommandMenu> -->
</main>

<!-- Popover 100%, Disclosure 100%, RadioGroup 100%, Menu (fix checkbox), Switch (look into it, group), Button -->
<!-- (fix it, better styling), Checkbox ( fix it, group), later add asChild -->
