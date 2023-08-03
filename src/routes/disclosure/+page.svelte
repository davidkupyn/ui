<script lang="ts">
	import Checkbox from '$lib/ui/checkbox.svelte';
	import Button from '$lib/ui/button.svelte';
	import { Disclosure } from '$lib/ui/disclosure';
	import { Popover } from '$lib/ui/popover';
	let open = false;
	let group: string[] = [];
	let disabled = true;
</script>

<div class="w-full bg-accent-500/10 h-36"></div>

<main class="flex items-center flex-wrap justify-center h-[calc(100vh-15rem)] px-4">
	<div class="flex gap-6">
		<Checkbox value="checkbox 1" bind:group />
		<Checkbox {disabled} value="checkbox 2" bind:group />
		<Checkbox value="checkbox 3" bind:group />
	</div>
	<!-- <div class="text-foreground">
		{group}
	</div> -->
	<Disclosure class="max-w-md w-full h-64" bind:open>
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
		<Button
			on:click={() => {
				open = !open;
				disabled = !disabled;
			}}>Toggle</Button
		>
	</div>
</main>
<div class="w-full bg-accent-500/10 h-36"></div>
