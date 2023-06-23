import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import tailwindForms from '@tailwindcss/forms';
import tailwindAnimate from 'tailwindcss-animate';
const config = {
	future: {
		hoverOnlyWhenSupported: true
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'var(--color-primary)',
					focus: 'var(--color-primary-focus)',
					foreground: 'var(--color-primary-foreground)',
					...colors.zinc
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					focus: 'var(--color-accent-focus)',
					foreground: 'var(--color-accent-foreground)',
					...colors.rose
				},
				base: colors.zinc,
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				border: 'var(--border)',
				muted: {
					DEFAULT: 'var(--color-muted)',
					foreground: 'var(--color-muted-foreground)'
				},
				error: {
					DEFAULT: 'var(--color-error)',
					foreground: 'var(--color-error-foreground)',
					focus: 'var(--color-error-focus)',
					...colors.red
				},
				warning: {
					DEFAULT: 'var(--color-warning)',
					foreground: 'var(--color-warning-foreground)',
					focus: 'var(--color-warning-focus)',
					...colors.amber
				},
				success: {
					DEFAULT: 'var(--color-success)',
					foreground: 'var(--color-success-foreground)',
					focus: 'var(--color-success-focus)',
					...colors.green
				},
				info: {
					DEFAULT: 'var(--color-info)',
					foreground: 'var(--color-info-foreground)',
					focus: 'var(--color-info-focus)',
					...colors.sky
				}
			},
			boxShadow: {
				convex:
					'0 -4px 4px -4px var(--tw-shadow-color) inset, 0 4px 4px -4px var(--tw-shadow-color) inset'
			},
			fontFamily: {
				sans: ['Figtree', ...defaultTheme.fontFamily.sans]
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

	plugins: [tailwindForms, tailwindAnimate]
};

module.exports = config;
