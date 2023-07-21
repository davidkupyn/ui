import { browser } from '$app/environment';
import { MEDIA } from './constants';

export const getTheme = (key: string, fallback?: string): string | undefined => {
	if (typeof window === 'undefined') return undefined;
	let theme;
	try {
		theme = localStorage.getItem(key) || undefined;
	} catch (e) {
		// Unsupported
	}
	return theme || fallback;
};

export const disableAnimation = () => {
	if (!browser) return () => {};
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

export const getSystemTheme = (e?: MediaQueryList): string => {
	if (!browser) return 'light';
	if (!e) {
		e = window.matchMedia(MEDIA);
	}

	const isDark = e.matches;
	const systemTheme = isDark ? 'dark' : 'light';
	return systemTheme;
};
