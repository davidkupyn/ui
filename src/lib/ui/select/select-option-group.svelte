<script lang="ts">
	import { setContext } from 'svelte';
	import { ctx } from '.';
	import Label from './select-option-group-label.svelte';
	import Option from './select-option.svelte';
	import { uuid } from '$lib/helpers/uuid';
	import { get } from 'svelte/store';

	const {
		elements: { group }
	} = ctx.get();

	const key: string = uuid();
	ctx.group.set(key);
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div use:group {...$group(key)} class={className}>
	<slot {Label} {Option} />
</div>
