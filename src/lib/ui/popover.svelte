<script lang="ts">
	import { createPopover } from 'svelte-headlessui';
	import { Transition } from 'svelte-transition';
	export let label = 'Menu';
	const popover = createPopover({ label });
	const { button } = popover;
	export let position: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' = 'bottom-end';

	const positionValues = {
		'top-start': 'origin-bottom-left mb-2 bottom-10',
		'top-end': 'origin-bottom-right mb-2 right-0 bottom-10',
		'bottom-start': 'origin-top-left mt-2',
		'bottom-end': 'origin-top-right mt-2 right-0'
	};
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
			class="{positionValues[
				position
			]} absolute z-20 w-fit divide-y divide-base-200 dark:divide-base-900 rounded-2xl border border-subtle bg-base-50 dark:bg-base-950 backdrop-blur-md shadow-lg ring-opacity-5 focus:outline-none"
		>
			<slot name="panel" />
		</div>
	</Transition>
</div>
