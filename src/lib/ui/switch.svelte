<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createSwitch } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string = 'switch' + Math.random();
	export let value: any = undefined;
	export let checked = false;
	export let disabled = false;
	export let required = false;
	export let group: any[] = [];
	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { root, input },
		states: { checked: checkedStore }
	} = createSwitch({
		name: id,
		disabled,
		required,
		defaultChecked: checked,
		value,
		onCheckedChange: ({ next }) => {
			checked = next;
			dispatch('change', next);
			return next;
		}
	});

	$: checkedStore.set(checked);
</script>

<button
	use:root
	{...$root}
	on:click={() => {
		if (group.includes(value)) {
			group = group.filter((v) => v !== value);
		} else {
			group = [...group, value];
		}
		dispatch('change', {
			value,
			group
		});
	}}
	class={cn(
		'relative group w-10 transition disabled:opacity-50 disabled:pointer-events-none h-6 bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full',
		checked && 'bg-accent dark:bg-accent focus-visible:ring-accent',
		className
	)}
>
	<input use:input {...$input} {id} />

	<span
		data-state={checked ? 'checked' : 'unchecked'}
		class={cn(
			"peer-disabled:dark:bg-zinc-300s content-[''] dark:shadow-[inset_0_1px_0_#ffffff2f] absolute top-1 bg-background shadow-md rounded-full scale-90 transition-all block h-4 w-4 group-active:w-5 translate-x-1 will-change-transform group-active:data-[state=checked]:-ml-1 data-[state=checked]:translate-x-5"
		)}
	/>
</button>
