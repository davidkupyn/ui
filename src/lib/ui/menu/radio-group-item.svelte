<script lang="ts">
	import { cn } from "$lib/helpers/style";
	import { getRadioGroupContext, menuStyles } from ".";

  const {radioItem, isChecked} = getRadioGroupContext();

  export let value: string;
  let className = "";
  const {item} = menuStyles()
  export { className as class };
</script>
	<div  class={cn(
    item(), 
    className)} {...$radioItem({ value })} use:radioItem>
		<div class="check">
			{#if $isChecked(value)}
					<div class="h-2 w-2 rounded-full bg-foreground" />
			{/if}
		</div>
	<slot/>
</div>