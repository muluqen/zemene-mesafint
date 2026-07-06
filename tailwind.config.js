/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: '#2d3a2d',
          dark: '#1a241a',
          light: '#3d4a3d',
          darker: '#0f150f',
        },
        cork: {
          DEFAULT: '#3d4a3d',
          light: '#4a5a4a',
        },
        dossier: {
          DEFAULT: '#f5f0e1',
          dark: '#e8e0c8',
        },
        string: {
          DEFAULT: '#cc0000',
          light: '#ff3333',
        },
        stamp: {
          classified: '#cc0000',
          topsecret: '#ff6600',
          declassified: '#228b22',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#d4b85c',
          dark: '#a88a3c',
        },
        military: {
          DEFAULT: '#4a5a3a',
          dark: '#2d3a2d',
          light: '#6b7a5a',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'Georgia', 'serif'],
        typewriter: ['Special Elite', 'Courier New', 'monospace'],
        courier: ['Courier Prime', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'dossier': '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'pin': '0 2px 8px rgba(0,0,0,0.5)',
        'card': '0 4px 16px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
