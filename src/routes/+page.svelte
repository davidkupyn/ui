<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Button from '$lib/ui/button.svelte';

	let mounted = false;
	onMount(() => (mounted = true));
	function fadeScale(node: Element, { delay = 0, duration = 200, baseScale = 0.9 }) {
		const o = +getComputedStyle(node).opacity;
		const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
		const s = m ? Number(m[1]) : 1;
		const is = 1 - baseScale;

		return {
			delay,
			duration,
			css: (t: number) => {
				const eased = cubicOut(t);
				return `opacity: ${eased * o}; transform: scale(${eased * s * is + baseScale})`;
			}
		};
	}
</script>

{#key mounted}
	<main
		class="h-[100dvh] w-full bg-gradient-to-tl dark:from-primary-950/50 dark:via-base-950 dark:to-base-950 from-primary-400/50 via-base-50 to-base-50 transition"
	>
		<div class="p-6 flex flex-col justify-center items-center h-full gap-8">
			<h1
				in:fadeScale={{ duration: 400 }}
				class="text-center antialiased text-5xl md:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-t selection:text-base-900 dark:selection:text-base-100 from-base-950 via-base-800 to-base-400 dark:from-base-400 dark:via-base-100 tracking-tight dark:to-base-50"
			>
				Unleash Your
				<span
					class="animate-text bg-clip-text text-transparent bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 dark:from-accent-300 dark:via-accent-500 dark:to-accent-800 selection:text-accent-500 dark:selection:text-accent-400"
				>
					Creativity.
				</span>
			</h1>
			<p
				in:fade={{ duration: 400 }}
				class="text-center bg-clip-text max-w-prose text-transparent bg-gradient-to-t from-base-700 to-base-500 dark:from-base-400 dark:to-base-50 md:text-lg"
			>
				Crafted with Unparalleled Precision and Timeless Elegance, <span class="font-semibold"
					>Essence</span
				> Transcends Expectations
			</p>
			<!-- <span in:fadeScale={{ duration: 400 }}> -->
				<Button
					size='lg'
					href="/preview"
					class="hover:pr-7 group transition-all"
				>
					Explore Components
					<ArrowRight class="w-4 h-4 group-hover:ml-1 transition-[margin]" size=16 />
				</Button>
			<!-- </span> -->
		</div>
	</main>
{/key}
