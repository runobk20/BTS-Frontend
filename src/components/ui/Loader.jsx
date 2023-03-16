import { CircularProgress, Flex, VStack } from "@chakra-ui/react";


export function Loader() {
    let vh = window.innerHeight * 0.01;
    
    return (
        <Flex w='100%' h={`calc((${vh}px, 1vh) * 100)`} alignItems='center' justifyContent='center' bgGradient="linear(to-tr, purple.300, purple.500, purple.800)">
                <VStack>
                    <CircularProgress isIndeterminate color="white"/>
                </VStack>
        </Flex>
    )

}