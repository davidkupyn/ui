<script>

	import { Accordion } from "$lib/ui/accordion";
	import { Dialog } from "$lib/ui/dialog";
	import { Popover } from "$lib/ui/popover";
	import { AppWindow, MoreHorizontal } from "lucide-svelte";
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
			<button let:trigger {...trigger} use:trigger.action slot="trigger" class="btn btn-ghost btn-icon"><MoreHorizontal size=16/></button>
			<p slot="content">
				Popover content
			</p>
		</Popover>
			<Dialog let:Trigger let:Content >
		<Trigger class="btn w-fit">
			<AppWindow size=16 />
			Open Dialog
		</Trigger>
		<Content let:Title let:Description let:close class="sm:max-w-[425px]">
			<Title>Edit Profile</Title>
			<Description>Make changes to your profile here. Click save when you're done.</Description>
			<form class="grid gap-4">
				<label class="input-label w-full">
					Username
					<input class="input" placeholder="Dave Kupyn" />
				</label>
				<label class="input-label w-full">
					Email
					<input class="input" placeholder="dkupyn@gmail.com" />
				</label>
				<div class="flex gap-4 mt-4 w-full">
					<button {...close} use:close.action type="button" class="btn btn-outline w-full">
						Cancel
					</button>
					
					<button type="submit" class="btn w-full"> Confirm </button>
				</div>
			</form>
		</Content>
	</Dialog>
</main>