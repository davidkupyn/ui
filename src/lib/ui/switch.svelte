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
		'relative group w-11 transition disabled:opacity-50 disabled:pointer-events-none h-6 bg-base-300/50 dark:bg-base-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 focus-visible:ring-offset-base-50 dark:focus-visible:ring-offset-base-950 rounded-full dark:border-base-600',
		$isChecked && 'bg-primary-500 dark:bg-primary-600',
		className
	)}
>
	<input {...$input} {id} />

	<span
		data-state={$isChecked ? 'checked' : 'unchecked'}
		class={cn(
			"peer-disabled:dark:bg-zinc-300 peer-checked:border-white content-[''] absolute top-[2px] bg-base-50 shadow-lg rounded-full scale-90 transition-all block h-5 w-5 group-active:w-6 translate-x-0.5 will-change-transform group-active:data-[state=checked]:-ml-1 data-[state=checked]:translate-x-[22px]"
		)}
	/>
</button>
