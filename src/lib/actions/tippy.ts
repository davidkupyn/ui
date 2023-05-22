import 'tippy.js/animations/scale-subtle.css';
import { createTippy } from 'svelte-tippy';

export const tippy = createTippy({
	animation: 'scale-subtle',
	placement: 'bottom',
	duration: 200
});

export const customTippy = createTippy({
	animation: 'scale-subtle',
	duration: 200
});
