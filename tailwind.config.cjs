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
			boxShadow: {
				convex:
					'0 -4px 4px -4px var(--tw-shadow-color) inset, 0 4px 4px -4px var(--tw-shadow-color) inset'
			},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
				roobert: ['Roobert', ...defaultTheme.fontFamily.sans]
			},
			animation: {
				text: 'text 8s ease infinite'
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			}
		}
	},

	plugins: [tailwindForms, tailwindScrollbar({ nocompatible: true })]
};

module.exports = config;
