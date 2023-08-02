<script>
	import { Disclosure } from '$lib/ui/disclosure';
</script>

<main class="flex items-center justify-center h-[calc(100vh-15rem)]">
	<Disclosure let:Content let:Trigger class="max-w-md w-full h-96">
		<Trigger class="w-full">Disclosure</Trigger>
		<Content>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut officiis fugiat dicta itaque
			distinctio odit veniam qui, molestias, reprehenderit minus voluptas consequuntur aliquid
			pariatur, sunt error molestiae dolore eaque?
		</Content>
	</Disclosure>
</main>
