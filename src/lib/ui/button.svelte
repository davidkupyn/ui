<script lang="ts" context="module">
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonStyles = tv({
		base: 'group inline-flex whitespace-nowrap gap-x-1.5 items-center justify-center tracking-wide rounded-lg active:scale-95 text-sm font-medium transition ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50',
		variants: {
			variant: {
				default:
					'bg-gradient-to-b from-primary-focus to-primary dark:from-primary dark:to-primary-focus hover:brightness-125 dark:hover:brightness-90 text-primary-foreground focus-visible:ring-primary-focus shadow-[inset_0_1px_0_#ffffff5d,inset_0_-1px_0_#00000015,0_1px_3px_0_rgb(0_0_0_/_0.1),_0_1px_2px_-1px_rgb(0_0_0_/_0.1)]',
				outline:
					'shadow dark:shadow-black ring-1 ring-base-950/5 focus-visible:border-border border border-transparent dark:border-border text-foreground hover:bg-border focus-visible:ring-border',
				secondary:
					'bg-base-200/90 hover:bg-muted dark:bg-base-900/70 dark:hover:bg-muted text-foreground focus-visible:ring-border shadow-[inset_0_1px_0_#ffffff0f]',
				error:
					'[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:brightness-95 dark:hover:brightness-90 bg-gradient-to-b from-error to-error-focus text-error-foreground focus-visible:ring-error-focus shadow-[inset_0_1px_0_#ffffff5d,inset_0_-1px_0_#00000015,0_1px_3px_0_rgb(0_0_0_/_0.1),_0_1px_2px_-1px_rgb(0_0_0_/_0.1)]',
				accent:
					'[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:brightness-95 dark:hover:brightness-90 bg-gradient-to-b from-accent to-accent-focus text-accent-foreground focus-visible:ring-accent-focus shadow-[inset_0_1px_0_#ffffff5d,inset_0_-1px_0_#00000015,0_1px_3px_0_rgb(0_0_0_/_0.1),_0_1px_2px_-1px_rgb(0_0_0_/_0.1)]',
				success:
					'hover:brightness-95 dark:hover:brightness-90 bg-gradient-to-b from-success-focus to-success text-success-foreground focus-visible:ring-success-focus shadow-[inset_0_1px_0_#ffffff5d,inset_0_-1px_0_#00000015,0_1px_3px_0_rgb(0_0_0_/_0.1),_0_1px_2px_-1px_rgb(0_0_0_/_0.1)]',
				warning:
					'hover:brightness-95 dark:hover:brightness-90 bg-gradient-to-b from-warning-focus to-warning text-warning-foreground focus-visible:ring-warning-focus shadow-[inset_0_1px_0_#ffffff5d,inset_0_-1px_0_#00000015,0_1px_3px_0_rgb(0_0_0_/_0.1),_0_1px_2px_-1px_rgb(0_0_0_/_0.1)]',
				info: '[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:brightness-95 dark:hover:brightness-90 bg-gradient-to-b from-info to-info-focus text-info-foreground focus-visible:ring-info-focus shadow-[inset_0_1px_0_#ffffff5d,inset_0_-1px_0_#00000015,0_1px_3px_0_rgb(0_0_0_/_0.1),_0_1px_2px_-1px_rgb(0_0_0_/_0.1)]',
				ghost:
					'hover:bg-muted dark:hover:bg-base-800/50 text-muted-foreground focus-visible:text-foreground dark:focus-visible:text-base-300 hover:text-foreground aria-pressed:text-foreground focus-visible:ring-border hover:shadow-[inset_0_1px_0_#ffffff0f] data-[state=open]:bg-muted data-[state=open]:text-foreground data-[state=open]:shadow-[inset_0_1px_0_#ffffff0f]',
				text: 'text-muted-foreground focus-visible:text-foreground hover:text-foreground aria-pressed:text-foreground data-[selected]:text-foreground data-[state=active]:text-foreground aria-pressed:underline underline-offset-4 data-[state=active]:underline focus-visible:ring-offset-0 focus-visible:ring-border',
				link: '[text-shadow:_0_1px_0.5px_rgb(0_0_0_/_10%)] underline-offset-4 underline text-accent hover:text-accent-focus focus-visible:ring-accent'
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 px-8 gap-2',
				icon: 'h-9 w-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});
</script>

<script lang="ts">
	import { cn } from '$lib/helpers';
	import { ExternalLink, Loader2 } from 'lucide-svelte';
	import type { Action } from 'svelte/action';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: HTMLAnchorAttributes['href'] = undefined;
	export let type: HTMLButtonAttributes['type'] = undefined;
	export let variant: VariantProps<typeof buttonStyles>['variant'] = 'default';
	export let size: VariantProps<typeof buttonStyles>['size'] = 'default';
	export let loading = false;
	export let use: [any, {}?] = [() => {}, {}];
	export let external = false;
	export let melt: (Record<string, any> & { action: Action<any, any> }) | undefined = undefined;
	const [action, actionProps] = use;

	type Props = {
		class?: string | null;
		variant?: VariantProps<typeof buttonStyles>['variant'];
		size?: VariantProps<typeof buttonStyles>['size'];
		loading?: boolean;
		use?: [Action, {}?];
		melt?: Record<string, any> & { action: Action<any, any> };
		external?: boolean;
	};

	interface AnchorElement extends Props, HTMLAnchorAttributes {
		href?: HTMLAnchorAttributes['href'];
		type?: never;
	}

	interface ButtonElement extends Props, HTMLButtonAttributes {
		type?: HTMLButtonAttributes['type'];
		href?: never;
	}
	type $$Props = AnchorElement | ButtonElement;
</script>

{#if melt}
	<svelte:element
		this={href ? 'a' : 'button'}
		role={href ? 'a' : 'button'}
		type={href ? undefined : type}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
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
		{...melt}
		use:melt.action
	>
		<slot />
	</svelte:element>
{:else}
	<svelte:element
		this={href ? 'a' : 'button'}
		role={href ? 'a' : 'button'}
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
			<span class="inset-0 grid place-content-center absolute">
				<Loader2 class="animate-spin" size="16" />
			</span>
			<span
				class={cn(
					'relative transition-[transform,opacity] inline-flex gap-2 items-center justify-center',
					loading ? 'scale-75 opacity-0' : 'scale-100 opacity-100 pointer-events-none',
					['info', 'error'].includes(variant ?? 'default') && 'text-shadow'
				)}
			>
				<slot />
			</span>
		{:else}
			<slot />
			{#if external}
				<ExternalLink size="16" />
			{/if}
		{/if}
	</svelte:element>
{/if}
