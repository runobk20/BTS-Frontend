import { Center, CircularProgress, Flex, Text, VStack } from "@chakra-ui/react";


export function Loader() {
    let vh = window.innerHeight * 0.01;
    
    return (
        <Flex w='100%' h={`calc((${vh}px, 1vh) * 100)`} alignItems='center' justifyContent='center' bgGradient="linear(to-tr, brand.400, brand.500 ,brand.700)">
            <Center bg='white' boxShadow='0 4px 6px rgba(0, 0, 0, 0.5)' borderRadius={8} h={{base: '200px', lg: '300px'}} w={{base: '200px', lg: '300px'}}>
                <VStack>
                    <Text fontSize={24} my={2}>Loading...</Text>
                    <CircularProgress isIndeterminate color="brand.500"/>
                </VStack>
            </Center>
        </Flex>
    )

}