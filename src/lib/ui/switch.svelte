<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createSwitch } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string = 'switch' + Math.random();
	export let value: any = undefined;
	export let defaultChecked = false;
	export let checked = defaultChecked;
	export let disabled = false;
	export let required = false;
	export let group: any[] = [];
	let className = '';
	export { className as class };

	const { root, input, isChecked } = createSwitch({
		name: id,
		disabled,
		required,
		checked,
		value
	});
</script>

<button
	{...$root}
	use:root
	on:click={() => {
		if (group.includes(value)) {
			console.log('remove');
			group = group.filter((v) => v !== value);
		} else {
			console.log('add');
			group = [...group, value];
		}
		dispatch('change', {
			value,
			group
		});
	}}
	class={cn(
		'relative group w-11 transition disabled:opacity-50 disabled:pointer-events-none h-6 bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full',
		$isChecked && 'bg-accent dark:bg-accent',
		className
	)}
>
	<input {...$input} {id} />

	<span
		data-state={$isChecked ? 'checked' : 'unchecked'}
		class={cn(
			"peer-disabled:dark:bg-zinc-300s content-[''] absolute top-1 bg-white shadow-md rounded-full scale-90 transition-all block h-4 w-4 group-active:w-5 translate-x-1 will-change-transform group-active:data-[state=checked]:-ml-1 data-[state=checked]:translate-x-6"
		)}
	/>
</button>
