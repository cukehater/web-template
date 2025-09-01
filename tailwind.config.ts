import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src-cms/**/*.{js,ts,jsx,tsx,mdx}',
    './src-web/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {},
  plugins: [typography]
}

export default config
