<script lang="ts">
	import Radio from './menu-radio-item.svelte';
	import { getMenuContext } from '.';
	import { createEventDispatcher, setContext } from 'svelte';

	const { createMenuRadioGroup } = getMenuContext();
  export let value: string | undefined = undefined;
  const radioGroup = createMenuRadioGroup({
    value
  });
  const { radioGroup: root, value: valueStore} = radioGroup
  setContext('radio-group', radioGroup);
  const dispatch = createEventDispatcher();
  valueStore.subscribe((v) => {
    value = v || undefined;
    dispatch('change', v);
  })

</script>
<div melt={$root}>
	<slot {Radio} />
</div>