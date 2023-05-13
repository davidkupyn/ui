<script lang="ts">
	import { createDialog } from 'svelte-headlessui';
	import Transition from 'svelte-transition';

	export let label = 'Dialog';
	const dialog = createDialog({ label });
	const { open, close, modal } = dialog;
	export const closeTrigger = close;
</script>

<div class="relative z-20">
	<slot name="button" {open} />
	<Transition show={$dialog.expanded}>
		<Transition
			enter="ease-out duration-200"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="fixed inset-0 bg-base-800/40 dark:bg-base-950/60" on:click={dialog.close} />
		</Transition>

		<div class="fixed inset-0 overflow-y-auto">
			<div class="flex min-h-full items-center justify-center p-4">
				<Transition
					enter="ease-out duration-150"
					enterFrom="opacity-0 scale-75"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-150"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-75"
				>
					<div
						use:modal
						class="w-full sm:w-fit rounded-3xl border border-base-300 dark:border-base-800 bg-base-50/95 dark:bg-base-950/75 backdrop-blur-md p-6"
					>
						<slot name="panel" />
					</div>
				</Transition>
			</div>
		</div>
	</Transition>
</div>
