<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn, uuid } from '$lib/helpers';
	import Description from './input-description.svelte';
	import Error from './input-error.svelte';
	import Label from '../label.svelte';
	import { XCircle } from 'lucide-svelte';
	import Prefix from './input-prefix.svelte';
	import Suffix from './input-suffix.svelte';
	import { inputStyles, type InputEvents } from '.';

	const {
		class: className,
		value,
		description,
		label,
		error,
		required,
		id = uuid(),
		...props
	} = $props<
		HTMLInputAttributes & {
			description?: string;
			label?: string;
			error?: boolean | string;
		}
	>();

	type $$Events = InputEvents;
</script>

<div>
	{#if label}
		<Label for={id} class="mb-1.5" {required}>
			{label}
		</Label>
	{/if}
	{#if description}
		<Description>
			{description}
		</Description>
	{/if}

	<slot {Description} />
	<div class={cn('relative group w-full')}>
		<input
			class={cn(inputStyles(), $$slots.prefix && 'pl-10', $$slots.suffix && 'pr-10', className)}
			{id}
			data-invalid={error || undefined}
			bind:value
			forward:events
			forward:actions
			forward:transition
			{...props}
		/>
		{#if $$slots.prefix}
			<Prefix>
				<slot name="prefix" />
			</Prefix>
		{/if}
		{#if $$slots.suffix}
			<Suffix>
				<slot name="suffix" />
			</Suffix>
		{:else if error}
			<Suffix>
				<span transition:scale={{ start: 0.5, duration: 200 }}>
					<XCircle class="text-error" size="16" />
				</span>
			</Suffix>
		{/if}
	</div>
	{#if error !== '' && typeof error === 'string'}
		<Error>
			{error}
		</Error>
	{/if}
</div>
