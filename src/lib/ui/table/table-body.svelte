<script lang="ts">
	import { cn } from '$lib/helpers/style';
	
	export let filled = false;
	export let lined = true;
</script>
		<tbody
			class={cn(
				'[&_tr:last-child]:border-none relative',
				filled && "before:content-['-'] before:leading-3 before:block before:invisible",
				lined && '[&_tr]:border-b'
			)}
		>
			<slot />
		</tbody>
	