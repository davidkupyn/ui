<script lang="ts">
	import { cn } from '$lib/helpers/style';

	let className: string | undefined | null = undefined;

	export { className as class };
	export let size: number | string = 24;
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
		d="M11.3048 6.95112C11.705 6.46014 12.455 6.46014 12.8552 6.95112L16.4551 11.3682C16.7549 11.7361 16.7549 12.2639 16.4551 12.6318L12.8552 17.0489C12.455 17.5399 11.705 17.5399 11.3048 17.0489L7.70489 12.6318C7.40511 12.2639 7.40511 11.7361 7.70489 11.3682L11.3048 6.95112Z"
		fill="currentColor"
	/>
	<path
		d="M10.7749 1.45849C11.4143 0.697295 12.5857 0.697295 13.2251 1.45849L21.2155 10.9709C21.7154 11.5659 21.7154 12.4341 21.2155 13.0291L13.2251 22.5415C12.5857 23.3027 11.4143 23.3027 10.7749 22.5415L2.78445 13.0291C2.28462 12.4341 2.28462 11.5659 2.78445 10.9709L10.7749 1.45849Z"
		fill="currentColor"
		fill-opacity="0.2"
	/>
</svg>
