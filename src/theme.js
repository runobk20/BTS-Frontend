import { extendTheme } from "@chakra-ui/react"

const colors = {
    danger: {
        50: '#F7CACD',
        100: '#F2A6AB',
        200: '#EC838A',
        300: '#EA7179',
        400: '#E44E58',
        500: '#DF2935',
        600: '#C31D28',
        700: '#A01821',
        800: '#7C131A'
    }
}

const theme = {
    colors,
    fonts: {
        heading: `'Lato', sans-serif`,
        body: `"Karla", sans-serif`
    },
    config: {
        initialColorMode: 'light',
        useSystemColorMode: true
    }
}

export default extendTheme(theme);