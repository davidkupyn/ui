<script lang="ts">
	import { setContext } from 'svelte';
	import { getSelectContext } from '.';
	import Label from './select-option-group-label.svelte';
	import Option from './select-option.svelte';

	const { group } = getSelectContext();
	const key: string = crypto.randomUUID();
	setContext('option-group', key);
</script>

<div {...$group(key)} class="flex flex-col gap-1">
	<slot {Label} {Option} />
</div>
