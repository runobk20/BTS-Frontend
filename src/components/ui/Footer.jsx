import { Box, Text } from "@chakra-ui/react";

export function Footer() {
    return (
        <Box as="footer" p={3} mt={3} bg='gray.700'>
            <Text textAlign='center' color='white'>Wisteria BTS &copy; 2023</Text>
        </Box>
    )
}