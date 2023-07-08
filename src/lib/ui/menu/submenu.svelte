<script lang="ts">
	import Trigger from './submenu-trigger.svelte';
	import Content from './submenu-content.svelte';

	import { getMenuContext } from '.';
	import { setContext } from 'svelte';
	const { createSubMenu } = getMenuContext();
	const subMenu = createSubMenu();
	setContext('sub-dropdown', subMenu);
</script>

<slot {Trigger} {Content} />
