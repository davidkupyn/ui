<script lang="ts">
	import Fallback from './fallback.svelte';
	import { cn } from '$lib/helpers/style';
	import { createAvatar } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { avatar } from '.';

	export let fallback = '';
	export let alt: string;
	export let src: string;
	let className = '';
	export { className as class };
	const { image, fallback: fallbackAttrs } = createAvatar({
		src
	});

	setContext('avatar', { fallback: fallbackAttrs, defaultClass: avatar().fallback() });
</script>

<div class={cn(avatar().root(), className)}>
	<img {...$image} {alt} class="h-full w-full rounded-[inherit]" />
	{#if $$slots.default}
		<slot {Fallback} />
	{:else}
		<span {...$fallbackAttrs} class={avatar().fallback()}>{fallback}</span>
	{/if}
</div>
