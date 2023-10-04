<script lang="ts">
	import { cn } from '$lib/helpers';
	import { createLabel } from '@melt-ui/svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import Wrapper from '../wrapper.svelte';

	type $$Props = HTMLLabelAttributes & {
		required?: boolean | null;
		optional?: boolean;
	};
	type $$Events<T extends Element = HTMLLabelElement> = {
		mouseDownWIthoutCustomEvent: {
			originalEvent: MouseEvent;
			currentTarget: T;
		};
	};

	export let required: $$Props['required'] = false;
	export let optional: $$Props['optional'] = !required;

	const {
		elements: { root }
	} = createLabel();
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<label
	{...$$restProps}
	use:root
	{...$root}
	class={cn('flex w-full gap-1.5 text-sm', className)}
	data-melt-part="root"
>
	<Wrapper class="flex items-center gap-1" this="span" show={optional ?? false}>
		<slot />
		{#if optional}
			<span class="text-muted-foreground text-xs">(optional)</span>
		{/if}
	</Wrapper>

	<slot name="input" />
</label>
