<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getAvatarContext } from '.';

	const { fallback, defaultClass } = getAvatarContext();
	let className = '';
	export { className as class };
</script>

<span {...$fallback} class={cn(defaultClass, className)}><slot /></span>
