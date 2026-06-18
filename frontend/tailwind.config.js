/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        samsung: {
          dark: '#021207', // Deep premium dark green bg
          card: 'rgba(6, 26, 15, 0.75)', // Glassy dark green panels
          border: 'rgba(16, 185, 129, 0.16)', // Emerald glass border
          blue: '#00ff87', // Electric Emerald Green
          glow: '#10b981', // Neon Mint
          violet: '#00f5d4', // Cyber Turquoise
          teal: '#6ee7b7', // Bright Mint Green
          success: '#00ff87',
          warning: '#fbbf24',
          danger: '#f87171',
          textMuted: '#8ba396', // Sage Muted Text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 15px rgba(0, 255, 135, 0.35)',
        'glow-violet': '0 0 15px rgba(0, 245, 212, 0.35)',
        'glow-teal': '0 0 15px rgba(110, 231, 183, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.55)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(44, 107, 237, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(44, 107, 237, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
