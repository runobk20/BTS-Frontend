import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { DrawerSidebar } from "../components";
import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

export function AppLayout() {

    let vh = window.innerHeight * 0.01;
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = useRef();

    return (
        <Flex height={`calc((${vh}px, 1vh) * 100)`}>
            <DrawerSidebar isOpen={isOpen} onClose={onClose} drawerRef={btnRef}/>
            <Flex align='center' position='absolute' top='0' left='0' zIndex='10' justify='center' mt='12px' flexDir='column'>
                <IconButton
                    alignSelf='center'
                    fontSize={25}
                    background='none'
                    _hover={{background: 'none'}}
                    icon={<FaBars/>}
                    onClick={() => onOpen(true)}
                />
            </Flex>
            <Box flex='1' px={{base: '12', md: '16'}} py={5}>
                <Outlet/>
            </Box>
        </Flex>
    )
}