<script lang="ts">
	import Title from './modal-title.svelte';
	import Description from './modal-description.svelte';
	import { cn } from '$lib/helpers';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn('flex flex-col space-y-3', className)} {...$$restProps}>
	<slot {Title} {Description} />
</div>
