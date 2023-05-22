<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { spring } from 'svelte/motion';
	const x = spring(0);
</script>

<section class="w-full">
	<!-- <slot /> -->
	<div
		class="w-80 h-96 flex flex-col convex transform
     transition rounded-3xl overflow-hidden p-6 pb-0 mx-auto"
		style="transform: translateX({$x}px)"
	>
		<!-- <div class="w-full h-56 bg-white/5 rounded-xl" /> -->
		<hgroup class="flex flex-grow flex-col gap-2 items-center justify-center">
			<h2 class="text-center font-medium">Card</h2>
			<p class="text-center">description</p>
		</hgroup>
	</div>
	<div class="mx-auto w-fit mt-8 space-x-2">
		<button
			class="btn secondary p-2 h-fit"
			on:click={() => {
				$x -= 2000;
			}}
		>
			<ChevronLeft size={20} />
		</button>
		<button
			class="btn secondary p-2 h-fit"
			on:click={() => {
				$x += 2000;
			}}
		>
			<ChevronRight size={20} />
		</button>
	</div>
</section>
