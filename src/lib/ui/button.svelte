<script lang="ts" context="module">
	import { tv, type VariantProps } from "tailwind-variants";

  export const buttonStyles = tv({
    base: 'inline-flex gap-2 items-center justify-center rounded-xl active:scale-95 text-sm font-medium transition ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary-focus text-primary-foreground focus-visible:ring-primary [box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.4),0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)]',
        outline: 'shadow dark:shadow-black ring-1 ring-base-950/10 focus-visible:border-border border border-transparent dark:border-border text-foreground hover:bg-border focus-visible:ring-border',
        secondary: 'bg-base-200/90 hover:bg-muted dark:bg-base-900/70 dark:hover:bg-muted focus-visible:ring-border [box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.06)]',
        error: 'bg-error hover:bg-error-focus text-error-foreground focus-visible:ring-error [box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.4),0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)]',
        success: 'bg-success hover:bg-success-focus text-success-foreground focus-visible:ring-success [box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.4),0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)]',
        warning: 'bg-warning hover:bg-warning-focus text-warning-foreground focus-visible:ring-warning [box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.4),0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)]',
        info: 'bg-info hover:bg-info-focus text-info-foreground focus-visible:ring-info [box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%_/_0.4),0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)]',
        ghost: 'hover:bg-base-300/50 dark:hover:bg-base-800/50 text-muted-foreground focus-visible:text-foreground dark:focus-visible:text-base-300 hover:text-foreground aria-pressed:text-foreground focus-visible:ring-border hover:[box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.06)] data-[state=open]:bg-muted data-[state=open]:text-foreground data-[state=open]:[box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.06)]',
        text: 'text-muted-foreground focus-visible:text-foreground hover:text-foreground aria-pressed:text-foreground data-[selected]:text-foreground data-[state=active]:text-foreground aria-pressed:underline underline-offset-4 data-[state=active]:underline focus-visible:ring-offset-0 focus-visible:ring-border',
        link: 'underline-offset-4 underline text-accent hover:text-accent-focus focus-visible:ring-accent',
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  })
</script>
<script lang="ts">
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes
	} from "svelte/elements";
	import { Loader2 } from "lucide-svelte";
	import { cn } from '$lib/helpers/style';
	import type { Action } from 'svelte/action';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: HTMLAnchorAttributes["href"] = undefined;
	export let type: HTMLButtonAttributes["type"] = undefined;
	export let variant: VariantProps<typeof buttonStyles>["variant"] =
		"default";
	export let size: VariantProps<typeof buttonStyles>["size"] = "default";
  export let loading = false;
  export let use: [any, {}?] = [() => {}, {}];
  export let melt: Record<string, any> & { action: Action<any, any> } | undefined = undefined;
  const [action, actionProps] = use;
	type Props = {
		class?: string | null;
		variant?: VariantProps<typeof buttonStyles>["variant"];
		size?: VariantProps<typeof buttonStyles>["size"];
    loading?: boolean;
    use?: [Action, {}?];
    melt?: Record<string, any> & { action: Action<any, any> };
	};

	interface AnchorElement extends Props, HTMLAnchorAttributes {
		href?: HTMLAnchorAttributes["href"];
		type?: never;
	}

	interface ButtonElement extends Props, HTMLButtonAttributes {
		type?: HTMLButtonAttributes["type"];
		href?: never;
	}
	type $$Props = AnchorElement | ButtonElement;
</script>

{#if melt?.action}
  <svelte:element
    role={href ? 'a' : "button"}
    this={href ? 'a' : "button"}
    type={href ? undefined : type}
    {href}
    class={cn(buttonStyles({ variant, size }), loading && 'relative', className)}
    {...$$restProps}
    on:click
    on:change
    on:keydown
    on:keyup
    on:mouseenter
    on:mouseleave
    use:action={actionProps}
    melt={melt}
  >
    <slot />
  </svelte:element> 
{:else}
  <svelte:element
    role={href ? 'a' : "button"}
    this={href ? 'a' : "button"}
    type={href ? undefined : type}
    {href}
    class={cn(buttonStyles({ variant, size }), loading && 'relative', className)}
    {...$$restProps}
    on:click
    on:change
    on:keydown
    on:keyup
    on:mouseenter
    on:mouseleave
    use:action={actionProps}
  >
    {#if loading}
      <span class=" inset-0 grid place-content-center absolute">
        <Loader2 class="animate-spin" size=16 />
      </span>
      <span class={cn('relative transition-[transform,opacity] inline-flex gap-2 items-center justify-center', loading ? 'scale-75 opacity-0' : 'scale-100 opacity-100 pointer-events-none', ['info', 'error'].includes(variant ?? 'default') && 'text-shadow')}>
        <slot />
      </span>
    {:else}
      <slot />
    {/if}
  </svelte:element>
{/if} 