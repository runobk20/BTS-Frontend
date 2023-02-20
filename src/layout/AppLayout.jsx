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
        <Flex height={`calc((${vh}px, 1vh) * 100)`} overflowX='hidden'>
            <DrawerSidebar isOpen={isOpen} onClose={onClose} drawerRef={btnRef}/>
                <IconButton
                    aria-label="Open menu"
                    position='absolute' top='2' left='2'
                    fontSize={25}
                    zIndex={10}
                    background='none'
                    _hover={{background: 'none'}}
                    icon={<FaBars/>}
                    onClick={() => onOpen(true)}
                />
            <Box flex='1' px={{base: '6', sm: '12', md: '16'}} py={{base: '12'}}>
                <Outlet/>
            </Box>
        </Flex>
    )
}