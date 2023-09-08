<script lang="ts">
	import { Accordion } from '$lib/ui/accordion';
	import Button from '$lib/ui/button.svelte';
	import { Card } from '$lib/ui/card';
	import Checkbox from '$lib/ui/checkbox.svelte';
	import { Disclosure } from '$lib/ui/disclosure';
	import Kbd from '$lib/ui/kbd.svelte';
	import { Popover } from '$lib/ui/popover';
	import { RadioGroup } from '$lib/ui/radio-group';
	// import { Select } from '$lib/ui/select';
	import Switch from '$lib/ui/switch.svelte';
	import { Command, Search, ToggleRight } from 'lucide-svelte';
	let open = false;
	let group: string[] = [];
	$: disabled = open;
	let checked = false;
	let radioValue = 'Startup';
	let accordionValue: string[] = [];
</script>

<main class="min-h-[calc(100vh-15rem)] px-4 md:p-12 space-x-8 space-y-8">
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
		<label class="input-group group">
			<Search size="16" class="icon-left" />
			<input spellcheck="false" autocomplete="false" placeholder="Search..." />
			<Kbd
				class="group-focus-within:scale-75 max-sm:hidden transition group-focus-within:opacity-0 dark:bg-background dark:shadow-[0_1px_0_#ffffff1a]"
			>
				<Command size="12" />
				K
			</Kbd>
		</label>
		<label class="input-label w-full">
			<span>
				Normal Input <span class="text-muted-foreground text-xs">(optional)</span>
			</span>
			<input spellcheck="false" type="text" class="input" />
		</label>

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
					<!-- <Select
						let:Group
						placeholder="Select an option"
						id="select1"
						name="custom"
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
					</Select> -->
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
		<Disclosure let:Trigger let:Content class="max-w-sm" bind:unstyled={open}>
			<Trigger class="w-full">Disclosure</Trigger>
			<Content>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut officiis fugiat dicta
				itaque distinctio odit veniam qui, molestias, reprehenderit minus voluptas consequuntur
				aliquid pariatur, sunt error molestiae dolore eaque?
			</Content>
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

		<RadioGroup let:Radio class="ml-8" bind:value={radioValue}>
			<Radio value="Startup" />
			<Radio value="Business" />
			<Radio value="Enterprise" />
		</RadioGroup>
		<RadioGroup let:Radio bind:value={radioValue}>
			<Radio
				value="Startup"
				class="bg-background items-start flex-row-reverse focus-within:ring-1 transition data-[state=checked]:ring-accent focus-within:ring-accent rounded-2xl ring-1 ring-foreground/5 shadow p-4 max-w-sm gap-4"
			>
				<span class="flex flex-col gap-1.5 w-full">
					<span class="font-medium">Startup</span>
					<span class="text-muted-foreground text-sm">12GB/6 CPUs · 160 GB SSD disk</span>
				</span>
			</Radio>
			<Radio
				value="Business"
				class="items-start flex-row-reverse focus-within:ring-1 transition data-[state=checked]:ring-accent focus-within:ring-accent rounded-2xl bg-background ring-1 ring-foreground/5 shadow p-4 max-w-sm gap-4"
			>
				<span class="flex flex-col gap-1.5 w-full">
					<span class="font-medium">Business</span>
					<span class="text-muted-foreground text-sm">16GB/8 CPUs · 512 GB SSD disk</span>
				</span>
			</Radio>
			<Radio
				value="Enterprise"
				class="items-start flex-row-reverse focus-within:ring-1 transition data-[state=checked]:ring-accent focus-within:ring-accent rounded-2xl bg-background ring-1 ring-foreground/5 shadow p-4 max-w-sm gap-4"
			>
				<span class="flex flex-col gap-1.5 w-full">
					<span class="font-medium">Enterprise</span>
					<span class="text-muted-foreground text-sm">32GB/12 CPUs · 1024 GB SSD disk</span>
				</span>
			</Radio>
		</RadioGroup>
		<Card class="p-4 max-w-sm">
			<Accordion let:Item bind:value={accordionValue} multiple>
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
				<Item summary="Current Accordion (Controlled usage)" details={accordionValue.join(', ')} />
			</Accordion>
		</Card>
	</div>
</main>
Popover 100%, Disclosure 100%, RadioGroup 100%, Menu (fix checkbox), Switch (look into it, group), Button
(fix it, better styling), Checkbox ( fix it, group), later add asChild
