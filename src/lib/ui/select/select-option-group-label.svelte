<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getOptionGroupContext, getSelectContext } from '.';

	const key = getOptionGroupContext();
	const { groupLabel } = getSelectContext();

	let className = '';
	export { className as class };
</script>

<span {...$groupLabel(key)} class={cn('input-label py-2 pl-5 pr-5 font-semibold text-foreground', className)}>
	<slot />
</span>
