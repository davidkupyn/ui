<script lang="ts">
	import { setContext } from 'svelte';
	import { getSelectContext } from '.';
	import Label from './select-option-group-label.svelte';
	import Option from './select-option.svelte';

	const { createGroup } = getSelectContext();
	const { group, label } = createGroup();
	setContext('optgroup', label);
</script>

<div {...group} class="flex flex-col gap-1">
	<slot {Label} {Option} />
</div>
