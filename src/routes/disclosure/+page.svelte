<script lang="ts">
	import Checkbox from '$lib/ui/checkbox.svelte';
	import Button from '$lib/ui/button.svelte';
	import { Disclosure } from '$lib/ui/disclosure';
	import { Popover } from '$lib/ui/popover';
	import Switch from '$lib/ui/switch.svelte';
	import { RadioGroup } from '$lib/ui/radio-group';
	import { Accordion } from '$lib/ui/accordion';
	import { Card } from '$lib/ui/card';
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
	<Disclosure class="max-w-sm" bind:open>
		<Disclosure.Trigger class="w-full">Disclosure</Disclosure.Trigger>
		<Disclosure.Content>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut officiis fugiat dicta itaque
			distinctio odit veniam qui, molestias, reprehenderit minus voluptas consequuntur aliquid
			pariatur, sunt error molestiae dolore eaque?
		</Disclosure.Content>
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
		<Button on:click={() => (open = !open)}>Toggle</Button>
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
</main>
Popover 100%, Disclosure 100%, RadioGroup 100%, Menu (fix checkbox), Switch (look into it, group), Button
(fix it, better styling), Checkbox ( fix it, group), later add asChild
