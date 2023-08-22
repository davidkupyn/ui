<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Button from '$lib/ui/button.svelte';
	import Illustration from './illustration.svelte';
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

<div class="h-[100dvh] overflow-auto w-screen flex max-sm:items-end">
	<!-- <Illustration class="ml-24 sm:-mt-64 sm:-ml-64 w-fit h-fit" /> -->
	{#key mounted}
		<main class="absolute inset-0 z-10 bg-background/50 grid place-content-center">
			<div class="p-6 flex flex-col justify-center items-center gap-8">
				<h1
					in:fadeScale={{ duration: 400 }}
					class="text-center font-display antialiased py-2.5 -my-2.5 [text-wrap:balance] text-6xl md:text-7xl bg-clip-text transition-all duration-1000 text-transparent bg-gradient-to-t selection:text-base-950 dark:selection:text-base-50 from-base-950 via-base-900 to-base-700 md:to-base-500 dark:from-base-400 dark:via-base-100 tracking-tighter dark:to-base-50"
				>
					Elegant. Functional.
					<span
						class="animate-text bg-clip-text text-transparent bg-gradient-to-r from-accent-focus to-accent selection:text-accent-500 dark:selection:text-accent-400"
					>
						Essence.
					</span>
				</h1>
				<p
					in:fade={{ duration: 400 }}
					class="text-center [text-wrap:balance] bg-clip-text max-w-md text-transparent transition-all delay-500 duration-1000 bg-gradient-to-t from-base-700 to-base-500 dark:from-base-400 dark:to-base-50 md:text-lg selection:text-foreground"
				>
					Craft modern, captivating interfaces effortlessly with easy-to-use UI components.
				</p>
				<span in:fadeScale={{ duration: 400 }} class="mt-4">
					<Button size="lg" href="/preview">
						Explore Components
						<ArrowRight class="group-hover:translate-x-1 transition" size="16" />
					</Button>
				</span>
			</div>
		</main>
	{/key}
</div>

<style>
	@keyframes text {
		0%,
		100% {
			background-size: 200% 200%;
			background-position: left center;
		}
		50% {
			background-size: 200% 200%;
			background-position: right center;
		}
	}
	.animate-text {
		animation: text 6s ease infinite;
	}
</style>
