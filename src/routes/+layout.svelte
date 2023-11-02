<script>
	import { page } from '$app/stores';
	import { Github, Monitor, Moon, Sun } from 'lucide-svelte';
	import '../app.postcss';
	import { cn } from '$lib/helpers/style';
	import { Menu } from '$lib/ui/menu';
	import ThemeProvider from '$lib/theme-switcher/theme-provider.svelte';
	import { themeStore } from '$lib/theme-switcher';
	import Button from '$lib/ui/button.svelte';
	import Separator from '$lib/ui/separator.svelte';
	import Logo from './logo.svelte';
	import Label from '$lib/ui/label.svelte';
	import { Toaster } from 'svelte-sonner';
	import Kbd from '$lib/ui/kbd.svelte';

	let disabled = false;
</script>

<svelte:head>
	<title>Essence UI</title>
	<meta
		name="description"
		content="Crafted with Unparalleled Precision and Timeless Elegance, Essence Transcends Expectations"
	/>
	<meta name="author" content="David Kupyn" />
</svelte:head>
<ThemeProvider attribute="class" disableTransitionOnChange storageKey="essense-theme" />
<Toaster />
<header
	class={cn(
		'w-full z-20',
		$page.url.pathname === '/sidebar' && 'hidden',
		$page.url.pathname === '/' && 'absolute'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-12">
		<a
			href="/"
			aria-label="Go to home page"
			class="font-bold flex items-center gap-3 -ml-2 p-1 focus-visible:ring-2 focus-visible:outline-none rounded-lg transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
		>
			<Logo class="text-accent" size="24" />
			Essence
		</a>
		<nav>
			<ul class="inline-flex gap-2 items-center -mr-4">
				<li>
					<Button
						aria-label="Github Link"
						variant="ghost"
						size="icon"
						href="https://github.com/davidkupyn/ui"
						target="_blank"
					>
						<Github size="16" />
					</Button>
				</li>
				<li>
					<Menu let:trigger let:Content>
						<Button melt={trigger} aria-label="Theme picker" variant="ghost" size="icon">
							{#if $themeStore.theme === 'dark'}
								<Moon size="16" />
							{:else if $themeStore.theme === 'light'}
								<Sun size="16" />
							{:else}
								<Monitor size="16" />
							{/if}
						</Button>
						<Content let:RadioGroup>
							<RadioGroup let:Radio bind:value={$themeStore.theme}>
								<Radio value="dark">Dark</Radio>
								<Radio value="light">Light</Radio>
								<Radio value="system">System</Radio>
							</RadioGroup>
						</Content>
					</Menu>
				</li>
				<Separator orientation="vertical" class="h-6 mx-2" />
				<li>
					<Button href="/preview" variant="text">Components</Button>
				</li>
			</ul>
		</nav>
	</div>
</header>
<svg
	class="absolute pointer-events-none inset-0 top-1.5 h-[400px] w-full stroke-foreground dark:stroke-muted-foreground opacity-10 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
	aria-hidden="true"
>
	<defs>
		<pattern
			id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
			width="200"
			height="200"
			x="50%"
			y="-1"
			patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none"></path></pattern
		>
	</defs>
	<svg x="50%" y="-1" class="overflow-visible fill-foreground/20">
		<path
			d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
			stroke-width="0"
		/>
	</svg>
	<rect
		width="100%"
		height="100%"
		stroke-width="0"
		fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
	/>
</svg>
<slot />

<footer
	class={cn(
		'border-muted z-[0] w-full mt-8 bg-background',
		$page.url.pathname === '/' ? 'absolute bottom-0' : 'border-t',
		$page.url.pathname === '/sidebar' && 'hidden'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-14 relative bottom-0">
		<span class="mx-auto text-sm text-muted-foreground font-medium">&copy David Kupyn</span>
		{#if $page.url.pathname !== '/'}
			<Menu let:trigger let:Content placement="bottom-end">
				<Button melt={trigger} aria-label="Theme picker" variant="ghost" size="icon">
					{#if $themeStore.theme === 'dark'}
						<Moon size="16" />
					{:else if $themeStore.theme === 'light'}
						<Sun size="16" />
					{:else}
						<Monitor size="16" />
					{/if}
				</Button>
				<Content let:RadioGroup>
					<RadioGroup let:Radio bind:value={$themeStore.theme}>
						<Radio value="dark">Dark</Radio>
						<Radio value="light">Light</Radio>
						<Radio value="system">System</Radio>
					</RadioGroup>
				</Content>
			</Menu>
		{/if}
	</div>
</footer>
