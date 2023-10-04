<script lang="ts">
	import { ctx } from '.';
	import Content from './menu-submenu-content.svelte';
	import Trigger from './menu-submenu-trigger.svelte';

	export let disabled = false;

	const subMenu = ctx.submenu.set({
		disabled,
		positioning: {
			gutter: 0,
			offset: {
				crossAxis: -5
			},
			placement: 'right-start'
		}
	});

	export const {
		elements: { subTrigger: trigger }
	} = subMenu;
</script>

<slot {Trigger} {Content} />
