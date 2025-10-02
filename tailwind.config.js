/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    // Exclude node_modules and other unnecessary directories
    '!./node_modules',
    '!./.next',
    '!./dist',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config

