<script lang="ts" context="module">
	import { cn } from "$lib/helpers/style";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { tv, type VariantProps } from "tailwind-variants";

  export const badgeStyles = tv({
    base: 'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2',
    variants: {
      variant: {
        default: 'bg-primary text-background',
        accent: 'bg-accent-400/20 text-accent-600 dark:bg-accent-500/20  dark:text-accent-400',
        outline: 'ring-1 ring-base-950/10 shadow dark:border-border border border-transparent focus-visible:border-border text-foreground',
        success: 'bg-success-500/20 text-success-700 dark:text-success-400',
        error: 'bg-error-500/20 text-error dark:text-error-400',
        warning: 'bg-warning-500/20 text-warning-700 dark:text-warning-400',
        info: 'bg-info-500/20 text-info-700 dark:text-info-400',
      },
      subtle: {
        true: 'ring-1 ring-base-950/10 shadow dark:bg-transparent dark:border-border border bg-transparent border-transparent focus-visible:border-border text-foreground dark:text-foreground',
      },
      round: {
        true: 'rounded-full',
      },
    },
  })

  const badgeSubtleDot = tv({
    base: 'w-1 h-1 rounded-full',
    variants: {
      variant: {
        default: 'bg-primary',
        accent: 'bg-accent-400',
        outline: 'bg-transparent',
        success: 'bg-success-500',
        error: 'bg-error-500',
        warning: 'bg-warning-500',
        info: 'bg-info-500',
      },
    },
  })
</script>

<script lang="ts">
  export let href: HTMLAnchorAttributes["href"] = undefined;
	export let variant: VariantProps<typeof badgeStyles>["variant"] =
		"default";
  export let subtle: VariantProps<typeof badgeStyles>["subtle"] = false;
  export let round: VariantProps<typeof badgeStyles>["round"] = false;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<svelte:element
	this={href ? "a" : "span"}
	{href}
	class={cn(badgeStyles({ variant, subtle, round, className}))}
	{...$$restProps}
>
  {#if subtle && variant !== 'outline'}
    <span class="rounded-full grid place-content-center h-2 w-2 mr-1.5 ring-1 ring-base-950/10 shadow dark:border-border border border-transparent p-1">
      <span class={badgeSubtleDot({variant})}></span>
    </span>
  {/if}
	<slot />
</svelte:element>