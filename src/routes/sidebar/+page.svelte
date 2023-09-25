<script>
	import { scale, fly, crossfade } from 'svelte/transition';
	import { ScrollText, SidebarClose, SidebarOpen, Star } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import Home from '$lib/icons/home.svelte';
	import Button from '$lib/ui/button.svelte';
	import { cn } from '$lib/helpers/style';
	import Logo from '../logo.svelte';

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

<div class="flex bg-base-950 max-sm:flex-col">
	<div
		class="h-screen transition-all px-[1.375rem] w-20 flex flex-col gap-8 py-12 data-[expanded=true]:w-56 dark"
		data-expanded={expanded}
	>
		<div class="flex items-center gap-4">
			{#if expanded}
				<a
					in:fly={{ x: -10, duration: 400 }}
					href="/"
					on:click|stopPropagation
					aria-label="Go to home page"
					class="text-center flex items-center gap-2 w-fit font-bold text-foreground whitespace-nowrap -ml-1 p-2 h-9 focus-visible:ring-2 focus-visible:outline-none rounded-xl transition ring-offset-background focus-visible:ring-muted-foreground"
				>
					<Logo class="text-accent" size="24" />
					Essence
				</a>
			{/if}
			<Button size="icon" variant="ghost" on:click={() => (expanded = !expanded)} class="ml-auto">
				{#if expanded}
					<span in:scale>
						<SidebarClose size="20" />
					</span>
				{:else}
					<span in:scale>
						<SidebarOpen size="20" />
					</span>
				{/if}
			</Button>
		</div>
		<nav>
			<ul class="flex flex-col gap-3 items-center">
				{#each items as item}
					{@const currentLink = current === item.label}
					<li class="w-full">
						<Button
							size="icon"
							variant="text"
							on:click={() => (current = item.label)}
							aria-pressed={currentLink}
							aria-label={item.label}
							class={cn('relative transition', expanded ? 'w-44 transition-[width]' : 'w-9')}
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
									class="w-full h-full rounded-xl bg-background dark:bg-muted shadow-[inset_0_1px_#ffffff0f]"
								/>
							{/if}
						</Button>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<main
		class="h-[calc(100vh-1rem)] w-full m-2 ml-0 p-4 bg-background dark:bg-muted rounded-3xl dark:shadow-[0_-1px_0_#ffffff2a]"
	/>
</div>
