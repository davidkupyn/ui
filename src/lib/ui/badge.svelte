<script lang="ts" context="module">
	import { cn } from "$lib/helpers/style";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { tv, type VariantProps } from "tailwind-variants";

  export const badgeStyles = tv({
    slots: {
      base: 'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2',
      statusDot: 'w-1 h-1 rounded-full',
    },
    variants: {
      variant: {
        default: {
          base: 'bg-primary text-background',
          statusDot: 'bg-primary'
        },
        accent: {
          base: 'bg-accent-400/20 text-accent-600 dark:bg-accent-500/20  dark:text-accent-200 dark:bg-accent-600/20',
          statusDot: 'bg-accent-400'
        },
        outline: {
          base: 'ring-1 ring-base-950/10 shadow dark:border-border border border-transparent focus-visible:border-border text-foreground',
          statusDot: 'bg-transparent'
        },
        success: {
          base: 'bg-success-500/20 text-success-800 dark:text-success-200 dark:bg-success-600/20',
          statusDot: 'bg-success-500'
        },
        error: {
          base: 'bg-error-400/20 text-error dark:text-error-200 dark:bg-error-600/20',
          statusDot: 'bg-error-500'
        },
        warning: {
          base: 'bg-warning-400/20 text-warning-800 dark:text-warning-200 dark:bg-warning-600/20',
          statusDot: 'bg-warning-500'
        },
        info: {
          base: 'bg-info-400/20 text-info-800 dark:text-info-200 dark:bg-info-600/20',
          statusDot: 'bg-info-500'
        },
      },
      subtle: {
        true: {
          base: 'ring-1 ring-base-950/10 shadow dark:bg-transparent dark:border-border border bg-transparent border-transparent focus-visible:border-border text-foreground dark:text-foreground',
        }
      },
      round: {
        true: {
          base: 'rounded-full',
        }
      },
    },
    defaultVariants: {
      variant: 'default',
      subtle: false,
      round: false,
    }
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
  const {base, statusDot} = badgeStyles({variant, round, subtle})
</script>

<svelte:element
	this={href ? "a" : "span"}
	{href}
	class={cn(base(), className)}
	{...$$restProps}
>
  {#if subtle && variant !== 'outline'}
    <span class="rounded-full grid place-content-center h-2 w-2 mr-1.5 ring-1 ring-base-950/10 shadow dark:border-border border border-transparent p-1">
      <span class={statusDot()}></span>
    </span>
  {/if}
	<slot />
</svelte:element>