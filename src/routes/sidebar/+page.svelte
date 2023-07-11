<script>
	import { scale, fly, crossfade } from 'svelte/transition';
	import { ScrollText, SidebarClose, SidebarOpen, Star } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import Home from '$lib/icons/home.svelte';

	let expanded = false;

	let items = [
		{
			icon: Home,
			label: 'Home'
		},
		{
			icon: Star,
			label: 'Preview'
		},
		{
			icon: ScrollText,
			label: 'Documentation'
		}
	];
	const [send, receive] = crossfade({});
	let current = 'Home';
</script>

<div class="flex bg-muted dark:bg-background">
	<div
		class="h-screen transition-all px-[1.375rem] w-20 flex flex-col gap-8 py-12 data-[expanded=true]:w-56"
		data-expanded={expanded}
	>
		<div class="flex items-center gap-4">
			{#if expanded}
				<a
					in:fly={{ x: -10, duration: 400 }}
					href="/"
					on:click|stopPropagation
					aria-label="Go to home page"
					class="text-center w-fit font-bold whitespace-nowrap p-2 h-9 focus-visible:ring-2 focus-visible:outline-none rounded-xl transition ring-offset-background focus-visible:ring-muted-foreground"
				>
					Essence</a
				>
			{/if}
			<button on:click={() => (expanded = !expanded)} class="btn btn-ghost btn-icon ml-auto">
				{#if expanded}
					<span in:scale>
						<SidebarClose size=20 />
					</span>
				{:else}
					<span in:scale>
						<SidebarOpen size=20 />
					</span>
				{/if}
			</button>
		</div>
		<nav>
			<ul class="flex flex-col gap-3 items-center">
				{#each items as item}
					{@const currentLink = current === item.label}
					<li class="w-full">
						<button
							on:click={() => (current = item.label)}
							aria-pressed={currentLink}
							aria-label={item.label}
							class="relative btn btn-text transition btn-icon {expanded
								? 'w-44 transition-[width]'
								: 'w-9'}"
						>
							<span
								class="absolute text-sm inset-0 flex {expanded
									? 'justify-start'
									: 'justify-center'} items-center gap-3 p-2 z-[2]"
							>
								<span>
									<svelte:component this={item.icon} size={20} />
								</span>

								{#if expanded}
									<span in:fly={{ x: -10, duration: 200 }} class="whitespace-nowrap"
										>{item.label}</span
									>
								{/if}
							</span>
							{#if currentLink}
								<div
									in:receive={{
										key: 'background',
										easing: cubicOut,
										duration: 200
									}}
									out:send={{ key: 'background', easing: cubicOut, duration: 200 }}
									class="w-full h-full rounded-xl bg-background dark:bg-muted"
								/>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<main class="h-[calc(100vh-1rem)] w-full m-2 ml-0 bg-background dark:bg-muted rounded-xl" />
</div>
