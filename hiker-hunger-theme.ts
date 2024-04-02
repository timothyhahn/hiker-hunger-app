import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const hikerHungerTheme: CustomThemeConfig = {
	name: 'hiker-hunger-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Lato, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Comfortaa, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': 'var(--color-surface-800)',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '6px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '255 255 255',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': 'var(--color-primary-800)',
		// =~= Theme Colors  =~=
		// primary | #53696d
		'--color-primary-50': '229 233 233', // #e5e9e9
		'--color-primary-100': '221 225 226', // #dde1e2
		'--color-primary-200': '212 218 219', // #d4dadb
		'--color-primary-300': '186 195 197', // #bac3c5
		'--color-primary-400': '135 150 153', // #879699
		'--color-primary-500': '83 105 109', // #53696d
		'--color-primary-600': '75 95 98', // #4b5f62
		'--color-primary-700': '62 79 82', // #3e4f52
		'--color-primary-800': '50 63 65', // #323f41
		'--color-primary-900': '41 51 53', // #293335
		// secondary | #7fb17c
		'--color-secondary-50': '236 243 235', // #ecf3eb
		'--color-secondary-100': '229 239 229', // #e5efe5
		'--color-secondary-200': '223 236 222', // #dfecde
		'--color-secondary-300': '204 224 203', // #cce0cb
		'--color-secondary-400': '165 200 163', // #a5c8a3
		'--color-secondary-500': '127 177 124', // #7fb17c
		'--color-secondary-600': '114 159 112', // #729f70
		'--color-secondary-700': '95 133 93', // #5f855d
		'--color-secondary-800': '76 106 74', // #4c6a4a
		'--color-secondary-900': '62 87 61', // #3e573d
		// tertiary | #f3e3cb
		'--color-tertiary-50': '253 251 247', // #fdfbf7
		'--color-tertiary-100': '253 249 245', // #fdf9f5
		'--color-tertiary-200': '252 248 242', // #fcf8f2
		'--color-tertiary-300': '250 244 234', // #faf4ea
		'--color-tertiary-400': '247 235 219', // #f7ebdb
		'--color-tertiary-500': '243 227 203', // #f3e3cb
		'--color-tertiary-600': '219 204 183', // #dbccb7
		'--color-tertiary-700': '182 170 152', // #b6aa98
		'--color-tertiary-800': '146 136 122', // #92887a
		'--color-tertiary-900': '119 111 99', // #776f63
		// success | #1d7013
		'--color-success-50': '221 234 220', // #ddeadc
		'--color-success-100': '210 226 208', // #d2e2d0
		'--color-success-200': '199 219 196', // #c7dbc4
		'--color-success-300': '165 198 161', // #a5c6a1
		'--color-success-400': '97 155 90', // #619b5a
		'--color-success-500': '29 112 19', // #1d7013
		'--color-success-600': '26 101 17', // #1a6511
		'--color-success-700': '22 84 14', // #16540e
		'--color-success-800': '17 67 11', // #11430b
		'--color-success-900': '14 55 9', // #0e3709
		// warning | #9b994f
		'--color-warning-50': '240 240 229', // #f0f0e5
		'--color-warning-100': '235 235 220', // #ebebdc
		'--color-warning-200': '230 230 211', // #e6e6d3
		'--color-warning-300': '215 214 185', // #d7d6b9
		'--color-warning-400': '185 184 132', // #b9b884
		'--color-warning-500': '155 153 79', // #9b994f
		'--color-warning-600': '140 138 71', // #8c8a47
		'--color-warning-700': '116 115 59', // #74733b
		'--color-warning-800': '93 92 47', // #5d5c2f
		'--color-warning-900': '76 75 39', // #4c4b27
		// error | #9d394c
		'--color-error-50': '240 225 228', // #f0e1e4
		'--color-error-100': '235 215 219', // #ebd7db
		'--color-error-200': '231 206 210', // #e7ced2
		'--color-error-300': '216 176 183', // #d8b0b7
		'--color-error-400': '186 116 130', // #ba7482
		'--color-error-500': '157 57 76', // #9d394c
		'--color-error-600': '141 51 68', // #8d3344
		'--color-error-700': '118 43 57', // #762b39
		'--color-error-800': '94 34 46', // #5e222e
		'--color-error-900': '77 28 37', // #4d1c25
		// surface | #bbbdcc
		'--color-surface-50': '252 254 255', // #f5f5f7
		'--color-surface-100': '241 242 245', // #f1f2f5
		'--color-surface-200': '238 239 242', // #eeeff2
		'--color-surface-300': '228 229 235', // #e4e5eb
		'--color-surface-400': '207 209 219', // #cfd1db
		'--color-surface-500': '187 189 204', // #bbbdcc
		'--color-surface-600': '168 170 184', // #a8aab8
		'--color-surface-700': '140 142 153', // #8c8e99
		'--color-surface-800': '112 113 122', // #70717a
		'--color-surface-900': '47 48 52' // #5c5d64
	}
};
