<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getOptionGroupContext, getSelectContext } from '.';
	import { menuStyles } from '../menu';

	const key = getOptionGroupContext();
	const { groupLabel } = getSelectContext();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span melt={$groupLabel(key)} class={cn(menuStyles().itemLabel(), className)}>
	<slot />
</span>
