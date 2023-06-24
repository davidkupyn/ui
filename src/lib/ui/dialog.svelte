<script lang="ts">
	// @ts-nocheck
	import { cn } from '$lib/helpers/style';
	import { fade, scale } from 'svelte/transition';
	import { createDialog } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';

	const { trigger, portal, overlay, content, title, description, close, open } = createDialog();

	let className = '';
	let crossButton = true;
	let alert = false;
	export { open, close, trigger, crossButton, className as class, alert };

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
	class={cn(
		'z-50 flex justify-center sm:items-center',
		$open && 'fixed inset-0',
		alert ? 'items-end' : 'items-start'
	)}
>
	{#if $open}
		<div
			{...$overlay}
			transition:fade={{ duration: 100 }}
			class="fixed z-50 inset-0 bg-base-50/70 dark:bg-base-950/70"
		/>
		<div
			transition:scale={{ duration: 150, start: 0.85 }}
			class={cn(
				'fixed z-50 grid w-full sm:max-w-lg shadow-lg focus:outline-none sm:rounded-3xl sm:border border-popover-border bg-popover backdrop-blur-md p-6',
				alert ? 'max-sm:pb-12 rounded-t-3xl border-t' : 'rounded-b-3xl border-b',
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
				<p {...description} class="mb-4 text-sm text-muted-foreground">
					<slot name="description" />
				</p>
			{/if}
			<slot name="content" close={$close} />

			{#if crossButton && !alert}
				<button {...$close()} class="absolute right-4 top-4 btn btn-sm btn-ghost btn-icon">
					<X size={16} />
				</button>
			{/if}
		</div>
	{/if}
</div>
