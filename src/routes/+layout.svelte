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
		: 'sticky top-0 dark:bg-base-950/50 bg-base-50/50 backdrop-blur-md'} w-full z-20 dark:border-base-900 border-base-300"
	class:border-b={$page.url.pathname !== '/'}
>
	<div class="container mx-auto flex justify-between items-center px-6 py-3">
		<h2>
			<a
				href="/"
				aria-label="Go to home page"
				class="text-lg font-bold -ml-2 p-2 focus-visible:ring-2 focus-visible:outline-none rounded-xl transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
				>Essence</a
			>
		</h2>
		<nav>
			<ul class="inline-flex gap-3 sm:gap-5 items-center">
				<li>
					<a
						aria-label="Github Link"
						class="btn btn-text p-2 h-fit"
						href="https://github.com/davidkupyn/ui"
						target="_blank"
					>
						<Github size={20} />
					</a>
				</li>
				<span class="max-sm:hidden bg-base-300 dark:bg-base-800 w-px h-6" />
				<li>
					<a
						href="/preview"
						class="btn btn-text"
						aria-current={$page.url.pathname.startsWith('/preview') ? true : undefined}
						>Components</a
					>
				</li>
			</ul>
		</nav>
	</div>
</header>
<slot />

<footer
	class="bottom-0 dark:border-base-900 border-base-300 w-full z-20"
	class:border-t={$page.url.pathname !== '/'}
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
