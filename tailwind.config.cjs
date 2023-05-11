import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: colors.blue,
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

	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
