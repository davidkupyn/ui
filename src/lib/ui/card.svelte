<script lang="ts">
	type Card = any;
	export let active: boolean;
	type SwipeType = 'left' | 'right';

	let leaveX = 0;
</script>

{#if active}
	<!-- <motion.div
		drag={true}
		dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
		onDragEnd={(_, info) => {
			if (info.offset.x > 100) {
				leaveX = 1000;
				removeCard(card, 'right');
			}
			if (info.offset.x < -100) {
				leaveX = -1000;
				removeCard(card, 'left');
			}
		}}
		initial={{
			scale: 1
		}}
		animate={{
			scale: 1.05,
			rotate: `${card.name.length % 2 === 0 ? 6 : -6}deg`
		}}
		exit={{
			x: leaveX,
			opacity: 0,
			scale: 0.5,
			transition: { duration: 0.2 }
		}}
		class="w-72 h-96 border border-base-300/50 dark:border-base-900 rounded-3xl overflow-hidden p-6 mx-auto"
		data-testid="active-card"
	>
		smth
	</motion.div> -->
{:else}
	<div
		class="w-80 bg-primaryfade h-96 flex flex-col border border-base-300 dark:border-base-900 dark:border-opacity-70 border-opacity-70 hover:border-opacity-100 transition rounded-3xl overflow-hidden p-6 pb-0 mx-auto"
	>
		<div class="w-full h-56 bg-white/5 rounded-xl" />
		<hgroup class="flex flex-grow flex-col gap-2 items-center justify-center">
			<h2 class="text-center font-medium">Team 1</h2>
			<p class="text-center">smth</p>
		</hgroup>
	</div>
{/if}
