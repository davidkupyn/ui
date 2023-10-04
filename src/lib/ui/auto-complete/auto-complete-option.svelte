<script lang="ts">
	import { cn } from '$lib/helpers';
	import { Check } from 'lucide-svelte';
	import { ctx } from '.';
	import { menuStyles } from '../menu';

	export let value: string;
	export let label: string | undefined = undefined;

	export let disabled = false;

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { option },
		states: { inputValue, touchedInput }
	} = ctx.get();
	const { item } = menuStyles();

	function isShown(touchedInput: boolean, value: string, inputValue: string, label?: string) {
		if (!touchedInput) return true;
		if (label) {
			return (
				label.toLowerCase().includes(inputValue.toLowerCase()) ||
				value.toLowerCase().includes(inputValue.toLowerCase())
			);
		}
		return value.toLowerCase().includes(inputValue.toLowerCase());
	}

	$: show = isShown($touchedInput, value, $inputValue, label);
</script>

{#if show}
	<li
		{...$option({ value, disabled, label })}
		use:option
		class={cn(
			item(),
			'relative group data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[selected]:font-medium pl-8 data-[selected]:text-foreground',
			className
		)}
	>
		<slot>
			{label}
		</slot>
		<Check
			size="16"
			class="group-aria-selected:block hidden absolute left-2 top-1/2 -translate-y-1/2 text-accent"
		/>
	</li>
{/if}
