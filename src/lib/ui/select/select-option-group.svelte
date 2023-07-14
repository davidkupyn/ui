<script lang="ts">
	import { setContext } from 'svelte';
	import { getSelectContext } from '.';
	import Label from './select-option-group-label.svelte';
	import Option from './select-option.svelte';

	const { group } = getSelectContext();
	const key: string = crypto.randomUUID();
	setContext('option-group', key);
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div melt={$group(key)} class={className}>
	<slot {Label} {Option} />
</div>
