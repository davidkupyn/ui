<script lang="ts">
	import Trigger from './trigger.svelte';
	import Content from './content.svelte';
	import { createContextMenu, createDropdownMenu } from '@melt-ui/svelte';
	import { setContext } from 'svelte';

	export let placement:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| undefined = undefined;
  export let context = false;
  const options = {
    positioning: {
      placement
    }
  };
	const dropdown = context ? createContextMenu(options) :  createDropdownMenu(options);
	setContext('dropdown', dropdown);
</script>

<slot {Trigger} {Content} />
<!-- 
<Menu let:Trigger let:Content>
	<Trigger />
	<Content let:Item let:Separator let:Menu>
		<Item />
		<Item />
		<Separator />
		<Menu let:Trigger let:Content>
			<Trigger />
			<Content let:Item let:Separator>
				<Item />
				<Item />
				<Separator />
				<Item />
			</Content>
		</Menu>
	</Content>
</Menu>

<Menu let:Trigger let:Content>
	<Trigger />
	<Content let:Item let:Separator let:SubMenu>
		<Item />
		<Item />
		<Separator />
		<SubMenu let:SubMenuTrigger let:SubContent>
			<SubMenuTrigger />
			<SubContent let:Item let:Separator>
				<Item />
				<Item />
				<Separator />
				<Item />
			</SubContent>
		</SubMenu>
	</Content>
</Menu> -->
