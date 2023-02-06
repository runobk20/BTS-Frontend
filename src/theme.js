import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
export default extendTheme({
    colors,
    fonts: {
        heading: `'Lato', sans-serif`,
        body: `"Karla", sans-serif`
    },
    config: {
        initialColorMode: 'light',
        useSystemColorMode: true,
        cssVarPrefix: 'wisteria'
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('gray.50', 'gray.800')(props)
            }
        })
    }
});