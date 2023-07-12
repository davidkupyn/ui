<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getAvatarContext } from '.';

	const { fallback } = getAvatarContext();
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span {...$fallback} class={cn('font-medium', className)}><slot /></span>
