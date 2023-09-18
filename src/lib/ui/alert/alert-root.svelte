<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { VariantProps } from 'tailwind-variants';
	import { alertStyles } from '.';
	import Description from './alert-description.svelte';
	import Title from './alert-title.svelte';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: VariantProps<typeof alertStyles>['variant'];
	};
	export let variant: $$Props['variant'] = 'default';

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn(alertStyles({ variant }), className)} {...$$restProps}>
	<slot {Title} {Description} />
</div>
