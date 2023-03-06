import { Center, CircularProgress, Flex, Text, VStack } from "@chakra-ui/react";


export function Loader() {
    let vh = window.innerHeight * 0.01;
    
    return (
        <Flex w='100%' h={`calc((${vh}px, 1vh) * 100)`} alignItems='center' justifyContent='center' bgGradient="linear(to-tr, purple.300, purple.500, purple.800)">
            <Center bg='white' boxShadow='0 4px 6px rgba(0, 0, 0, 0.5)' borderRadius={8} h={{base: '200px', lg: '300px'}} w={{base: '200px', lg: '300px'}}>
                <VStack>
                    <CircularProgress isIndeterminate color="purple.300"/>
                </VStack>
            </Center>
        </Flex>
    )

}