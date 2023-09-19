<script lang="ts">
	import { ArrowRight, DollarSign } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Button from '$lib/ui/button.svelte';
	import Illustration from './illustration.svelte';
	import { Accordion } from '$lib/ui/accordion';
	import { Card } from '$lib/ui/card';
	import { AutoComplete } from '$lib/ui/auto-complete';
	import { Input } from '$lib/ui/input';
	import Label from '$lib/ui/label.svelte';
	import Separator from '$lib/ui/separator.svelte';
	import Switch from '$lib/ui/switch.svelte';
	import { RadioGroup } from '$lib/ui/radio-group';
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
	<main class="z-10 bg-background/50 flex justify-start items-center flex-col pt-48 gap-12">
		<div class="p-6 flex flex-col justify-center items-center gap-8">
			<h1
				in:fadeScale={{ duration: 400 }}
				class="text-center font-display antialiased py-2.5 -my-2.5 [text-wrap:balance] text-4xl md:text-6xl bg-clip-text transition-all duration-1000 text-transparent bg-gradient-to-t selection:text-base-950 dark:selection:text-base-50 from-base-950 via-base-900 to-base-700 md:to-base-500 dark:from-base-400 dark:via-base-100 tracking-tighter dark:to-base-50"
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
				class="text-center text-sm [text-wrap:balance] bg-clip-text max-w-md text-transparent transition-all delay-500 duration-1000 bg-gradient-to-t from-base-700 to-base-500 dark:from-base-400 dark:to-base-50 md:text-lg selection:text-foreground"
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
		<div class="flex w-full p-6 md:p-12 gap-8 justify-center max-sm:flex-col">
			<Card class="w-full h-fit max-w-sm p-3">
				<Accordion let:Item>
					<Item let:Content let:Trigger>
						<Trigger>Why copy/paste and as a package?</Trigger>
						<Content>
							<p>
								The idea behind this is to give you ownership and control over the code, allowing
								you to decide how the components are built and styled.
							</p>
							<br />
							<p>Start with some sensible defaults, then customize the components to your needs.</p>
							<br />
							<p>
								One of the drawback of packaging the components in an npm package is that the style
								is coupled with the implementation. The design of your components should be separate
								from their implementation.
							</p>
						</Content>
					</Item>
					<Item
						summary="Can I use this in my project?"
						details="Yes. Free to use for personal and commercial projects. No attribution required."
					/>
					<Item summary="Which frameworks are supported?" details="Svelte." />
				</Accordion>
			</Card>
			<Card let:Header class="w-full max-w-md h-fit">
				<Header let:Title let:Description>
					<Title>Account</Title>
					<Description>Change your personal information and account's settings</Description>
				</Header>
				<form class="grid gap-4">
					<AutoComplete label="Role" let:Option id="role" name="role">
						<Option value="front">Front-end Developer</Option>
						<Option value="back">Back-end Developer</Option>
						<Option value="full">Full stack Developer</Option>
					</AutoComplete>

					<Input slot="input" label="Full Name" name="full-name" required value="Dave Kupyn" />
					<Separator />
					<Label class="justify-between" required>
						Two-Factor authentication
						<Switch id="2fa" checked />
					</Label>
					<Separator />
					<div class="mt-4 text-right space-x-4">
						<Button variant="outline">Cancel</Button>
						<Button>Update</Button>
					</div>
				</form>
			</Card>
			<RadioGroup let:Radio value="Startup" class="w-full max-w-md">
				<Radio
					value="Startup"
					class="bg-background items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-2xl ring-1 ring-foreground/5 shadow p-4 max-w-sm gap-4"
				>
					<span class="flex flex-col gap-1.5 w-full">
						<span class="font-medium">Startup</span>
						<span class="text-muted-foreground text-sm">12GB/6 CPUs · 160 GB SSD disk</span>
					</span>
				</Radio>
				<Radio
					value="Business"
					class="items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-2xl bg-background ring-1 ring-foreground/5 shadow p-4 max-w-sm gap-4"
				>
					<span class="flex flex-col gap-1.5 w-full">
						<span class="font-medium">Business</span>
						<span class="text-muted-foreground text-sm">16GB/8 CPUs · 512 GB SSD disk</span>
					</span>
				</Radio>
				<Radio
					value="Enterprise"
					class="items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-2xl bg-background ring-1 ring-foreground/5 shadow p-4 max-w-sm gap-4"
				>
					<span class="flex flex-col gap-1.5 w-full">
						<span class="font-medium">Enterprise</span>
						<span class="text-muted-foreground text-sm">32GB/12 CPUs · 1024 GB SSD disk</span>
					</span>
				</Radio>
			</RadioGroup>
		</div>
	</main>
{/key}

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
