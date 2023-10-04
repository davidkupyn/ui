<script lang="ts">
	import { cn } from '$lib/helpers';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<SVGAElement> & {
		size?: number | string;
	};

	let className: $$Props['class'] = undefined;
	export let size: $$Props['size'] = 24;

	export { className as class };
</script>

<svg
	width={size}
	height={size}
	class={cn('text-accent', className)}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M12.5837 4.58618C15.6967 2.78889 19.5879 5.03555 19.5879 8.63005V15.3699C19.5879 18.9645 15.6967 21.2111 12.5837 19.4138L6.74678 16.0439C3.6338 14.2466 3.6338 9.75337 6.74678 7.95608L12.5837 4.58618Z"
		fill="currentColor"
	/>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M23.5357 8.63004V15.3699C23.5357 22.0034 16.3547 26.1494 10.6098 22.8327L4.77294 19.4627C-0.971868 16.1459 -0.971858 7.85402 4.77295 4.53726L10.6098 1.16735C16.3547 -2.14943 23.5357 1.99655 23.5357 8.63004ZM19.5879 8.63004C19.5879 5.03554 15.6967 2.78888 12.5837 4.58617L6.74679 7.95607C3.63381 9.75336 3.63381 14.2466 6.74679 16.0439L12.5837 19.4138C15.6967 21.2111 19.5879 18.9645 19.5879 15.3699V8.63004Z"
		fill-opacity="0.2"
		fill="currentColor"
	/>
</svg>
