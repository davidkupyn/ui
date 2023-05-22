<script lang="ts">
	export let id = 'switch';
	export let value: any = undefined;
	export let defaultChecked = false;
	export let checked = defaultChecked;
	export let disabled = false;
	export let required = false;
	export let group: any[] = [];
</script>

<label class="relative inline-flex items-center cursor-pointer group">
	<input
		{id}
		name={id}
		value={value || id}
		type="checkbox"
		class="sr-only peer"
		bind:checked
		{required}
		{disabled}
		on:change={(e) => {
			if (group.includes(value)) {
				group = group.filter((id) => id !== value);
			} else {
				group = [...group, value];
			}
		}}
		on:change
	/>
	<span
		class="w-11 transition peer-disabled:after:dark:bg-zinc-300 peer-disabled:opacity-50 peer-disabled:pointer-events-none h-6 bg-base-300/50 dark:bg-base-800 peer-focus:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base-50 dark:peer-focus-visible:ring-offset-base-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-base-50 after:shadow-lg after:rounded-full after:h-5 after:scale-90 after:w-5 after:transition-all dark:border-base-600 peer-checked:bg-primary-500 dark:peer-checked:bg-primary-600"
	/>
</label>
