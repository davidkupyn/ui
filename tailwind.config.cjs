import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindForms from '@tailwindcss/forms';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: colors.indigo,
				base: colors.gray
			},
			backgroundImage: {
				primaryfade:
					'radial-gradient(131.66% 109.77% at 50% 97.75%, transparent 37.41%, #7f1d1d 69.27%, #d97706 100%)'
			},
			boxShadow: {
				convex:
					'0 -4px 4px -4px var(--tw-shadow-color) inset, 0 4px 4px -4px var(--tw-shadow-color) inset'
			},
			borderRadius: {
				base: '0.5rem'
			},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [tailwindForms, tailwindScrollbar({ nocompatible: true })]
};

module.exports = config;
