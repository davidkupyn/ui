<script lang="ts">
	import { themeStore } from '$lib/theme-switcher';
	import { Accordion } from '$lib/ui/accordion';
	import { AutoComplete } from '$lib/ui/auto-complete';
	import Button from '$lib/ui/button.svelte';
	import { Card } from '$lib/ui/card';
	import { Input } from '$lib/ui/input';
	import Label from '$lib/ui/label.svelte';
	import { Modal } from '$lib/ui/modal';
	import Progress from '$lib/ui/progress.svelte';
	import { RadioGroup } from '$lib/ui/radio-group';
	import Separator from '$lib/ui/separator.svelte';
	import Slider from '$lib/ui/slider.svelte';
	import Switch from '$lib/ui/switch.svelte';
	import { toast } from '$lib/ui/toast';
	import { ArrowRight, Brush, Palette, Volume1, Volume2, VolumeX } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
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
	let sliderValue = 30;
	$: defaultTheme = $themeStore.theme;
	$: themeSwitcherValue = defaultTheme;

	[{ key: 'football', value: {} }];
</script>

{#key mounted}
	<main class="flex justify-start flex-grow items-center flex-col pt-24 md:pt-32 gap-12 pb-9">
		<div class="p-6 flex flex-col justify-center items-center gap-8">
			<h1
				in:fadeScale={{ duration: 500 }}
				class="text-center font-display antialiased py-2.5 [text-wrap:balance] text-4xl md:text-6xl bg-clip-text transition-all duration-1000 text-transparent bg-gradient-to-t selection:text-base-950 dark:selection:text-base-50 from-base-950 via-base-900 to-base-700 md:to-base-500 dark:from-base-400 dark:via-base-100 tracking-tighter dark:to-base-50"
			>
				Elegant. Functional.
				<span
					class="bg-clip-text text-transparent bg-gradient-to-t from-accent-focus to-accent-300 selection:text-accent-500 dark:selection:text-accent-400"
				>
					Essence.
				</span>
			</h1>
			<p
				in:fade={{ duration: 500 }}
				class="text-center text-sm [text-wrap:balance] bg-clip-text max-w-md text-transparent transition-all delay-500 duration-1000 bg-gradient-to-t from-base-700 to-base-500 dark:from-base-400 dark:to-base-50 md:text-lg selection:text-foreground"
			>
				Craft modern, captivating interfaces effortlessly with easy-to-use UI components.
			</p>
			<span in:fadeScale={{ duration: 500 }}>
				<Button size="lg" href="/preview">
					Explore Components
					<ArrowRight class="group-hover:translate-x-1 transition" size="16" />
				</Button>
			</span>
		</div>
		<div class="flex w-full p-6 md:p-12 gap-8 justify-center max-lg:flex-col max-lg:items-center">
			<div
				in:fade={{ delay: 100, duration: 600 }}
				class="gap-y-8 items-end flex flex-col w-full h-fit max-w-sm"
			>
				<Card class="w-full p-3">
					<Accordion let:Item>
						<Item let:Content let:Trigger>
							<Trigger>Why copy/paste and as a package?</Trigger>
							<Content>
								<p>
									The idea behind this is to give you ownership and control over the code, allowing
									you to decide how the components are built and styled.
								</p>
								<br />
								<p>
									Start with some sensible defaults, then customize the components to your needs.
								</p>
								<br />
								<p>
									One of the drawback of packaging the components in an npm package is that the
									style is coupled with the implementation. The design of your components should be
									separate from their implementation.
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
				<Slider bind:value={sliderValue}>
					{#if sliderValue >= 50}
						<Volume2 class="h-5 w-5 sm:h-4 sm:w-4" />
					{:else if sliderValue < 50 && sliderValue > 0}
						<Volume1 class="h-5 w-5 sm:h-4 sm:w-4" />
					{:else}
						<VolumeX class="h-5 w-5 sm:h-4 sm:w-4" />
					{/if}
				</Slider>

				<Modal let:trigger let:Content>
					<Button melt={trigger} variant="outline" class="max-sm:w-full">
						<Brush size="16" />
						Change appearance
					</Button>
					<Content let:Header let:Footer let:close class="">
						<Header let:Title let:Description>
							<Title>
								<Palette slot="icon" size="16" />
								Appearance
							</Title>
							<Description>Change the theme, so the page looks and feels better to you.</Description
							>
						</Header>
						<RadioGroup let:Radio bind:value={themeSwitcherValue} class="w-full">
							<Radio
								value="system"
								class="bg-background w-full items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl ring-1 ring-foreground/10 shadow p-4 gap-4"
							>
								<span class="flex flex-col gap-1.5 w-full">
									<span class="font-medium">System</span>
									<span class="text-muted-foreground text-sm"
										>Adapts to your device's system-wide settings, providing a seamless and
										comfortable browsing experience.</span
									>
								</span>
							</Radio>
							<Radio
								value="light"
								class="items-start w-full flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl bg-background ring-1 ring-foreground/10 shadow p-4 gap-4"
							>
								<span class="flex flex-col gap-1.5 w-full">
									<span class="font-medium">Light</span>
									<span class="text-muted-foreground text-sm"
										>Designed to keep your browsing experience bright and vibrant.
									</span>
								</span>
							</Radio>
							<Radio
								value="dark"
								class="items-start w-full flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl bg-background ring-1 ring-foreground/10 shadow p-4 gap-4"
							>
								<span class="flex flex-col gap-1.5 w-full">
									<span class="font-medium">Dark</span>
									<span class="text-muted-foreground text-sm"
										>Perfect for those who prefer a subdued, night-friendly interface.
									</span>
								</span>
							</Radio>
						</RadioGroup>
						<Footer>
							<Button melt={close} type="button" variant="outline">Cancel</Button>
							<Button melt={close} on:click={() => ($themeStore.theme = themeSwitcherValue)}>
								Save changes
							</Button>
						</Footer>
					</Content>
				</Modal>
			</div>
			<div in:fade={{ delay: 200, duration: 600 }} class="w-full max-w-md">
				<Card let:Header class="w-full h-fit">
					<Header let:Title let:Description>
						<Title>Account</Title>
						<Description>Change your personal information and account's settings</Description>
					</Header>
					<form class="grid gap-4">
						<AutoComplete label="Role" let:Option id="role" name="role">
							{#each [{ label: 'Front-end Developer', value: 'front' }, { label: 'Back-end Developer', value: 'back' }, { label: 'Full Stack Developer', value: 'full' }] as { value, label }}
								<Option {value} {label} />
							{/each}
						</AutoComplete>

						<!-- <AutoComplete
							label="Role"
							id="role"
							name="role"
							items={[
								{ label: 'Front-end Developer', value: 'front' },
								{ label: 'Back-end Developer', value: 'back' },
								{ label: 'Full Stack Developer', value: 'full' }
							]}
						/> -->

						<Input slot="input" label="Full Name" name="full-name" required value="Dave Kupyn" />
						<Separator />
						<Label class="justify-between" required>
							Two-Factor authentication
							<Switch id="2fa" checked />
						</Label>
						<Separator />
						<div class="mt-4 text-right space-x-4">
							<Modal alert type="error" let:trigger let:Content>
								<Button variant="outline" melt={trigger}>Discard</Button>
								<Content let:Header let:Footer let:close class="sm:w-96">
									<Header let:Title let:Description>
										<Title>Are you sure?</Title>
										<Description>You cannot undo this action.</Description>
									</Header>
									<Footer>
										<Button melt={close} variant="outline">Cancel</Button>
										<Button melt={close} variant="error">Continue</Button>
									</Footer>
								</Content>
							</Modal>
							<Button on:click={() => toast('msg', {})}>Save</Button>
						</div>
					</form>
				</Card>
			</div>
			<div in:fade={{ delay: 300, duration: 600 }} class="w-full max-w-sm h-fit space-y-8">
				<RadioGroup let:Radio value="Startup" class="w-full">
					<Radio
						value="Startup"
						class="bg-background items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4"
					>
						<span class="flex flex-col gap-1.5 w-full">
							<span class="font-medium">Startup</span>
							<span class="text-muted-foreground text-sm">12GB/6 CPUs · 160 GB SSD disk</span>
						</span>
					</Radio>
					<Radio
						value="Business"
						class="items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl bg-background ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4"
					>
						<span class="flex flex-col gap-1.5 w-full">
							<span class="font-medium">Business</span>
							<span class="text-muted-foreground text-sm">16GB/8 CPUs · 512 GB SSD disk</span>
						</span>
					</Radio>
					<Radio
						value="Enterprise"
						class="items-start flex-row-reverse focus-within:ring-1 data-[state=checked]:ring-accent focus-within:ring-accent rounded-xl bg-background ring-1 ring-foreground/10 shadow p-4 max-w-sm gap-4"
					>
						<span class="flex flex-col gap-1.5 w-full">
							<span class="font-medium">Enterprise</span>
							<span class="text-muted-foreground text-sm">32GB/12 CPUs · 1024 GB SSD disk</span>
						</span>
					</Radio>
				</RadioGroup>
				<Progress value={sliderValue} variant="accent" />
			</div>
		</div>
	</main>
{/key}
