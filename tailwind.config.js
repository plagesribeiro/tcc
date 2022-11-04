/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],

	theme: {
		extend: {
			colors: {
				primary: '#575DA8',
				secondary: '#A8A257',
				background: {
					light: { DEFAULT: '#F2F2F2', secondary: '#e0e0e0' },
					dark: { DEFAULT: '#1F1D26', secondary: '#323135' }
				}
			}
		}
	},
	plugins: []
};
