<script lang="ts">
	import { cn } from '$lib/helpers';
	import { ctx, menuStyles } from '.';

	const {
		elements: { separator }
	} = ctx.get();

	let className: string | undefined | null = undefined;
	const { separator: seperatorStyles } = menuStyles();
	export { className as class };
</script>

<div
	use:separator
	{...$separator}
	data-orientation="horizontal"
	class={cn(seperatorStyles(), className)}
/>
