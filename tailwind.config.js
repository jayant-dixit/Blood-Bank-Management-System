/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B22222', // Dark Red
        secondary: '#1E3A8A', // Deep Blue
        accent: '#FACC15', // Soft Yellow
        dark: '#374151', // Charcoal Gray
        'primary-hover': '#DC2626', // Lighter Red
        'secondary-hover': '#2563EB', // Brighter Blue
        'accent-hover': '#FDE047', // Golden Yellow
        'primary-red': '#FF2929',
        'primary-blue': '#3D3BF3',
        'light-purple': '#9694FF',
        'soft-lavender': '#EBEAFF',
      },
  },
  },
  plugins: [],
}

