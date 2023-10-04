<script lang="ts">
	import { cn } from '$lib/helpers';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<li
	class={cn(
		'hidden only:flex cursor-default gap-2 select-none text-foreground items-center rounded-lg px-4 py-1.5 h-9 sm:text-sm',
		className
	)}
>
	<slot />
</li>
