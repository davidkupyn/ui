<script lang="ts">
	import Trigger from './menu-trigger.svelte';
	import Content from './menu-content.svelte';
	import { createContextMenu, createDropdownMenu } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
  export let loop = false;
  export let preventScroll = true;
	export let placement:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| undefined = undefined;
  export let context = false;
  const options = {
    loop,
    preventScroll,
    positioning: {
      placement
    }
  };
	const dropdown = context ? createContextMenu(options) :  createDropdownMenu(options);
	setContext('dropdown', dropdown);
  export const { trigger } = dropdown
</script>

<slot {Trigger} {Content}/>