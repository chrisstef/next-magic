/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'ganache': '#3fe0c5',
                'truffle': '#ff6b4a'
            },

        },
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),],
}