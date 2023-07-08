<script lang="ts">
	import { cn } from "$lib/helpers/style";
	import { getRadioGroupContext } from ".";

  const {radioItem, isChecked} = getRadioGroupContext();

  export let value: string;
  let className = "";
  export { className as class };
</script>
	<div  class={cn(
      'flex gap-2 cursor-default select-none text-muted-foreground items-center rounded-xl disabled:opacity-50 disabled:pointer-events-none px-4 py-1.5 h-9 outline-none focus:bg-muted focus:text-foreground sm:text-sm',
    className)} {...$radioItem({ value })} use:radioItem>
		<div class="check">
			{#if $isChecked(value)}
					<div class="h-2 w-2 rounded-full bg-foreground" />
			{/if}
		</div>
	<slot/>
</div>