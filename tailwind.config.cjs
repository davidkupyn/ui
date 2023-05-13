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
