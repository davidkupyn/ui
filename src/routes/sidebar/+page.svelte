<script>
	import { scale, fly, crossfade } from 'svelte/transition';
	import { Home, ScrollText, SidebarClose, SidebarOpen, Star } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';

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

<div
	class="h-screen border-r border-subtle transition-all px-[1.4rem] w-[5.5rem] flex flex-col gap-8 py-12 data-[expanded=true]:w-56"
	data-expanded={expanded}
>
	<div class="flex items-center gap-4">
		{#if expanded}
			<a
				in:fly|local={{ x: -10, duration: 400 }}
				href="/"
				on:click|stopPropagation
				aria-label="Go to home page"
				class="text-center w-fit font-bold p-2 focus-visible:ring-2 focus-visible:outline-none rounded-xl transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
			>
				Essence</a
			>
		{/if}
		<button on:click={() => (expanded = !expanded)} class="btn btn-ghost p-3 h-fit w-fit ml-auto">
			{#if expanded}
				<span in:scale|local>
					<SidebarClose size={20} />
				</span>
			{:else}
				<span in:scale|local>
					<SidebarOpen size={20} />
				</span>
			{/if}
		</button>
	</div>
	<nav>
		<ul class="flex flex-col gap-3 items-center">
			{#each items as item}
				<li class="w-full">
					<button
						on:click={() => (current = item.label)}
						aria-pressed={current === item.label}
						aria-label={item.label}
						class="relative btn btn-text h-11 p-0 {expanded ? 'w-44 transition-[width]' : 'w-11'}"
					>
						<span
							class="absolute text-sm inset-0 flex {expanded
								? 'justify-start'
								: 'justify-center'} items-center gap-3 p-3 z-[2]"
						>
							<span>
								<svelte:component this={item.icon} size={20} />
							</span>

							{#if expanded}
								<span in:fly|local={{ x: -10, duration: 300 }}>{item.label}</span>
							{/if}
						</span>
						{#if current === item.label}
							<div
								in:receive|local={{
									key: 'background',
									easing: cubicOut,
									duration: 200
								}}
								out:send|local={{ key: 'background', easing: cubicOut, duration: 200 }}
								class="w-full h-full rounded-xl bg-base-300/50 dark:bg-base-800/50"
							/>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</div>
