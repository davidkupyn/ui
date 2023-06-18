<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { fade, scale } from 'svelte/transition';
	import { createDialog } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';

	const { trigger, portal, overlay, content, title, description, close, open } = createDialog();

	let className = '';
	let crossButton = true;
	export { open, close, trigger, crossButton, className as class };

	interface $$Slots {
		trigger: {
			trigger: typeof $trigger;
		};
		title: {};
		description: {};
		content: {
			close: typeof $close;
		};
	}
</script>

<slot name="trigger" trigger={$trigger} />

<div
	use:portal
	class={cn('z-50 flex items-start justify-center sm:items-center', $open && 'fixed inset-0')}
>
	{#if $open}
		<div
			{...$overlay}
			transition:fade|local={{ duration: 100 }}
			class="fixed z-50 inset-0 bg-base-50/70 dark:bg-base-950/70"
		/>
		<div
			transition:scale|local={{ duration: 150, start: 0.85 }}
			class={cn(
				'fixed z-50 grid w-full sm:max-w-lg shadow-lg focus:outline-none rounded-b-3xl sm:rounded-3xl border border-subtle bg-base-50 dark:bg-base-950 backdrop-blur-md p-6',
				className
			)}
			{...$content}
		>
			{#if $$slots.title}
				<h2 {...title} class="font-semibold mb-2 text-md sm:text-lg">
					<slot name="title" />
				</h2>
			{/if}
			{#if $$slots.description}
				<p {...description} class="mb-4 text-sm text-base-600">
					<slot name="description" />
				</p>
			{/if}
			<slot name="content" close={$close} />

			{#if crossButton}
				<button {...$close()} class="absolute right-4 top-4 btn btn-sm btn-ghost p-0 h-8 w-8">
					<X size={20} />
				</button>
			{/if}
		</div>
	{/if}
</div>
