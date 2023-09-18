<script lang="ts">
	import { uuid } from '$lib/helpers/uuid';
	import { ctx } from '.';
	import Label from './select-option-group-label.svelte';
	import Option from './select-option.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { group }
	} = ctx.get();
	const key: string = uuid();

	ctx.group.set(key);
</script>

<div use:group {...$group(key)} class={className}>
	<slot {Label} {Option} />
</div>
