<script lang="ts">
	import Body from './table-body.svelte';
	import Head from './table-head.svelte';
	

	export let selected: any[] = [];
	export let disabledKeys: any[] = [];

	export let pushHistory = false;
	export let columnsEditable = false;
	export let selectable = false;
	export let interactive = false;
	export let filled = false;
	export let lined = true;


</script>

<div class="w-full overflow-auto">
	<table class="w-full caption-bottom overflow-x-scroll text-sm">
		<slot {Head} {Body}/>
	</table>
</div>
