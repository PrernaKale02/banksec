/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    900: '#0B1120',
                    800: '#111827',
                    700: '#1F2937',
                    blue: '#3B82F6',
                    neon: '#00F0FF',
                    accent: '#8B5CF6',
                    danger: '#EF4444',
                    warning: '#F59E0B',
                    success: '#10B981',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace']
            }
        },
    },
    plugins: [],
}
