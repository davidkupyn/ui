<script lang="ts">
	import { cn } from '$lib/helpers';
	import Title from './card-title.svelte';
	import Description from './card-description.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn('flex flex-col space-y-1.5', className)} {...$$restProps}>
	<slot {Title} {Description} />
</div>
