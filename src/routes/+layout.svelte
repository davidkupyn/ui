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
<header
	class={cn(
		'w-full z-20',
		$page.url.pathname === '/sidebar' && 'hidden',
		$page.url.pathname === '/' && 'absoluet'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-12">
		<a
			href="/"
			aria-label="Go to home page"
			class="font-bold flex items-center gap-3 -ml-2 p-1 focus-visible:ring-2 focus-visible:outline-none rounded-xl transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
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

<slot />

<footer
	class={cn('border-muted w-full', $page.url.pathname === '/sidebar' ? 'hidden' : 'border-t')}
>
	<div class="container mx-auto flex justify-between items-center px-6 py-6">
		<span class="mx-auto text-sm text-muted-foreground">
			<span class="mr-1.5">&copy</span><a
				href="https://github.com/davidkupyn"
				target="_blank"
				class="font-medium border-b border-opacity-0 dark:border-opacity-0 border-base-500 dark:border-base-400 hover:border-opacity-100 dark:hover:border-opacity-100 transition"
				>David Kupyn, Essence UI</a
			>
		</span>
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
