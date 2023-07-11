<script lang="ts">
	import Label from './menu-item-label.svelte';
	import RadioGroup from './menu-radio-group.svelte';
	import Separator from './menu-separator.svelte';
	import { cn } from '$lib/helpers/style';
	import { getSubMenuContext, menuStyles } from '.';

	const { subMenu } = getSubMenuContext();
	let className = '';
  const { content } = menuStyles();

	export { className as class };
</script>

	<div
		class={cn(
			content(),
			className
		)}
		{...$subMenu}
		use:subMenu
	>
			<slot {Separator} {RadioGroup} {Label}/>
	</div>
