<script lang="ts">
	import { cn } from '$lib/helpers';
	import { menuStyles } from '.';

	let className: string | undefined | null = undefined;
	const { itemLabel } = menuStyles();

	export { className as class };
</script>

<span class={cn(itemLabel(), className)}>
	<slot />
</span>
