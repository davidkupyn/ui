<script lang="ts">
	import Trigger from './menu-submenu-trigger.svelte';
	import Content from './menu-submenu-content.svelte';

	import { getMenuContext } from '.';
	import { setContext } from 'svelte';

  export let loop = false;
  export let disabled = false;
  export let preventScroll = true;
	const { createSubMenu } = getMenuContext();
	const subMenu = createSubMenu({
    loop,
    disabled,
    preventScroll,
    positioning: {
      gutter: 0,
      offset: {
        crossAxis: -5
      },
      placement: 'right-start',
    }
  });
  export const {subTrigger: trigger } = subMenu
	setContext('sub-dropdown', subMenu);
</script>

<slot {Trigger} {Content} />
