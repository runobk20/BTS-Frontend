import { extendTheme } from "@chakra-ui/react"

const colors = {
    brand: {
        100: '#D4C7FA',
        200: '#B7A2F6',
        300: '#9A7CF3',
        400: '#7D57EF',
        500: '#6F44EE',
        600: '#6032EC',
        700: '#3C11BB',
        800: '#300E95',
    },
    secondary: {
        400: '#3ACF91',
        500: '#2CB67D',
        600: '#249465'
    }
}

export const theme = extendTheme({colors});