import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const config = {
	future: {
		hoverOnlyWhenSupported: true
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--color-primary))',
					focus: 'var(--color-primary-focus)',
					foreground: 'var(--color-primary-foreground)',
					...colors.zinc
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					focus: 'var(--color-accent-focus)',
					foreground: 'var(--color-accent-foreground)',
					50: 'hsl(20, 100%, 96%)',
					100: 'hsl(21, 100%, 92%)',
					200: 'hsl(18, 100%, 83%)',
					300: 'hsl(17, 100%, 72%)',
					400: 'hsl(13, 99%, 58%)',
					500: 'hsl(11, 98%, 53%)',
					600: 'hsl(7, 93%, 48%)',
					700: 'hsl(4, 91%, 40%)',
					800: 'hsl(1, 81%, 34%)',
					900: 'hsl(2, 77%, 28%)',
					950: 'hsl(359, 84%, 15%)'
					// ...colors.emerald
				},
				base: colors.zinc,
				background: 'hsl(var(--color-background))',
				foreground: 'hsl(var(--color-foreground))',
				border: 'hsl(var(--border))',
				muted: {
					DEFAULT: 'var(--color-muted)',
					foreground: 'var(--color-muted-foreground)'
				},
				popover: {
					DEFAULT: 'var(--color-popover)',
					foreground: 'var(--color-popover-foreground)',
					border: 'var(--color-popover-border)'
				},
				error: {
					DEFAULT: 'var(--color-error)',
					foreground: 'var(--color-error-foreground)',
					focus: 'var(--color-error-focus)',
					...colors.rose
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
					...colors.blue
				}
			},
			borderRadius: {
				sm: 'calc(var(--radius) - 0.375rem)',
				DEFAULT: 'calc(var(--radius) - 0.25rem)',
				md: 'calc(var(--radius) - 0.125rem)',
				lg: 'var(--radius)',
				xl: 'calc(var(--radius) + 0.25rem)',
				'2xl': 'calc(var(--radius) + 0.75rem)',
				'3xl': 'calc(var(--radius) + 1.0rem)'
			},
			fontFamily: {
				sans: ['Manrope', ...defaultTheme.fontFamily.sans],
				display: ['Manrope', ...defaultTheme.fontFamily.sans]
				// display: ['PP Editorial New', ...defaultTheme.fontFamily.serif]
			}
		}
	},

	plugins: [
		forms,
		animate,
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					custom: (value) => ({
						width: value,
						height: value
					})
				},
				{ values: theme('colors') }
			);
		})
	]
};

module.exports = config;
