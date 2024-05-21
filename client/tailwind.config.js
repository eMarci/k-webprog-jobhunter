import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        main: {
          "primary": "#1f2937",
          "primary-content": "#ffffff",
          "secondary": "#4338ca",
          "secondary-content": "#ffffff",
          "accent": "#f9fafb",
          "accent-content": "#2e3441",
          "neutral": "#ffffff",
          "neutral-content": "#111827",
          "base-100": "#f9fafb",
          "base-content": "#101010",
          "info": "#f3f4f6",
          "success": "#2c7c64",
          "warning": "#facc15",
          "error": "#dc2626",
        }
      }
    ]
  }
}

