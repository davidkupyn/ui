import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'dark' | 'light' | 'system';

const getTheme = (fallback: Theme): Theme => {
	if (typeof window === 'undefined') return fallback;
	const theme = (localStorage.getItem('theme') as Theme) || undefined;
	return theme || fallback;
};

const disableAnimation = () => {
	if (!browser) return;
	const css = document.createElement('style');
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
		)
	);
	document.head.appendChild(css);

	return () => {
		(() => window.getComputedStyle(document.body))();
		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};

export const theme = writable<Theme>(getTheme('light'));

theme.subscribe((value) => {
	disableAnimation();
	localStorage.setItem('theme', value);
});
