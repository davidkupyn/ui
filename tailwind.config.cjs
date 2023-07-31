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
					50: 'hsl(20 100% 96%)',
					100: 'hsl(20 100% 92%)',
					200: 'hsl(17 100% 83%)',
					300: 'hsl(16 100% 72%)',
					400: 'hsl(12 100% 61%)',
					500: 'hsl(10 100% 56%)',
					600: 'hsl(6 95% 48%)',
					700: 'hsl(3 93% 40%)',
					800: 'hsl(0 84% 34%)',
					900: 'hsl(1 79% 28%)',
					950: 'hsl(358 86% 15%)'
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
			fontFamily: {
				sans: ['Manrope', ...defaultTheme.fontFamily.sans]
				// Plus Jakarta Sans or display: ['Figtree', ...defaultTheme.fontFamily.sans]
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
