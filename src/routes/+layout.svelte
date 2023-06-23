<script>
	import { page } from '$app/stores';
	import { Github } from 'lucide-svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<title>Essence UI</title>
	<meta
		name="description"
		content="Crafted with Unparalleled Precision and Timeless Elegance, Essence Transcends Expectations"
	/>
	<meta name="author" content="David Kupyn" />
</svelte:head>
<header
	class="{$page.url.pathname === '/'
		? 'fixed'
		: 'sticky top-0 dark:bg-base-950/50 bg-base-50/50 backdrop-blur-md'} w-full z-20 border-muted"
	class:border-b={$page.url.pathname !== '/'}
	class:hidden={$page.url.pathname === '/sidebar'}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-12">
		<h2 class="flex items-center gap-2">
			<!-- <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="var(--color-foreground)"
					d="M43.9,-74C55.5,-69.4,62.4,-54.7,68.1,-40.7C73.8,-26.7,78.3,-13.3,78,-0.1C77.8,13.1,72.9,26.2,66.6,39.1C60.3,52.1,52.6,65,41.3,73.2C30,81.3,15,84.8,1.5,82.1C-11.9,79.5,-23.8,70.6,-37.6,63.9C-51.4,57.1,-67,52.4,-72.5,42.1C-78,31.8,-73.3,15.9,-72.1,0.7C-71,-14.6,-73.4,-29.2,-67.3,-38.4C-61.2,-47.6,-46.6,-51.5,-33.9,-55.4C-21.3,-59.4,-10.6,-63.4,2.8,-68.2C16.2,-73,32.4,-78.6,43.9,-74Z"
					transform="translate(100 100)"
				/>
			</svg> -->
			<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="var(--color-foreground)"
					d="M38,-69.2C49.2,-59.3,58.3,-49.1,67.3,-37.5C76.3,-25.9,85.1,-13,85.6,0.3C86.1,13.5,78.2,27.1,69.5,39.1C60.8,51.1,51.2,61.6,39.4,67.3C27.7,73.1,13.9,74.2,0.6,73.2C-12.7,72.2,-25.4,69.1,-34.5,61.8C-43.6,54.5,-49.2,43.1,-56.4,32.1C-63.7,21.1,-72.6,10.5,-74.7,-1.2C-76.7,-12.9,-71.9,-25.8,-63.7,-35.2C-55.6,-44.5,-44,-50.3,-32.8,-60.2C-21.6,-70.1,-10.8,-84.1,1.3,-86.3C13.4,-88.6,26.8,-79,38,-69.2Z"
					transform="translate(100 100)"
				/>
			</svg>
			<a
				href="/"
				aria-label="Go to home page"
				class="text-md font-bold -ml-2 p-2 focus-visible:ring-2 focus-visible:outline-none rounded-xl transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
			>
				Essence
			</a>
		</h2>
		<nav>
			<ul class="inline-flex gap-3 sm:gap-5 items-center">
				<li>
					<a
						aria-label="Github Link"
						class="btn btn-text btn-icon"
						href="https://github.com/davidkupyn/ui"
						target="_blank"
					>
						<Github size={16} />
					</a>
				</li>
				<span class="bg-base-300 dark:bg-base-800 w-px h-6" />
				<li>
					<a
						href="/preview"
						class="btn btn-text"
						data-state={$page.url.pathname.startsWith('/preview') ? 'active' : undefined}
						>Components</a
					>
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
	</div>
</footer>
