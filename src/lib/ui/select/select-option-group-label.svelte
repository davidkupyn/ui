<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';
	import { menuStyles } from '../menu';

	const key = ctx.group.get();

	const {
		elements: { groupLabel: groupLabel }
	} = ctx.get();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span use:groupLabel {...$groupLabel(key)} class={cn(menuStyles().itemLabel(), className)}>
	<slot />
</span>
