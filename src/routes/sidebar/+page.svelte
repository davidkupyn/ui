<script>
	import { scale, fade, fly } from 'svelte/transition';
	import { Home, ScrollText, SidebarClose, SidebarOpen, Star } from 'lucide-svelte';

	let expanded = false;
</script>

<div
	class="h-screen border-r border-subtle transition-all px-[1.6rem] duration-300 w-24 flex flex-col gap-8 py-12 data-[expanded=true]:w-56"
	data-expanded={expanded}
>
	<div class="flex items-center gap-4">
		{#if expanded}
			<a
				in:fly={{ x: -10, duration: 300 }}
				href="/"
				on:click|stopPropagation
				aria-label="Go to home page"
				class="text-center w-fit font-bold px-2 focus-visible:ring-2 focus-visible:outline-none rounded-xl transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
			>
				Essence</a
			>
		{/if}
		<button on:click={() => (expanded = !expanded)} class="btn btn-ghost p-3 h-fit w-fit ml-auto">
			{#if expanded}
				<span in:scale>
					<SidebarClose size={20} />
				</span>
			{:else}
				<span in:scale>
					<SidebarOpen size={20} />
				</span>
			{/if}
		</button>
	</div>
	<nav>
		<ul class="flex flex-col gap-3 items-center">
			<li class="w-full">
				<button
					on:click|stopPropagation
					class="btn btn-ghost p-3 h-fit {expanded && 'w-full justify-start'}"
				>
					<Home size={20} />

					{#if expanded}
						<span in:fly={{ x: -10, duration: 300 }}>Title</span>
					{/if}
				</button>
			</li>
			<li class="w-full">
				<button
					on:click|stopPropagation
					class="btn btn-ghost p-3 h-fit {expanded && 'w-full justify-start'}"
				>
					<Star size={20} />
					{#if expanded}
						<span in:fly={{ x: -10, duration: 300 }}>Title</span>
					{/if}
				</button>
			</li>
			<li class="w-full">
				<button
					on:click|stopPropagation
					class="btn btn-ghost p-3 h-fit {expanded && 'w-full justify-start'}"
				>
					<ScrollText size={20} />
					{#if expanded}
						<span in:fly={{ x: -10, duration: 300 }}>Title</span>
					{/if}
				</button>
			</li>
		</ul>
	</nav>
</div>
