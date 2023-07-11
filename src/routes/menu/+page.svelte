<script>

	import { Accordion } from "$lib/ui/accordion";
	import { Popover } from "$lib/ui/popover";
</script>
<main class="h-[calc(100vh-4rem)] grid place-content-center gap-8">

	<Accordion
		multiple
		let:Item
		class="w-96 max-w-md border border-transparent ring-1 ring-base-950/10 shadow dark:border-border rounded-3xl p-4"
	>
		<Item let:Trigger let:Content>
			<Trigger>What about updates?</Trigger>
			<Content>Yes, we will be updating the components regularly. We will also be adding new components.</Content>
		</Item>
		<Item>
			<span slot="summary">What about updates?</span>
			<span slot="details">Yes, we will be updating the components regularly. We will also be adding new components.</span>
		</Item>
		<Item summary="What about updates?" details="Yes, we will be updating the components regularly. We will also be adding new components."/>
	</Accordion>
		<Popover>
			<button let:trigger {...trigger} use:trigger.action slot="trigger" class="btn">Open</button>
			<div slot="content">
				<p>Popover content</p>
			</div>
		</Popover>
</main>