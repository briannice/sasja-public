const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
    theme: {
        colors: {
            transparent: colors.transparent,
            white: colors.white,
            light: colors.gray[100],
            medium: colors.gray[300],
            gray: colors.gray[500],
            dark: colors.gray[700],
            black: colors.gray[900],
            primary: {
                DEFAULT: '#EB2C2C',
                dark: '#CC1313',
            },
            secondary: {
                DEFAULT: '#11A149',
                dark: '#0C7334',
            },
            tertiary: {
                DEFAULT: '#B6A255',
                dark: '#978541',
            },
            info: {
                DEFAULT: colors.blue[500],
                dark: colors.blue[600],
            },
            success: {
                DEFAULT: colors.green[500],
                dark: colors.green[600],
            },
            error: {
                DEFAULT: colors.red[500],
                dark: colors.red[600],
            },
            warning: {
                DEFAULT: colors.orange[500],
                dark: colors.orange[600],
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '2rem',
                laptop: '3rem',
                desktop: '4rem',
            },
            screens: {
                laptop: '1024px',
                desktop: '1280px',
            },
        },
        fontFamily: {
            kanit: "'Kanit', sans-serif",
            lato: "'Lato', sans-serif",
        },
        screens: {
            tablet: '640px',
            laptop: '1024px',
            desktop: '1280px',
        },
        extend: {
            backgroundImage: {
                pattern: "url('/pattern.png')",
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
