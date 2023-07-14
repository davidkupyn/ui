<script lang="ts">
	import { scale } from 'svelte/transition';
	import { getRadioGroupContext } from ".";
  export let value: string;
  export let disabled = false;
  export let id = crypto.randomUUID();
  const { item, isChecked, itemInput } = getRadioGroupContext();
</script>
<div class="flex items-center gap-3">
      <button
        melt={$item({value, disabled})}
        use:item
        class="h-5 w-5 sm:h-4 sm:w-4 my-1 shadow-sm shrink-0 cursor-pointer data-[state=checked]:bg-accent border rounded-full grid place-content-center focus:ring-transparent border-base-400/50 dark:border-base-700 bg-transparent text-accent outline-0 ring-accent-focus focus-visible:ring-border data-[state=checked]:focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-offset-2 focus:ring-offset-0"
        aria-labelledby="{id}-label"
      >
        {#if $isChecked(value)}
          <div transition:scale={{start: 0.5}} class="h-1.5 w-1.5 rounded-full bg-background" />
        {/if}
      </button>
      <!-- <input melt={$itemInput({value, disabled})} {id} /> -->
      <label
        class="capitalize leading-none"
        for={id}
        id="{id}-label"
      >
        <slot>
          {value}
        </slot>
      </label>
    </div>