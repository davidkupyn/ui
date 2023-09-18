<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';
	import { menuStyles } from '../menu';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { groupLabel: groupLabel }
	} = ctx.get();
	const key = ctx.group.get();
</script>

<span use:groupLabel {...$groupLabel(key)} class={cn(menuStyles().itemLabel(), className)}>
	<slot />
</span>
