import type { Config } from 'tailwindcss';
import { join } from 'path';
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { hikerHungerTheme } from './hiker-hunger-theme';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [hikerHungerTheme]
			}
		})
	]
} satisfies Config;

export default config;
