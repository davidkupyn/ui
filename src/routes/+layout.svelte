<script>
	import { page } from '$app/stores';
	import { Github } from 'lucide-svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<title>Dave Kupyn's UI</title>
</svelte:head>
<header
	class="{$page.url.pathname === '/'
		? 'fixed'
		: 'sticky top-0 dark:bg-base-950/50 bg-base-50/50 backdrop-blur-md'} w-full z-20 dark:border-base-900 border-base-300"
	class:border-b={$page.url.pathname !== '/'}
>
	<div class="container mx-auto flex justify-between items-center px-6 py-3.5 md:py-5">
		<h2>
			<a
				href="/"
				aria-label="Go to home page"
				class="btn btn-link btn-secondary text-lg font-bold -ml-4">kupyn/ui</a
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
<main class="py-8 min-h-screen w-full flex flex-col gap-6 container mx-auto px-6">
	<slot />
</main>
