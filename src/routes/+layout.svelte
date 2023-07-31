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
		$page.url.pathname === '/' && 'fixed',
		$page.url.pathname === '/sidebar' && 'hidden'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-12">
		<h2 class="flex items-center gap-2">
			<a
				href="/"
				aria-label="Go to home page"
				class="font-bold -ml-2 p-2 focus-visible:ring-2 font-display focus-visible:outline-none rounded-xl transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
			>
				Essence
			</a>
		</h2>
		<nav>
			<ul class="inline-flex gap-3 sm:gap-5 items-center -mr-4">
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
					<Menu let:Trigger let:Content>
						<Trigger aria-label="Theme picker" variant="ghost" size="icon">
							{#if $themeStore.theme === 'dark'}
								<Moon size="16" />
							{:else if $themeStore.theme === 'light'}
								<Sun size="16" />
							{:else}
								<Monitor size="16" />
							{/if}
						</Trigger>
						<Content let:RadioGroup>
							<RadioGroup let:Radio bind:value={$themeStore.theme}>
								<Radio value="dark">Dark</Radio>
								<Radio value="light">Light</Radio>
								<Radio value="system">System</Radio>
							</RadioGroup>
						</Content>
					</Menu>
				</li>
				<Separator orientation="vertical" class="h-6" />
				<li>
					<Button
						href="/preview"
						variant="text"
						data-state={$page.url.pathname.startsWith('/preview') ? 'active' : undefined}
						>Components
					</Button>
				</li>
			</ul>
		</nav>
	</div>
</header>
<slot />

<footer
	class="bottom-0 border-muted w-full z-20"
	class:border-t={$page.url.pathname !== '/'}
	class:hidden={$page.url.pathname === '/sidebar'}
	class:fixed={$page.url.pathname === '/'}
>
	<div class="container mx-auto flex justify-between items-center px-6 py-6">
		<span class="mx-auto">
			<span class="text-base-600 dark:text-base-400 mr-1.5">&copy</span><a
				href="https://github.com/davidkupyn"
				target="_blank"
				class="font-medium border-b border-opacity-0 dark:border-opacity-0 border-base-950 dark:border-base-50 hover:border-opacity-100 dark:hover:border-opacity-100 transition"
				>David Kupyn, Essence UI</a
			>
		</span>
		{#if $page.url.pathname !== '/'}
			<Menu let:Trigger let:Content placement="bottom-end">
				<Trigger aria-label="Theme picker" variant="ghost" size="icon">
					{#if $themeStore.theme === 'dark'}
						<Moon size="16" />
					{:else if $themeStore.theme === 'light'}
						<Sun size="16" />
					{:else}
						<Monitor size="16" />
					{/if}
				</Trigger>
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
