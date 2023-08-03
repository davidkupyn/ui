<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';

	const {
		elements: { fallback }
	} = ctx.get();
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span use:fallback {...$fallback} class={cn('font-medium', className)}><slot /></span>
