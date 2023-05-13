<script lang="ts">
	import { createPopover } from 'svelte-headlessui';
	import { Transition } from 'svelte-transition';
	export let label = 'Menu';
	const popover = createPopover({ label });
	const { button } = popover;
</script>

<div class="relative">
	<slot name="button" {button} />
	<Transition
		show={$popover.expanded}
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-50"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-100"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-50"
	>
		<div
			use:popover.panel
			class="absolute right-0 z-20 mt-2 w-44 origin-top-right divide-y divide-base-200 dark:divide-base-900 rounded-2xl border border-base-300/50 dark:border-base-900 bg-base-50/50 dark:bg-base-950/50 backdrop-blur-md shadow-lg ring-opacity-5 focus:outline-none"
		>
			<slot name="panel" />
		</div>
	</Transition>
</div>
